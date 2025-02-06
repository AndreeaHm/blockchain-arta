import React, { useState, useEffect } from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import { fetchAndStoreNFTs } from "./wallet";
import Gallery from "./components/Gallery";
import ListNFT from "./components/ListNFT";
import BuyNFT from "./components/BuyNFT";
import { listenToEvents } from "./wallet";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    listenToEvents((newEvent) => {
      setEvents((prevEvents) => [newEvent, ...prevEvents]); // Adăugăm evenimentul la listă
      fetchAndStoreNFTs();
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Marketplace</h1>
        <ConnectWallet />
      </header>
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default App;
