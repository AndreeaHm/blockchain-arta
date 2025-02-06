const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace Modifier Test", function () {
    let Marketplace, marketplace, owner, buyer, lorToken;

    beforeEach(async function () {
        [owner, buyer] = await ethers.getSigners();

        // Deploy LOR token mock
        const LORToken = await ethers.getContractFactory("LORToken");
lorToken = await LORToken.deploy(ethers.parseUnits("100", 18)); // Exemplu: 1M tokens
await lorToken.waitForDeployment();

        // Deploy Marketplace
        Marketplace = await ethers.getContractFactory("Marketplace");
        marketplace = await Marketplace.deploy(owner.address, await lorToken.getAddress());
        await marketplace.waitForDeployment();

    });

    it("Should revert if user does not have enough LOR tokens", async function () {
        // Listează un NFT cu preț 10 LOR
        await marketplace.listNFT(ethers.parseUnits("10", 18));

        // Încearcă să cumpere cu contul buyer (care are doar 5 LOR)
        await expect(marketplace.connect(buyer).buyNFT(1))
            .to.be.revertedWith("Not enough LOR balance");
    });
});

describe("Marketplace Modifier Test - nftExists", function () {
  let Marketplace, marketplace, owner, buyer, lorToken;

  beforeEach(async function () {
      [owner, buyer] = await ethers.getSigners();

      // Deploy LOR token
      const LORToken = await ethers.getContractFactory("LORToken");
      lorToken = await LORToken.deploy(ethers.parseUnits("1000000", 18)); // 1M tokens
      await lorToken.waitForDeployment();

      // Deploy Marketplace contract
      Marketplace = await ethers.getContractFactory("Marketplace");
      marketplace = await Marketplace.deploy(owner.address, await lorToken.getAddress());
      await marketplace.waitForDeployment();
  });

  it("Should revert when trying to buy a non-existent NFT", async function () {
      // Încearcă să cumperi un NFT cu ID=99 (care nu există)
      await expect(marketplace.connect(buyer).buyNFT(99))
          .to.be.revertedWith("NFT does not exist");
  });
});
