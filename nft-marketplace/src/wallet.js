import { ethers } from "ethers";
import { contractABI } from "./config";


// Adresele contractelor
const lorTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const marketplaceAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; //NFT Storage

// ABI-uri
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

const API_URL = "http://localhost:5000/nfts";

//Inițializare NFT și preia valoare din baza de date locală
export async function fetchAndStoreNFTs() {
  try {
    const response = await fetch(API_URL);
    const nfts = await response.json();

    // Dacă baza de date este goală, populăm NFT-urile inițial
    if (nfts.length === 0) {
      console.log("No NFTs found in database. Initializing...");

      for (let i = 1; i <= 10; i++) {
        await fetch(`${API_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: i, owner: null })
        });
      }

      console.log("NFTs successfully stored in database!");
    }
  } catch (error) {
    console.error("Error fetching and storing NFTs:", error);
  }
}

/**
 * Obține owner-ul unui NFT din JSON Server
 * @param {number} nftId - ID-ul NFT-ului
 * @returns {string | null} - Adresa owner-ului sau null dacă nu există
 */
export async function getNFTOwnerFromDB(nftId) {
  try {
    const response = await fetch(`${API_URL}/${nftId}`);
    
    if (!response.ok) {
      console.warn(`NFT ${nftId} not found in database.`);
      return null;
    }

    const data = await response.json();
    return data.owner || null;
  } catch (error) {
    console.error("Error fetching NFT owner:", error);
    return null;
  }
}

/**
 * Salvăm noul owner al unui NFT în JSON Server
 * @param {number} nftId - ID-ul NFT-ului
 * @param {string} owner - Adresa noului owner
 */
export async function saveNFTOwner(nftId, owner) {
  try {
    const response = await fetch(`${API_URL}/${nftId}`);
    
    if (response.ok) {
      // NFT-ul există, facem update
      await fetch(`${API_URL}/${nftId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nftId, owner })
      });
    } else {
      // NFT-ul nu există, îl adăugăm
      await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nftId, owner })
      });
    }
    console.log(`Owner-ul NFT ${nftId} actualizat: ${owner}`);
  } catch (error) {
    console.error("Error saving NFT owner:", error);
  }
}

/**
 * Cumpărarea unui NFT (actualizare owner în baza de date)
 * @param {number} nftId - ID-ul NFT-ului
 * @param {string} buyerAddress - Adresa cumpărătorului
 */
export async function buyNFT(nftId, price) {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    alert("Please install MetaMask!");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const buyerAddress = await signer.getAddress(); // Obține adresa cumpărătorului
    const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);

    console.log(`Attempting to buy NFT ${nftId} for ${price} LOR...`);

    // Inițierea tranzacției pe blockchain
    const tx = await marketplace.buyNFT(nftId, {
      value: ethers.parseUnits(price.toString(), 18),
    });

    await tx.wait();
    console.log(`Successfully purchased NFT with ID: ${nftId}`);

    // Actualizează baza de date JSON Server cu noul owner
    await saveNFTOwner(nftId, buyerAddress);

    alert(`Purchase successful! NFT ${nftId} is now yours. Owner updated to ${buyerAddress}`);
  } catch (error) {
    console.error("Error during purchase:", error);
    
    // Gestionare erori
    if (error.code === "INSUFFICIENT_FUNDS") {
      alert("You do not have enough LOR to complete this transaction.");
    } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
      alert("Transaction may fail due to unpredictable gas fees.");
    } else if (error.code === "ACTION_REJECTED") {
      alert("Transaction rejected by user.");
    } else {
      alert(`Transaction failed: ${error.message}`);
    }
  }
}



export async function getAccountInfo() {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    alert("Please install MetaMask!");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balance); // Convertim WEI -> ETH

    console.log(`Connected wallet: ${address}, Balance: ${balanceInEth} LOR`);
    return { address, balanceInEth };
  } catch (error) {
    console.error("Error fetching account info:", error);
    alert("Failed to fetch account info. Check console for details.");
  }
}

export async function listenToEvents(updateUI) {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    alert("Please install MetaMask!");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(marketplaceAddress, contractABI, provider);

    // Ascultăm evenimentul NFTBought
    contract.on("NFTBought", (id, buyer) => {
      console.log(`NFT cu ID-ul ${id} a fost cumpărat de ${buyer}`);
      updateUI(`NFT ${id} a fost cumpărat de ${buyer}`);
    });

    // Ascultăm evenimentul NFTListed
    contract.on("NFTListed", (id, price) => {
      console.log(`NFT cu ID-ul ${id} a fost listat la prețul de ${ethers.formatEther(price)} LOR`);
      updateUI(`NFT ${id} a fost listat la prețul de ${ethers.formatEther(price)} LOR`);
    });

    console.log("Evenimentele sunt acum monitorizate...");
  } catch (error) {
    console.error("Error setting up event listeners:", error);
    alert("Failed to listen to contract events. Check console for details.");
  }
}





export async function estimateGasBuyNFT(nftId, price) {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    alert("Please install MetaMask!");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);

    // Estimare gas
    const estimatedGas = await marketplace.buyNFT.estimateGas(nftId, {
      value: ethers.parseUnits(price.toString(), 18), // Convertim prețul în WEI
    });

    console.log(`Estimated gas for buying NFT ${nftId}: ${estimatedGas.toString()}`);
    return estimatedGas;
  } catch (error) {
    console.error("Error estimating gas:", error);
    alert("Failed to estimate gas. Check console for details.");
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