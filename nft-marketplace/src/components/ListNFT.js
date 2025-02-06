import React, { useState } from "react";
import { listNFT } from "../wallet";

const ListNFT = () => {
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleListNFT = async () => {
    setError(""); // Reset error
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      await listNFT(price);
      alert(`NFT listed at price: ${price} ETH`);
    } catch (error) {
      setError("Failed to list NFT. Check console for details.");
    }
  };

  return (
    <div>
      <h2>List an NFT</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleListNFT}>List NFT</button>
    </div>
  );
};

export default ListNFT;
