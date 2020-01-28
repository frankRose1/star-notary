const StarNotary = artifacts.require('StarNotary');

let accounts;
let owner;

contract('StarNotary', async accs => {
  accounts = accs;
  owner = accounts[0];
});

it('Can create a star', async () => {
  const tokenId = 1;
  const instance = await StarNotary.deployed();
  await instance.createStar('New Star!', tokenId, { from: owner });
  // tokenIdToStarInfo is a mapping so use .call()
  const star = await instance.tokenIdToStarInfo.call(tokenId);
  assert.equal(star.name, 'New Star!');
});

it('lets user1 list a star for sale', async () => {
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const starId = 2;
  // web3 is injected in to every test suite
  const starPrice = web3.utils.toWei('.01', 'ether');
  await instance.createStar('Awesome Star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  // check the mapping and see if its for sale
  assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async () => {
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const user2 = accounts[2];
  const starId = 3;
  const starPrice = web3.utils.toWei('.01', 'ether');
  const balance = web3.utils.toWei('.05', 'ether');
  await instance.createStar('Awesome Star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  const balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
  // user2 is purchasing from user1
  await instance.buyStar(starId, { from: user2, value: balance });
  const balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
  const value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
  const value2 = Number(balanceOfUser1AfterTransaction);
  assert.equal(value1, value2);
});

it('lets user2 buy a star if its up for sale', async () => {
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const user2 = accounts[2];
  const starId = 4;
  const starPrice = web3.utils.toWei('.01', 'ether');
  const balance = web3.utils.toWei('.05', 'ether');
  await instance.createStar('Awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  await instance.buyStar(starId, { from: user2, value: balance });
  assert.equal(await instance.ownerOf.call(starId), user2);
});

it("lets user2 buy a star and decreases user2's balance in ether", async () => {
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const user2 = accounts[2];
  const starId = 5;
  const starPrice = web3.utils.toWei('.01', 'ether');
  const balance = web3.utils.toWei('.05', 'ether');
  await instance.createStar('Awesome Star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
  await instance.buyStar(starId, { from: user2, value: balance, gasPrice: 0 });
  const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
  const value =
    Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
  assert.equal(value, starPrice);
});

it('can add the star name and star symbol properly', async () => {
  const instance = await StarNotary.deployed();
  const name = await instance.starName.call();
  const symbol = await instance.starToken.call();
  assert.equal(name, 'Star Notary Token');
  assert.equal(symbol, 'STN');
});

it("can look up a token's name for a provided ID", async () => {
  // 1. create a Star with different tokenId
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const starId = 6;
  await instance.createStar('Rare Star', starId, { from: user1 });
  const starName = await instance.lookUptokenIdToStarInfo(starId);
  assert.equal(starName, 'Rare Star');
});
