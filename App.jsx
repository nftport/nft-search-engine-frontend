import "./App.css";
import React from "react";
import {Switch, BrowserRouter as Router, Route, useHistory} from "react-router-dom";
import MainPage from "./components/MainPage";
import Results from "./components/Results";
import Privacy from "./components/Privacy";


import {ethers} from "ethers"
import {NftProvider, useNft} from "use-nft"

console.log("ethers")
console.log(ethers)
// const fetcher = ["ethers", { ethers, provider: ethers.getDefaultProvider("mainnet", {alchemy: "ZW1tKx3hcZkd51cF8KU6vj5yqU4NLxhM"}) }]
const fetcher = ["ethers", {
  ethers,
  provider: new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/ZW1tKx3hcZkd51cF8KU6vj5yqU4NLxhM")
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
  "/img/image-2@2x.png",
  "/img/image-3@2x.png",
  "/img/image-4@2x.png",
  "/img/image-5@2x.png",
  "/img/image-7@2x.png",
  "/img/image-11@2x.png",
  "/img/image-6@2x.png",
  "/img/image-8@2x.png",
  "/img/image-12@2x.png",
  "/img/image-9@2x.png",
  "/img/image-13@2x.png",
  "/img/image-10@2x.png",
  "/img/screenshot-2021-05-17-at-11-03-1@2x.png"
]

const mainPageData = {
  landingImages: landingImages,
  cameraImage: "/img/image-16@2x.png",
};

