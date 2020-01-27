import 'babel-polyfill';

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
  assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'New Star!');
});

it('lets user1 list a star for sale', async () => {
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const starId = 2;
  // web3 is injected in to every test suite
  const starPrice = web.utils.toWei('.01', 'ether');
  await instance.createStar('Awesome Star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  // check the mapping and see if its for sale
  assert.equal(await instance.starsForSale.call(starId), starPrice);
});
