import React from "react";
import { connectWallet } from "../wallet";

const ConnectWallet = () => {
  return (
    <button onClick={connectWallet}>Connect Wallet</button>
  );
};

export default ConnectWallet;