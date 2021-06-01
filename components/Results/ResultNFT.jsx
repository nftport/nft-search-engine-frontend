import React from "react";
import {useNft} from "use-nft"

function getExternalUrl(propsNft) {
  if (propsNft && propsNft.external_url) {
    return propsNft.external_url
  }
  return "https://opensea.io/assets/" + propsNft.contract_id + "/" + propsNft.token_id
}

function ResultNFT(props) {
  let nft = null;
  if (props.nft.raw_metadata && Object.keys(props.nft.raw_metadata).length) {
    nft = props.nft.raw_metadata
  } else {
    const nftLoader = useNft(props.nft.contract_id, props.nft.token_id)
    if (!nftLoader.loading) {
      nft = nftLoader.nft
    }
  }
  return <a href={getExternalUrl(props.nft)} target="_blank">
    <div className="nft-result">
      <img className="result-image" src={props.nft.image_url}/>
      {nft ?
        <>
          <div className="viktoria-bolonina">{nft.name}</div>
          <div className="beeple">{!nft.description || nft.description.length < 100 ? nft.description : nft.description.slice(0, 100) + "..."}</div>
        </> :
        <>
          <div className="viktoria-bolonina">{props.nft.token_id}</div>
          <div className="beeple">{props.nft.contract_id}</div>
        </>
      }

    </div>
  </a>
}


export default ResultNFT