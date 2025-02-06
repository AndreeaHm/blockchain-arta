async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying LOR Token with the account:", deployer.address);
  
    const LORToken = await ethers.getContractFactory("LORToken");
    const initialSupply = "1000000";
    const lorToken = await LORToken.deploy(initialSupply);
    await lorToken.waitForDeployment();
  
    console.log("LOR Token deployed to:", await lorToken.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });  