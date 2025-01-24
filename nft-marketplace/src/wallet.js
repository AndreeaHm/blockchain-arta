import { ethers } from "ethers";
import { contractAddress, contractABI } from "./config";

/**
 * Conectează portofelul MetaMask la aplicație.
 */
export async function connectWallet() {
  if (window.ethereum) {
    try {
      // Solicită acces la conturi
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Wallet connected");
    } catch (error) {
      console.error("User rejected the request:", error);
    }
  } else {
    console.error("MetaMask is not installed");
  }
}

/**
 * Listează un NFT cu un preț specificat.
 * @param {string} price - Prețul în ETH
 */
export async function listNFT(price) {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum); // Conectare la MetaMask
    const signer = await provider.getSigner(); // Obține contul utilizatorului
    const contract = new ethers.Contract(contractAddress, contractABI, signer); // Instanțiază contractul smart

    const priceInWei = ethers.parseEther(price.toString()); // Convertire preț în WEI
    const tx = await contract.listNFT(priceInWei); // Apelează funcția listNFT din contract
    await tx.wait(); // Așteaptă confirmarea tranzacției
    console.log("NFT listed with price:", price);
  } catch (error) {
    console.error("Error listing NFT:", error);
  }
}

/**
 * Cumpără un NFT specificat prin ID.
 * @param {number} id - ID-ul NFT-ului
 * @param {string} price - Prețul în ETH
 */
export async function buyNFT(id, price) {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum); // Conectare la MetaMask
    const signer = await provider.getSigner(); // Obține contul utilizatorului
    const contract = new ethers.Contract(contractAddress, contractABI, signer); // Instanțiază contractul smart

    const tx = await contract.buyNFT(id, { value: ethers.parseEther(price.toString()) }); // Apelează funcția buyNFT
    await tx.wait(); // Așteaptă confirmarea tranzacției
    console.log("NFT bought with ID:", id);
  } catch (error) {
    console.error("Error buying NFT:", error);
  }
}

export async function approveLOR(amount, lorTokenAddress, marketplaceAddress) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const lorTokenContract = new ethers.Contract(
    lorTokenAddress,
    [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ],
    signer
  );

  const tx = await lorTokenContract.approve(marketplaceAddress, ethers.parseUnits(amount, 18));
  await tx.wait();
  console.log(`Approved ${amount} LOR tokens for the marketplace.`);
}