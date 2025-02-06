import React, { useState, useEffect } from "react";
import { connectWallet, getAccountInfo } from "../wallet";

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Verifică dacă există o adresă salvată în localStorage
    const savedAccount = localStorage.getItem("walletAccount");
    const savedBalance = localStorage.getItem("walletBalance");

    if (savedAccount && savedBalance) {
      setAccount({ address: savedAccount, balanceInEth: savedBalance });
    }
  }, []);

  const handleConnect = async () => {
    await connectWallet();
    const info = await getAccountInfo();
    if (info) {
      setAccount(info);
      // Salvează datele în localStorage pentru persistență
      localStorage.setItem("walletAccount", info.address);
      localStorage.setItem("walletBalance", info.balanceInEth);
    }
  };

  const handleRefresh = async () => {
    // Refresh balanță fără a pierde contul conectat
    const info = await getAccountInfo();
    if (info) {
      setAccount(info);
      localStorage.setItem("walletBalance", info.balanceInEth);
    }
  };

  const handleDisconnect = () => {
    // Șterge datele din localStorage și resetează starea
    localStorage.removeItem("walletAccount");
    localStorage.removeItem("walletBalance");
    setAccount(null);
  };

  return (
    <div>
      {account ? (
        <div>
          <p><strong>Address:</strong> {account.address}</p>
          <p><strong>Balance:</strong> {account.balanceInEth} LOR</p>
          <button onClick={handleRefresh}>Refresh Balance</button>
          <button onClick={handleDisconnect} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
