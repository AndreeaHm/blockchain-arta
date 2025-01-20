import React, { useState } from "react";
import { listNFT } from "../wallet";

const ListNFT = () => {
  const [price, setPrice] = useState("");

  const handleListNFT = async () => {
    await listNFT(price);
  };

  return (
    <div>
      <h2>List an NFT</h2>
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