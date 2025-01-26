// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Marketplace {
    address public owner;
    IERC20 public lorToken;

    struct NFT {
        uint256 id;
        address owner;
        uint256 price;
        bool isListed;
    }

    mapping(uint256 => NFT) public nfts;
    uint256 public nftCount;

    event ContractDeployed(address indexed owner);
    event NFTListed(uint256 id, uint256 price);
    event NFTBought(uint256 id, address buyer);

    constructor(address _owner, address _lorTokenAddress) {
        require(_owner != address(0), "Invalid owner address");
        require(_lorTokenAddress != address(0), "Invalid LOR token address");
        owner = _owner;
        lorToken = IERC20(_lorTokenAddress);

        emit ContractDeployed(owner);
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
            lorToken.balanceOf(msg.sender) >= nft.price,
            "Not enough LOR balance"
        );

        // Transfer LOR tokens from buyer to contract owner
        bool success = lorToken.transferFrom(msg.sender, owner, nft.price);
        require(success, "Transfer failed");

        // Update NFT ownership
        nft.owner = msg.sender;
        nft.isListed = false;

        emit NFTBought(id, msg.sender);
    }

    function getNFT(uint256 id) external view returns (NFT memory) {
        return nfts[id];
    }
}