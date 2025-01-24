import React from "react";
import { buyNFT } from "../wallet"; // Funcția de cumpărare
import "./NFTModal.css";

const NFTModal = ({ nft, onClose }) => {
  const handleBuy = async () => {
    try {
      // ID-ul și prețul NFT-ului sunt luate din obiectul nft
      const id = nft.id;
      const price = parseFloat(nft.price); // Conversie preț din ETH
      await buyNFT(id, price); // Apelează funcția de cumpărare
      alert("Purchase successful!");
      onClose(); // Închide modalul
    } catch (error) {
      console.error("Error purchasing NFT:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <img src={nft.image} alt={nft.name} className="modal-image" />
        <div className="modal-details">
          <h2>{nft.name}</h2>
          <p>{nft.description}</p>
          {nft.owner ? (
            <p className="nft-owner">
              <strong>Owner:</strong> {nft.owner}
            </p>
          ) : (
            <button onClick={handleBuy} className="buy-button">
              Buy for {nft.price}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTModal;