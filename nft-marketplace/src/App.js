import React from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import ListNFT from "./components/ListNFT";
import BuyNFT from "./components/BuyNFT";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Marketplace</h1>
        {/* Buton pentru conectarea la MetaMask */}
        <ConnectWallet />
      </header>
      <main>
        {/* Componentă pentru listarea NFT-urilor */}
        <ListNFT />
        {/* Componentă pentru cumpărarea NFT-urilor */}
        <BuyNFT />
      </main>
    </div>
  );
}

export default App;