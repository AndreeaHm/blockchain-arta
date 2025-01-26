import React, { useState, useEffect } from "react";
import { buyNFT } from "../wallet"; // Funcția pentru cumpărare

const BuyNFT = () => {
  const [id, setId] = useState("");
  const [nfts, setNfts] = useState([]);
  const [error, setError] = useState("");

  // Încarcă NFT-urile din fișierul JSON din public/nfts
  useEffect(() => {
    fetch("/nfts/nfts.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch NFTs");
        }
        return response.json();
      })
      .then((data) => {
        setNfts(data);
        setError(""); // Curăță erorile, dacă există
      })
      .catch((error) => {
        console.error("Error loading NFTs:", error);
        setError("Could not load NFTs. Check the console for details.");
      });
  }, []);

  const handleBuyNFT = async () => {
    const selectedNFT = nfts.find((nft) => nft.id === parseInt(id));
    if (!selectedNFT) {
      alert("Invalid NFT ID or NFT not found.");
      return;
    }

    try {
      // Trimite tranzacția către blockchain
      await buyNFT(id);
      alert(`Successfully purchased NFT: ${selectedNFT.name} for ${selectedNFT.price}`);
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      alert("Purchase failed. Check the console for details.");
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
      <button onClick={handleBuyNFT}>Buy NFT</button>
    </div>
  );
};

export default BuyNFT;