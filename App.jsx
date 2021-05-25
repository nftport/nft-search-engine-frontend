import "./App.css";
import React from "react";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import Results from "./components/Results";
import Privacy from "./components/Privacy";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:path(|main-page)">
          <MainPage {...mainPageData} />
        </Route>
        <Route path="/results/:query">
          <Results {...resultsData} />
        </Route>
        <Route path="/privacy-policy">
          <Privacy/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const footerData = {
  combinedShape: "/img/combined-shape@2x.svg",
  text1: "Copyright (c) 2021 gNFT. All rights reserved.",
  place: "Contact",
  privacyPolicy: "Privacy Policy",
};

const skeletonLoaderData = {
  footerProps: footerData,
};

const footer2Data = {
  combinedShape: "/img/combined-shape@2x.svg",
  text1: "Copyright (c) 2021 gNFT. All rights reserved.",
  place: "Contact",
  privacyPolicy: "Privacy Policy",
};

const resultsData = {
  searchIcon: "/img/search-icon@2x.svg",
  overlapGroup: "/img/results@1x.svg",
  footerProps: footer2Data,
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
  searchIcon: "https://storage.googleapis.com/nft-search/img/search-icon%402x.svg",
};

