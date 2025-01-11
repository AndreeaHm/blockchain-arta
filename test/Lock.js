const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Lock", function () {
    it("Should mint and assign token to the owner", async function () {
        const [owner] = await ethers.getSigners();

        // Deploy the contract
        const Lock = await ethers.getContractFactory("Lock");
        const nft = await Lock.deploy();
        await nft.deployTransaction.wait(); // Wait for deployment to complete

        // Mint the token
        const tokenURI = "https://example.com/token";
        const tx = await nft.mint(tokenURI); // State-changing operation
        await tx.wait(); // Wait for the transaction to complete

        // Validate minting and ownership
        expect(await nft.tokenURI(0)).to.equal(tokenURI);
        expect(await nft.ownerOf(0)).to.equal(owner.address);
    });
});