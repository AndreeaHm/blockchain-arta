import React, { useState, useEffect } from "react";
import "./Gallery.css";
import NFTModal from "./NFTModal"; // Componenta pentru fereastra modală

const Gallery = () => {
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null); // NFT-ul selectat pentru detalii

  // Încarcă datele NFT-urilor
  useEffect(() => {
    fetch("/nfts/nfts.json")
      .then((response) => response.json())
      .then((data) => setNfts(data));
  }, []);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">NFT Collection</h2>
      <div className="gallery-grid">
        {nfts.map((nft) => (
          <div
            className="nft-card"
            key={nft.id}
            onClick={() => setSelectedNFT(nft)} // Setează NFT-ul selectat
          >
            <img src={nft.image} alt={nft.name} className="nft-image" />
            <div className="nft-details">
              <h3 className="nft-name">{nft.name}</h3>
              <p className="nft-price">{nft.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Afișează modalul dacă există un NFT selectat */}
      {selectedNFT && (
        <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
      )}
    </div>
  );
};

export default Gallery;