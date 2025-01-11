import React from "react";
import ConnectWallet from "./ConnectWallet";
import MintNFT from "./MintNFT";
import ListNFTs from "./ListNFTs";

function App() {
    return (
        <div>
            <h1>Lock NFT Marketplace</h1>
            <ConnectWallet />
            <ListNFTs />
            <MintNFT />
        </div>
    );
}

export default App;