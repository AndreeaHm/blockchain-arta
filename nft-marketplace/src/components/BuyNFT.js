import React, { useState } from "react";
import { buyNFT } from "../wallet";

const BuyNFT = () => {
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");

  const handleBuyNFT = async () => {
    await buyNFT(id, price);
  };

  return (
    <div>
      <h2>Buy an NFT</h2>
      <input
        type="text"
        placeholder="Enter NFT ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleBuyNFT}>Buy NFT</button>
    </div>
  );
};

export default BuyNFT;