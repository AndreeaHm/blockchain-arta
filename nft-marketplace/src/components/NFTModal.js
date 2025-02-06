import React, { useState, useEffect } from "react";
import { buyNFT, estimateGasBuyNFT, saveNFTOwner, getNFTOwnerFromDB } from "../wallet";
import "./NFTModal.css";

const NFTModal = ({ nft, onClose }) => {
  const [owner, setOwner] = useState(null);
  const [isBought, setIsBought] = useState(false);
  const [gasEstimate, setGasEstimate] = useState(null);
  const [loadingGas, setLoadingGas] = useState(false);

  // Căutăm owner-ul NFT-ului doar în baza de date JSON Server
  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const ownerAddress = await getNFTOwnerFromDB(nft.id); // Luăm owner-ul doar din JSON Server

        if (ownerAddress) {
          setOwner(ownerAddress);
          setIsBought(true);
        }
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };

    fetchOwner();
  }, [nft.id]);

  //Estimare gas
  const handleEstimateGas = async () => {
    setLoadingGas(true);
    try {
      const estimatedGas = await estimateGasBuyNFT(nft.id, nft.price);
      var modelContentButton = document.getElementById('modal-content');
      modelContentButton.style.height = window.innerHeight * 0.91 + 'px';

      var estGasButton = document.getElementsByClassName('estimate-gas-button')[0];
      // urca butonul 
      estGasButton.style.marginBottom = '10px';
      estGasButton.style.marginTop = '0px';

      if (estimatedGas) {
        setGasEstimate(estimatedGas.toString()); // valoarea estimată
      }
    } catch (error) {
      console.error("Error estimating gas:", error);
    }
    setLoadingGas(false);
  };

  // Funcție cumpărare NFT (actualizare doar JSON Server)
  const handleBuy = async () => {
    try {
      const price = parseFloat(nft.price);
      if (isNaN(price)) {
        alert("Invalid price format!");
        return;
      }

      await buyNFT(nft.id, price);
      alert("Purchase successful!");
      setIsBought(true);

      onClose(); // Închide modalul fără refresh
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      alert("Error during transaction. Check console for details.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" id='modal-content'>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={nft.image} alt={nft.name} className="modal-image" style={{ height: "60%" }} />
        <div className="modal-details">
          <h2>{nft.name}</h2>
          <p>{nft.description}</p>

          {/* Afișează owner dacă NFT-ul a fost cumpărat */}
          {isBought ? (
            <p><strong>Owner:</strong> {owner}</p>
          ) : (
            <>
              {/* Buton pentru estimarea gas */}
              <button onClick={handleEstimateGas} className="estimate-gas-button">
                {loadingGas ? "Estimating..." : "Estimate Gas"}



              </button>

              {/* Afișează estimarea dacă există */}
              {gasEstimate && <p><strong>Estimated Gas:</strong> {gasEstimate} wei</p>}

              {/* Buton de cumpărare NFT */}
              <button onClick={handleBuy} className="buy-button">
                Buy for {nft.price} LOR
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTModal;
