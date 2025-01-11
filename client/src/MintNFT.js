import React, { useState } from "react";
import { ethers } from "ethers";
import NFTContractABI from "./abi/NFTContract.json"; // Corrected path

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your contract address

const MintNFT = () => {
    const [tokenURI, setTokenURI] = useState("");

    const mintNFT = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6
        const signer = await provider.getSigner();
        const nftContract = new ethers.Contract(CONTRACT_ADDRESS, NFTContractABI.abi, signer);

        try {
            const tx = await nftContract.mint(tokenURI); // Call the mint function
            await tx.wait(); // Wait for the transaction to complete
            alert("NFT minted successfully!");
        } catch (error) {
            console.error("Minting error:", error);
            alert("Error minting NFT!");
        }
    };

    return (
        <div>
            <h2>Mint a New NFT</h2>
            <input
                type="text"
                placeholder="Enter Token URI"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
            />
            <button onClick={mintNFT}>Mint NFT</button>
        </div>
    );
};

export default MintNFT;