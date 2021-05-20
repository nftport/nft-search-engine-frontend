import React from "react";
import Footer from "../Footer";
import "./Results.css";
import {
  useParams
} from "react-router-dom";


function GetDiv(searchResults) {
  console.log("GetDiv")
  console.log(searchResults)
  return <>
    {searchResults.map((result, index) => (
      <div className="photography" key={index}>
        <img className="image-14" src={result.image_url}/>
        <div className="viktoria-bolonina">title</div>
        <div className="beeple">aa</div>
      </div>
    ))}
  </>;
}

function Results(props) {
  let params = useParams()

  const state = {}
  let searchResults = null

  const pagination = {
    pageNumber: 1,
    pageSize: 20
  }

  if (params && params.query) {
    searchImages(params.query, pagination)
    // state.value = params.query
  }

  function handleChange(event) {
    state.value = event.target.value
    console.log(state)
  }

  function handleSubmit(event) {
    event.preventDefault();
    // history.push("/results/" + state.value);
    console.log("handle submit")
  }

  function searchImages(query, pagination) {
    fetch("http://0.0.0.0:80/search", {
      method: "POST",
      body: JSON.stringify({
        query: query,
        page_size: pagination.pageSize,
        page_number: pagination.pageNumber
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("response")
        console.log(json)
        if (json && json.images) {
          searchResults = []
          json.images.forEach(imageObject => {
            searchResults.push(imageObject)
          })

          console.log("searchResults")
          console.log(searchResults)
        }
      });
  }

  const {gnft, searchIcon, scifi, search, overlapGroup, image14, viktoriaBolonina, beeple, footerProps} = props;

  return (
    <div className="container-center-horizontal">
      <div className="results screen">
        <div className="overlap-group2">
          <div className="g-nft apercupro-medium-black-30px">{gnft}</div>
          <div className="search-module-results">
            <div className="search-components-results">
              <div className="search-box-results">
                <img className="search-icon-results" src={searchIcon}/>
                <input
                  className="search-all-nfts-results"
                  placeholder="Search all NFTs"
                  value={state.value} onChange={handleChange}
                />
              </div>
              <div className="button-results">
                <div className="search-results apercupro-medium-white-20px">{search}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="results" className="overlap-group-results">
          {searchResults != null && <h2> jo </h2>}

          {/*<div className="photography">*/}
          {/*  <img className="image-14" src={image14}/>*/}
          {/*  <div className="viktoria-bolonina">{viktoriaBolonina}</div>*/}
          {/*  <div className="beeple">{beeple}</div>*/}
          {/*</div>*/}
          {/*{getDiv(searchResults)}*/}
        </div>
        <Footer
          line4={footerProps.line4}
          combinedShape={footerProps.combinedShape}
          text1={footerProps.text1}
          place={footerProps.place}
          privacyPolicy={footerProps.privacyPolicy}
          className="footer"
        />
      </div>
    </div>
  );
}

export default Results;
