import React, { useState, useEffect } from "react";

const ListNFTs = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                // Load local NFT data (shrek.json)
                const response = await fetch("/shrek.json");
                const metadata = await response.json();

                // Add the NFT to the list
                const tokens = [
                    {
                        id: 0,
                        owner: "Ana", // Dummy owner for display
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image,
                    },
                ];

                setNfts(tokens);
                setLoading(false);
            } catch (error) {
                console.error("Error loading NFT:", error);
            }
        };

        fetchNFTs();
    }, []);

    if (loading) return <p>Loading NFTs...</p>;

    return (
        <div>
            <h2>Art Gallery</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {nfts.map((nft) => (
                    <div
                        key={nft.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "20px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={nft.image}
                            alt={nft.name}
                            style={{ maxWidth: "100%", borderRadius: "10px" }}
                        />
                        <h3>{nft.name}</h3>
                        <p>{nft.description}</p>
                        <p><strong>Owner:</strong> {nft.owner}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListNFTs;