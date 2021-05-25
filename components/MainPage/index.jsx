import React from "react";
import {useHistory} from "react-router-dom";
import "./MainPage.css";
import Footer from "../Footer";


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
    landingImages,
    searchIcon,
    cameraImage,
    combinedShape,
  } = props;


  return (
    <>
      <div className="container-center-horizontal">
      <div className="main-page screen">
        <div className="flex-row">
          <div className="flex-col-1">
            <div className="g-nft-i62631055">gNFT</div>
            <img className="image-2" src={landingImages[0]}/>
            <img className="image-3" src={landingImages[1]}/>
          </div>
          <div className="flex-col-6">
            <div className="flex-col-7">
              <h1 className="text-2">Google for NFTs</h1>
              <div className="google-for-nf-ts-i62">Visual & Reverse Image Search for 2M NFTs</div>

              <form onSubmit={handleSubmit}>
                <div className="search-module">
                  <div className="search-components">

                    <div className="search-box">
                      <img className="search-icon" src={searchIcon}/>
                      <input
                        className="search-all-nfts"
                        placeholder="Search by keywords or image URL"
                        value={state.value} onChange={handleChange}
                      />
                      <img className="image-16" src={cameraImage}/>
                    </div>
                    <input type="submit" value="Search" className="button search apercupro-medium-white-20px"/>
                  </div>
                </div>
              </form>

            </div>
            <div className="flex-row-2">
              <div className="flex-col-4">
                <img className="image-4" src={landingImages[2]}/>
                <img className="image-5" src={landingImages[3]}/>
              </div>
              <div className="flex-col-5">
                <img className="image-" src={landingImages[4]}/>
                <img className="image-11" src={landingImages[5]}/>
              </div>
              <img className="image-6" src={landingImages[6]}/>
              <div className="flex-col-3">
                <img className="image-" src={landingImages[7]}/>
                <img className="image-12" src={landingImages[8]}/>
              </div>
              <div className="flex-col-2">
                <img className="image-" src={landingImages[9]}/>
                <img className="image-13" src={landingImages[10]}/>
              </div>
            </div>
          </div>
          <div className="flex-col">
            <div className="overlap-group button">
              <div className="get-api-access"><a href="mailto:info@thesentinel.ai" style={{color:"white"}}>GET API ACCESS</a>
              </div>
            </div>
            <img className="image-10" src={landingImages[11]}/>
            <img className="screenshot-2021-05-17-at-1103-1" src={landingImages[12]}/>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
);
}

export default MainPage;
