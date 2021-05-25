import React from "react";

const errors = {
  NO_RESULTS_FOUND: "No results found! Try another search."
}

class SearchResults extends React.Component {

  render() {
    if (this.props.searchResults != null && this.props.searchResults.length > 0) {
      return <div id="results" className="overlap-group-results">
        {this.props.searchResults.map((nft, index) => (
          <div className="nft-result" key={index}>
            <img className="image-14" src={nft.image_url}/>
            <div className="viktoria-bolonina">{nft.token_id}</div>
            <div className="beeple">{nft.contract_id}</div>
          </div>
        ))}
      </div>
    }
    const reason = this.props.reason
    if (reason && errors[reason]) {
      return <div id="results" className="overlap-group-results">
        <div className="error-response">
          {errors[reason]}
        </div>
      </div>
    }
    return <div id="results" className="overlap-group-results">
      <div className="error-response">
        Unexpected error! Try again later.
      </div>
    </div>
  }
}

export default SearchResults