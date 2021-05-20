import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import "./SkeletonLoader.css";

function SkeletonLoader(props) {
  const { gnft, searchIcon, scifi, search, results, footerProps } = props;

  return (
    <div className="container-center-horizontal">
      <div className="skeleton-loader screen" onClick="window.open('results.html', '_self');">
        <div className="overlap-group1">
          <div className="g-nft apercupro-medium-black-30px">{gnft}</div>
          <div className="search-module-skeleton">
            <div className="search-components-skeleton">
              <div className="search-box-skeleton">
                <img className="search-icon-skeleton" src={searchIcon} />
                <div className="scifi apercupro-medium-black-20px">{scifi}</div>
              </div>
              <div className="button-skeleton">
                <div className="search-skeleton apercupro-medium-white-20px">{search}</div>
              </div>
            </div>
          </div>
        </div>
        <img className="results" src={results} />
        <Footer
          line4={footerProps.line4}
          combinedShape={footerProps.combinedShape}
          text1={footerProps.text1}
          place={footerProps.place}
          privacyPolicy={footerProps.privacyPolicy}
        />
      </div>
    </div>
  );
}

export default SkeletonLoader;
