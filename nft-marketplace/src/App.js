import React, { useState } from "react";
import "./App.css";
import { connectWallet, listNFT } from "./wallet";
import Gallery from "./components/Gallery";

function App() {
  const [walletAddress, setWalletAddress] = useState(""); // Stochează adresa portofelului
  const [price, setPrice] = useState(""); // Prețul pentru listarea NFT-urilor

  // Funcție pentru conectarea portofelului
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setWalletAddress(accounts[0]); // Setează adresa portofelului conectat
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Funcție pentru listarea NFT-urilor
  const handleListNFT = async () => {
    if (!price) {
      alert("Please enter a price for the NFT.");
      return;
    }

    try {
      await listNFT(price);
      alert("NFT listed successfully!");
      setPrice(""); // Resetează câmpul de preț după listare
    } catch (error) {
      console.error("Error listing NFT:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Marketplace</h1>
        {/* Buton pentru conectarea MetaMask */}
        <button
          onClick={handleConnectWallet}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            cursor: "pointer",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
        </button>
      </header>
      <main>
        {/* Galerie NFT-uri */}
        <Gallery />

        {/* Formular pentru listarea NFT-urilor */}
        <div style={{ margin: "20px" }}>
          <h2>List an NFT</h2>
          <input
            type="text"
            placeholder="Enter price in ETH"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handleListNFT}
            style={{
              padding: "10px 20px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            List NFT
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;