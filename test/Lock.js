const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  async function deployMarketplaceFixture() {
    const [owner, buyer] = await ethers.getSigners(); // Obține conturile

    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(); // Deploy contract
    await marketplace.waitForDeployment(); // Așteaptă ca contractul să fie deployat

    return { marketplace, owner, buyer };
  }

  it("Should deploy correctly", async function () {
    const { marketplace } = await deployMarketplaceFixture();
    const address = await marketplace.getAddress();
    expect(address).to.properAddress;
  });

  it("Should list an NFT with the correct price", async function () {
    const { marketplace } = await deployMarketplaceFixture();

    const price = ethers.parseEther("1"); // Corectarea metodei parseEther
    await marketplace.listNFT(price);

    const nft = await marketplace.getNFT(1);
    expect(nft.id).to.equal(1);
    expect(nft.price).to.equal(price);
    expect(nft.isListed).to.be.true;
  });

  it("Should allow a user to buy a listed NFT", async function () {
    const { marketplace, buyer } = await deployMarketplaceFixture();

    const price = ethers.parseEther("1");
    await marketplace.listNFT(price);

    await marketplace.connect(buyer).buyNFT(1, { value: price });

    const nft = await marketplace.getNFT(1);
    expect(nft.owner).to.equal(buyer.address);
    expect(nft.isListed).to.be.false;
  });
});