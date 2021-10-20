import React from "react";
import ResultNFT from "./ResultNFT";

const errors = {
  NO_RESULTS_FOUND: "No results found! Try another search.",
  SERVER_ERROR: "Server error! Try again later.",
  DOWNLOAD_FAILED: "File download failed! Try with another url."
}

class SearchResults extends React.Component {

  render() {
    if (this.props.searchResults != null && this.props.searchResults.length > 0) {
      return <div id="results" className="overlap-group-results">
        {this.props.searchResults.map((nft, index) => (
          <ResultNFT key={index} nft={nft}/>
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
    if (reason) {
      return <div id="results" className="overlap-group-results">
        <div className="error-response">
          Unexpected error! Try again later.
        </div>
      </div>
    }
    return <div id="results" className="overlap-group-results">
      <div className="error-response">
        {errors["NO_RESULTS_FOUND"]}
      </div>
    </div>
  }
}

export default SearchResults