import React, { useState, useEffect } from "react";
import "./Gallery.css";
import NFTModal from "./NFTModal";

const ipfsGateway = "http://127.0.0.1:8080/ipfs/";

const Gallery = () => {
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);

  useEffect(() => {
    fetch("/nfts/nfts.json")
      .then((response) => response.json())
      .then((data) => {
        // Preia datele NFT și construiește URL-urile către fișierele JSON și imaginile NFT-urilor
        const fetchNFTDetails = data.map(async (nft) => {
          try {
            //IPFS
            const metadataUrl = `${ipfsGateway}${nft.ipfs}`;
            const response = await fetch(metadataUrl);
            const details = await response.json();

            const imagePath = details.image;  // path local


            return {
              ...details,
              id: nft.id,
              price: nft.price,
              image: imagePath,
            };
          } catch (error) {
            console.error(`Error fetching NFT details for ID ${nft.id}:`, error);
            return null;
          }
        });

        Promise.all(fetchNFTDetails).then((results) => {
          setNfts(results.filter((nft) => nft !== null)); // Eliminăm rezultatele care sunt null
        });
      })
      .catch((err) => console.error("Eroare la încărcarea datelor:", err));
  }, []);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">NFT Collection</h2>
      <div className="gallery-grid">
        {nfts.map((nft) => (
          <div className="nft-card" key={nft.id} onClick={() => setSelectedNFT(nft)}>
            <img src={nft.image} alt={nft.name} className="nft-image" />
            <div className="nft-details">
              <h3 className="nft-name">{nft.name}</h3>
              <p className="nft-price">{nft.price} LOR</p>
            </div>
          </div>
        ))}
      </div>

      {selectedNFT && <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />}
    </div>
  );
};

export default Gallery;