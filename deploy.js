const hre = require("hardhat");

async function main() {
    const Lock = await hre.ethers.getContractFactory("Lock");
    const nftMarketplace = await Lock.deploy();
    console.log("Lock deployed to:", nftMarketplace.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});