async function main() {
  const [deployer] = await ethers.getSigners();

  const lorTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with deployed LOR token address
  const ownerAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; // Your beneficiary address

  console.log("Deploying Marketplace with the account:", deployer.address);
  console.log("LOR Token address:", lorTokenAddress);
  console.log("owner address:", ownerAddress);

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(lorTokenAddress, ownerAddress);
  await marketplace.waitForDeployment();

  console.log("Marketplace deployed to:", await marketplace.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });