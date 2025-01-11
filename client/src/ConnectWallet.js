import React, { useState } from "react";
import { ethers } from "ethers";

const ConnectWallet = () => {
    const [address, setAddress] = useState("");

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers v6
        const signer = await provider.getSigner(); // Updated for ethers v6
        const walletAddress = await signer.getAddress();
        setAddress(walletAddress);
    };

    return (
        <div>
            <h2>Connect Wallet</h2>
            <button onClick={connectWallet}>Connect Wallet</button>
            {address && <p>Connected as: {address}</p>}
        </div>
    );
};

export default ConnectWallet;