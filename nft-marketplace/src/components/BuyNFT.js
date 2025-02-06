import React, { useState, useEffect } from "react";
import { buyNFT, estimateGasBuyNFT } from "../wallet";

const BuyNFT = () => {
  const [id, setId] = useState("");
  const [nfts, setNfts] = useState([]);
  const [error, setError] = useState("");
  const [gasEstimate, setGasEstimate] = useState(null);

  useEffect(() => {
    fetch("/nfts/nfts.json")
      .then((response) => response.json())
      .then((data) => setNfts(data))
      .catch((error) => setError("Could not load NFTs."));
  }, []);

  const handleEstimateGas = async () => {
    setError(""); // Reset eroare
    const selectedNFT = nfts.find((nft) => nft.id === parseInt(id));
    if (!selectedNFT) {
      setError("Invalid NFT ID or NFT not found.");
      return;
    }

    try {
      const estimatedGas = await estimateGasBuyNFT(id, selectedNFT.price);
      setGasEstimate(estimatedGas.toString());
    } catch (error) {
      setError("Error estimating gas. Check console for details.");
    }
  };

  const handleBuyNFT = async () => {
    setError(""); // Reset eroare
    const selectedNFT = nfts.find((nft) => nft.id === parseInt(id));
    if (!selectedNFT) {
      setError("Invalid NFT ID or NFT not found.");
      return;
    }

    try {
      await buyNFT(id, selectedNFT.price);
      alert(`Successfully purchased NFT: ${selectedNFT.name} for ${selectedNFT.price}`);
    } catch (error) {
      setError("Purchase failed. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Buy an NFT</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter NFT ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleEstimateGas}>Estimate Gas</button>
      {gasEstimate && <p>Estimated Gas: {gasEstimate}</p>}
      <button onClick={handleBuyNFT}>Buy NFT</button>
    </div>
  );
};

export default BuyNFT;
