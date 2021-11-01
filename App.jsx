import "./App.css";
import React from "react";
import {Switch, BrowserRouter as Router, Route, useHistory} from "react-router-dom";
import MainPage from "./components/MainPage";
import Results from "./components/Results";
import Privacy from "./components/Privacy";


import {ethers} from "ethers"
import {NftProvider, useNft} from "use-nft"

const fetcher = ["ethers", {
  ethers,
  provider: new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL)
}]


function App() {
  const fileSearchInput = {}

  function fileSearch(fileInput) {
    fileSearchInput.file = fileInput
  }

  return (
    <NftProvider fetcher={fetcher}>
      <Router>
        <Switch>
          <Route path="/:path(|main-page)">
            <MainPage {...mainPageData} fileSearch={fileSearch}/>
          </Route>
          <Route path="/results">
            <Results {...resultsData} fileSearchInput={fileSearchInput}/>
          </Route>
          <Route path="/privacy-policy">
            <Privacy/>
          </Route>
        </Switch>
      </Router>
    </NftProvider>
  );
}

export default App;


const resultsData = {
  searchIcon: "/img/search-icon@2x.svg",
  overlapGroup: "/img/results@1x.svg",
};

const landingImages = [
  "/img/image-2@2x.jpg",
  "/img/image-3@2x.jpg",
  "/img/image-4@2x.jpg",
  "/img/image-5@2x.jpg",
  "/img/image-7@2x.jpg",
  "/img/image-11@2x.jpg",
  "/img/image-6@2x.jpg",
  "/img/image-8@2x.jpg",
  "/img/image-12@2x.jpg",
  "/img/image-9@2x.jpg",
  "/img/image-13@2x.jpg",
  "/img/image-10@2x.jpg",
  "/img/screenshot-2021-05-17-at-11-03-1@2x.jpg"
]

const mainPageData = {
  landingImages: landingImages,
  cameraImage: "/img/camera.svg",
};

