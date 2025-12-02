// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DiplomaNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("DiplomaWeb3", "DEV") Ownable(msg.sender) {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmZ4tDuvesekSs4qM5ZZyqUC865eZX42f2H12sWLD2rxp/";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
