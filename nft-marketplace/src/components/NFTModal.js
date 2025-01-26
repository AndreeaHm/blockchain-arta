import React from "react";
import { buyNFT} from "../wallet"; // Integrează și funcția de aprobare
import "./NFTModal.css";

const NFTModal = ({ nft, onClose }) => {
  const handleBuy = async () => {
    try {
      // Verificăm și convertim prețul în număr
      const price = parseFloat(nft.price); // Convertim prețul într-un număr valid
      if (isNaN(price)) {
        alert("Invalid price format!");
        return;
      }
  
      // Cumpărare NFT cu preț
      const id = nft.id;
      await buyNFT(id, price); // Transmitem prețul către `buyNFT`
      alert("Purchase successful!");
      onClose(); // Închide modalul
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      alert("Error during transaction. Check console for details.");
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
              Buy for {nft.price} LOR
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTModal;