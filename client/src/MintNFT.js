import React, { useState } from "react";
import { ethers } from "ethers";
import Lock from "./abi/NFTContract.json"; // ABI-ul contractului

const MintNFT = () => {
    const [tokenURI, setTokenURI] = useState("");
    const [status, setStatus] = useState("");

    const mintNFT = async () => {
        try {
            if (!window.ethereum) {
                alert("Please install MetaMask!");
                return;
            }
    
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
    
            // Confirmă adresa conectată
            const address = await signer.getAddress();
            console.log("Connected wallet address:", address);
    
            const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Actualizează adresa
            const contract = new ethers.Contract(contractAddress, Lock.abi, signer);
    
            // Debugging pentru funcțiile contractului
            console.log("Contract functions:", Object.keys(contract.functions));
    
            // Apel funcție mintNFT
            setStatus("Minting...");
            console.log("Available functions:", Object.keys(contract.functions));
            const tx = await contract.mintNFT(tokenURI); // Transmite doar tokenURI
            await tx.wait();
    
            setStatus(`Minted! Transaction Hash: ${tx.hash}`);
        } catch (error) {
            console.error("Error minting NFT:", error.message || error);
            setStatus("Error occurred while minting.");
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
            {status && <p>{status}</p>}
        </div>
    );
};

export default MintNFT;