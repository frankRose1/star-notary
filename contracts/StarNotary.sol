pragma solidity >=0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {
    struct Star {
        string name;
    }

    //map a uint ID to each instance of the Star struct
    mapping(uint256 => Star) public tokenIdToStarInfo;

    //map a price to a Star ID
    mapping(uint256 => uint256) public starsForSale;

    /**
      * @dev Create a new instance of the star struct and map a tokenId to it
        @param _name - string name of the star
        @param _tokenId - uint256 ID to identify the star
     */
    function createStar(string memory _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);
        tokenIdToStarInfo[_tokenId] = newStar;
        // _mint assign the star with _tokenId to the sender address(ownership)
        _mint(msg.sender, _tokenId);
    }

    /**
      @dev Let a user list their star token for sale
      @param _tokenId uint256 representing a token's ID
      @param _price uint256 representing a token's price
     */
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        // ownerOf is implemented by ERC721 interface. will return the owner
        // address for a given tokenId
        require(ownerOf(_tokenId) == msg.sender, "You don't own this token!");
        starsForSale[_tokenId] = _price;
    }

    /**
      @dev Convert an address to address payable
      @param x address
      @return address payable
     */
    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }

    /**
      @dev Allow a user to buy a star if its listed for sale. Transfer funds to
      the owner of the star.
      @param _tokenId uint256 representing a tokens ID
     */
    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0, "No star for sale with that ID.");
        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value >= starCost, "You did not supply enough ether.");
        // transfer ownership of the token to the buyer(msg.sender) address
        _transferFrom(ownerAddress, msg.sender, _tokenId);
        address payable ownerAddressPayable = _make_payable(ownerAddress);
        ownerAddressPayable.transfer(starCost);
        // refund the differnce if needed
        if (msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
        //remove the star for sale
        starsForSale[_tokenId] = 0;
    }
}
