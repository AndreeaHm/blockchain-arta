import React, { useState, useEffect } from "react";

const ListNFTs = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const response = await fetch("/nfts/nft-list.json");
                const nftList = await response.json();

                const tokens = [];

                for (const nftPath of nftList) {
                    const nftResponse = await fetch(`/${nftPath}`);
                    const metadata = await nftResponse.json();
                    tokens.push({
                        id: tokens.length,
                        // owner: "Unknown",
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image,
                    });
                }

                setNfts(tokens);
                setLoading(false);
            } catch (error) {
                console.error("Error loading NFTs:", error);
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
                            border: "1px solid #ccc", // Borderul căsuței
                            borderRadius: "10px", // Colțuri rotunjite pentru căsuță
                            padding: "20px", // Spațiu interior între conținut și margini
                            textAlign: "center", // Aliniere text în centrul căsuței
                            width: "350px", // Lățimea căsuței
                            height: "400px", // Înălțimea căsuței
                            margin: "10px auto",
                                            }}
                    >
                        <img
                            src={nft.image}
                            alt={nft.name}
                            style={{
                                maxWidth: "300px", // Dimensiunea maximă pe lățime
                                maxHeight: "300px", // Dimensiunea maximă pe înălțime
                                width: "auto", // Ajustează automat lățimea proporțional
                                height: "auto", // Ajustează automat înălțimea proporțional
                                borderRadius: "10px", // Colțuri rotunjite
                                marginBottom: "10px", // Spațiu între imagine și text
                                display: "block", // Pentru aliniere corectă în centrul containerului
                                margin: "0 auto", // Centrează imaginea pe orizontală
                            }}
                        />
                        <h3>{nft.name}</h3>
                        <p>{nft.description}</p>
                        {/* <p><strong>Owner:</strong> {nft.owner}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListNFTs;