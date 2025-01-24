// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Marketplace {
    struct NFT {
        uint256 id;
        address owner;
        uint256 price; // Price in LOR tokens
        bool isListed;
    }

    IERC20 public lorToken; // ERC-20 LOR token contract
    mapping(uint256 => NFT) public nfts;
    uint256 public nftCount;
    address public beneficiary; // Address to receive LOR payments

    event NFTListed(uint256 id, uint256 price);
    event NFTBought(uint256 id, address buyer);

    constructor(address _lorToken, address _beneficiary) {
        require(_lorToken != address(0), "LOR token address cannot be zero");
        require(_beneficiary != address(0), "Beneficiary cannot be zero address");

        lorToken = IERC20(_lorToken); // Set the LOR token address
        beneficiary = _beneficiary;  // Set the beneficiary address
    }

    function listNFT(uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        nftCount++;
        nfts[nftCount] = NFT(nftCount, address(0), price, true);
        emit NFTListed(nftCount, price);
    }

    function buyNFT(uint256 id) external {
        NFT storage nft = nfts[id];
        require(nft.isListed, "NFT not for sale");
        require(
            lorToken.allowance(msg.sender, address(this)) >= nft.price,
            "Insufficient LOR token allowance"
        );

        // Transfer LOR tokens from buyer to beneficiary
        bool sent = lorToken.transferFrom(msg.sender, beneficiary, nft.price);
        require(sent, "Failed to transfer LOR tokens");

        // Update NFT ownership
        nft.owner = msg.sender;
        nft.isListed = false;

        emit NFTBought(id, msg.sender);
    }

    function getNFT(uint256 id) external view returns (NFT memory) {
        return nfts[id];
    }
}