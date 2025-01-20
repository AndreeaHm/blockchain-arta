async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Marketplace = await ethers.getContractFactory("Marketplace");
    console.log("Contract factory loaded");
  
    const marketplace = await Marketplace.deploy();
    console.log("Deployment transaction sent, waiting for confirmation...");
  
    await marketplace.waitForDeployment();
    console.log("Contract deployed!");
  
    const contractAddress = await marketplace.getAddress();
    console.log("Marketplace deployed to:", contractAddress);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error in deployment script:", error);
      process.exit(1);
    });  