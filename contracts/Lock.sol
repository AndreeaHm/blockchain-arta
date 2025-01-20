// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Marketplace {
    struct NFT {
        uint256 id;
        address owner;
        uint256 price;
        bool isListed;
    }

    mapping(uint256 => NFT) public nfts;
    uint256 public nftCount;

    event NFTListed(uint256 id, uint256 price);
    event NFTBought(uint256 id, address buyer);

    function listNFT(uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        nftCount++;
        nfts[nftCount] = NFT(nftCount, address(0), price, true);
        emit NFTListed(nftCount, price);
    }

    function buyNFT(uint256 id) external payable {
        NFT storage nft = nfts[id];
        require(nft.isListed, "NFT not for sale");
        require(msg.value >= nft.price, "Not enough Ether sent");

        nft.owner = msg.sender;
        nft.isListed = false;
        emit NFTBought(id, msg.sender);
    }

    function getNFT(uint256 id) external view returns (NFT memory) {
        return nfts[id];
    }
}