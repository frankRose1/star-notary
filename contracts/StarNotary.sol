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
    function createStar(string memory _name, uint256 _tokenId) public {}
}
