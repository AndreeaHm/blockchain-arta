import React from "react";
import ConnectWallet from "./ConnectWallet";
import MintNFT from "./MintNFT";

function App() {
    return (
        <div>
            <h1>Lock NFT Marketplace</h1>
            <ConnectWallet />
            <MintNFT />
        </div>
    );
}

export default App;