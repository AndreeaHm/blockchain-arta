import React from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import Gallery from "./components/Gallery";
import ListNFT from "./components/ListNFT";
import BuyNFT from "./components/BuyNFT";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Marketplace</h1>
        {/* Buton pentru conectarea portofelului MetaMask */}
        <ConnectWallet />
      </header>
      <main>
        {/* Galerie NFT-uri */}
        <Gallery />

        {/* Funcționalitate de listare NFT-uri */}
        <div style={{ marginTop: "20px" }}>
          <ListNFT />
        </div>

        {/* Funcționalitate de cumpărare NFT-uri */}
        <div style={{ marginTop: "20px" }}>
          <BuyNFT />
        </div>
      </main>
    </div>
  );
}

export default App;