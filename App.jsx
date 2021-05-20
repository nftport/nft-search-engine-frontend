import "./App.css";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import SkeletonLoader from "./components/SkeletonLoader";
import MainPage from "./components/MainPage";
import Results from "./components/Results";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/skeleton-loader">
          <SkeletonLoader
            gnft="gNFT"
            searchIcon="/img/search-icon@2x.svg"
            scifi="Scifi"
            search="Search"
            results="/img/results-1@1x.svg"
            footerProps={skeletonLoaderData.footerProps}
          />
        </Route>
        <Route path="/:path(|main-page)">
          <MainPage {...mainPageData} />
        </Route>
        <Route path="/results/:query">
          <Results {...resultsData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const footerData = {
    line4: "/img/line-4-3@1x.svg",
    combinedShape: "/img/combined-shape@2x.svg",
    text1: "Copyright (c) 2021 gNFT. All rights reserved.",
    place: "Contact",
    privacyPolicy: "Privacy Policy",
};

const skeletonLoaderData = {
    footerProps: footerData,
};

const footer2Data = {
    line4: "/img/line-4-3@1x.svg",
    combinedShape: "/img/combined-shape@2x.svg",
    text1: "Copyright (c) 2021 gNFT. All rights reserved.",
    place: "Contact",
    privacyPolicy: "Privacy Policy",
};

const resultsData = {
    gnft: "gNFT",
    searchIcon: "/img/search-icon@2x.svg",
    scifi: "Scifi",
    search: "Search",
    overlapGroup: "/img/results@1x.svg",
    image14: "/img/image-14@2x.png",
    viktoriaBolonina: "Viktoria Bolonina",
    beeple: "@Beeple",
    footerProps: footer2Data,
};

const mainPageData = {
    image2: "/img/image-2@2x.png",
    image3: "/img/image-3@2x.png",
    searchIcon: "/img/search-icon-1@2x.svg",
    image16: "/img/image-16@2x.png",
    image4: "/img/image-4@2x.png",
    image5: "/img/image-5@2x.png",
    image7: "/img/image-7@2x.png",
    image11: "/img/image-11@2x.png",
    image6: "/img/image-6@2x.png",
    image8: "/img/image-8@2x.png",
    image12: "/img/image-12@2x.png",
    image9: "/img/image-9@2x.png",
    image13: "/img/image-13@2x.png",
    image10: "/img/image-10@2x.png",
    screenshot20210517At11031: "/img/screenshot-2021-05-17-at-11-03-1@2x.png",
    line4: "/img/line-4@1x.svg",
    combinedShape: "/img/combined-shape@2x.svg",
};

