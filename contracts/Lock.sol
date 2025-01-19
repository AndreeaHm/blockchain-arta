// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Lock is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("Lock", "LNFT") 
    {
                tokenCounter = 0;
    }

    function mintNFT(string memory tokenURI) public returns (uint256) {
        tokenCounter++; // Incrementăm ID-ul tokenului
        uint256 newItemId = tokenCounter;

        _mint(msg.sender, newItemId); // Mint NFT către msg.sender
        _setTokenURI(newItemId, tokenURI); // Setăm tokenURI-ul

        return newItemId; // Returnăm ID-ul noului NFT
    }

}