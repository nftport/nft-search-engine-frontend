import React from "react";


class SkeletonLoader extends React.Component {

  render() {
    let blocks = []
    for (let i = 0; i < 18; i++) {
      blocks.push("")
    }
    return <div id="results" className="overlap-group-results">
      {blocks.map((block, index) => (
        <div className="nft-result" key={index}>
          <div>
            <div className="skeleton-image loader"/>
          </div>
          <div className="skeleton-title loader"/>
          <div className="skeleton-text loader"/>
        </div>
      ))}
    </div>
  }
}

export default SkeletonLoader