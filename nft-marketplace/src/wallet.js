import { ethers } from "ethers";

// Adresele contractelor
const lorTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Adresa contractului LOR
const marketplaceAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; // Adresa contractului Marketplace

// ABI-uri minimale
const lorTokenABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function balanceOf(address account) public view returns (uint256)"
];
const marketplaceABI = [
  "function buyNFT(uint256 id) public",
];

// Funcție pentru aprobare LOR tokens
// export async function approveLOR(amount) {
//   if (!window.ethereum) {
//     console.error("MetaMask is not installed");
//     alert("Please install MetaMask!");
//     return;
//   }

//   try {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();

//     // Verifică dacă adresa contractului Marketplace este validă
//     const marketplaceAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; // Înlocuiește cu adresa reală
//     if (!ethers.isAddress(marketplaceAddress)) {
//       throw new Error(`Invalid marketplace address: ${marketplaceAddress}`);
//     }

//     const lorToken = new ethers.Contract(lorTokenAddress, lorTokenABI, signer);

//     const cleanedAmount = parseFloat(amount);
//     if (isNaN(cleanedAmount)) {
//       throw new Error("Invalid amount format");
//     }

//     // Aprobare pentru contract
//     const tx = await lorToken.approve(marketplaceAddress, ethers.parseUnits(cleanedAmount.toString(), 18));
//     await tx.wait();

//     console.log(`Approved ${cleanedAmount} LOR tokens for Marketplace`);
//   } catch (error) {
//     console.error("Error during approval:", error);
//     throw error;
//   }
// }

// Funcție pentru cumpărare NFT
export async function buyNFT(nftId) {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);

    const tx = await marketplace.buyNFT(nftId);
    await tx.wait();
    console.log(`Successfully purchased NFT with ID: ${nftId}`);
  } catch (error) {
    console.error("Error during purchase:", error);
    throw error;
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    alert("Please install MetaMask!");
    return;
  }

  try {
    // Conectează portofelul utilizatorului
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected wallet address:", accounts[0]);
    alert(`Wallet connected: ${accounts[0]}`);
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert("Failed to connect wallet. Check console for details.");
  }}

  export async function listNFT(price) {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      alert("Please install MetaMask!");
      return;
    }
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);
  
      const priceInWei = ethers.parseUnits(price, 18); // Convertim prețul în WEI
      const tx = await marketplace.listNFT(priceInWei);
      await tx.wait();
  
      console.log(`NFT listed with price: ${price} LOR`);
      alert("NFT successfully listed!");
    } catch (error) {
      console.error("Error listing NFT:", error);
      alert("Failed to list NFT. Check console for details.");
    }
  }