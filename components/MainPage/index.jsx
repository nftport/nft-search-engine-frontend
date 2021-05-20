import React from "react";
import {Link, useHistory} from "react-router-dom";
import "./MainPage.css";
import Footer from "../Footer";
import {useState} from 'react';


function MainPage(props) {

  let history = useHistory();

  const state = {}

  function handleChange(event) {
    state.value = event.target.value
  }

  function handleSubmit(event) {
    event.preventDefault();
    history.push("/results/" + state.value);
  }

  const {
    image2,
    image3,
    searchIcon,
    image16,
    image4,
    image5,
    image7,
    image11,
    image6,
    image8,
    image12,
    image9,
    image13,
    image10,
    line4,
    combinedShape,
  } = props;


  return (
    <div className="container-center-horizontal">
      <div className="main-page screen">
        <div className="flex-row">
          <div className="flex-col-1">
            <div className="g-nft-i62631055">gNFT</div>
            <img className="image-2" src={image2}/>
            <img className="image-3" src={image3}/>
          </div>
          <div className="flex-col-6">
            <div className="flex-col-7">
              <h1 className="text-2">Google for NFTs</h1>
              <div className="google-for-nf-ts-i62">Visual & Reverse Image Search for 20M+ NFTs</div>

              <form onSubmit={handleSubmit}>
                <div className="search-module">
                  <div className="search-components">

                    <div className="search-box">
                      <img className="search-icon" src={searchIcon}/>
                      <input
                        className="search-all-nfts"
                        placeholder="Search all NFTs"
                        value={state.value} onChange={handleChange}
                      />
                      <img className="image-16" src={image16}/>
                    </div>
                    <input type="submit" value="Search" className="button search apercupro-medium-white-20px"/>
                  </div>
                </div>
              </form>

            </div>
            <div className="flex-row-2">
              <div className="flex-col-4">
                <img className="image-4" src={image4}/>
                <img className="image-5" src={image5}/>
              </div>
              <div className="flex-col-5">
                <img className="image-" src={image7}/>
                <img className="image-11" src={image11}/>
              </div>
              <img className="image-6" src={image6}/>
              <div className="flex-col-3">
                <img className="image-" src={image8}/>
                <img className="image-12" src={image12}/>
              </div>
              <div className="flex-col-2">
                <img className="image-" src={image9}/>
                <img className="image-13" src={image13}/>
              </div>
            </div>
          </div>
          <div className="flex-col">
            <div className="overlap-group button">
              <div className="get-api-access">GET API ACCESS</div>
            </div>
            <img className="image-10" src={image10}/>
          </div>
        </div>
        <Footer
          line4={line4}
          combinedShape={combinedShape}
          text1="Copyright (c) 2021 gNFT. All rights reserved."
          place="Contact"
          privacyPolicy="Privacy Policy"
          className="footer"
        />
      </div>
    </div>
  );
}

export default MainPage;
