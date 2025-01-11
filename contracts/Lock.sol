// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Lock is ERC721URIStorage {
    uint256 public tokenCounter;

    event TokenMinted(uint256 tokenId, address owner, string tokenURI);

    constructor() ERC721("LockNFT", "LNFT") {
        tokenCounter = 0;
    }

    function mint(string memory tokenURI) public {
        uint256 tokenId = tokenCounter;
        _mint(msg.sender, tokenId); // Mint the NFT
        _setTokenURI(tokenId, tokenURI); // Set the token URI
        tokenCounter++; // Increment the counter

        emit TokenMinted(tokenId, msg.sender, tokenURI); // Emit an event
    }
}