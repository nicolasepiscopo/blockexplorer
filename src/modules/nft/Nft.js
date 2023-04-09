import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { alchemy } from "../../lib/alchemy";

import './Nft.css'

/**
 * A component that renders two inputs one for a contract address and another for
 * the token id. When the user clicks a button, it should display the NFT's metadata.
 */
export function Nft () {
  const [contractAddress, setContractAddress] = useState();
  const [tokenId, setTokenId] = useState();

  const results = useQueries({
    queries: [
      {
        queryKey: ['nft', contractAddress, tokenId],
        queryFn: () => alchemy.nft.getNftMetadata(contractAddress, tokenId),
        enabled: !!contractAddress && !!tokenId,
      },
      {
        queryKey: ['nftFloorPrice', contractAddress, tokenId],
        queryFn: () => alchemy.nft.getFloorPrice(contractAddress, tokenId),
        enabled: !!contractAddress && !!tokenId,
      }
    ]
  });
  const error = results?.[0].error || results?.[1].error;
  const nft = results?.[0].data;
  const floorPrice = results?.[1].data;

  return (
    <div className="Nft">
      <h1>NFT</h1>
      <input
        type="text"
        placeholder="Enter a contract address. e.g. 0x00000000000"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter a token id"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />

      {error && <p>Error! Please try again.</p>}

      {nft && (
        <div>
          <h2>Metadata</h2>
          <p>{nft.title}</p>
          <p>{nft.description}</p>
          <p>Floor Price: {Object.entries(floorPrice).map(([store, { floorPrice }]) => `${floorPrice} (${store})`).join(', ')}</p>
          <img src={nft.media[0].raw} alt="NFT" />
        </div>
      )}
    </div>
  )
}