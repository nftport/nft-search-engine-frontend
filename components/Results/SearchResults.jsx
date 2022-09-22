import React from "react";
import ResultNFT from "./ResultNFT";

const errors = {
  NO_RESULTS_FOUND: "No results found! Try another search.",
  INVALID_URL: "Url format is invalid.",
  SERVER_ERROR: "Server error! Try again later.",
  DOWNLOAD_FAILED: "File download failed! Try with another url.",
  FILE_TYPE_NOT_SUPPORTED: "File type not supported! Try with image file."
}

class SearchResults extends React.Component {

  render() {
    if (this.props.searchResults != null && this.props.searchResults.length > 0) {
      return <>
        {this.props.searchResults.map((nft, index) => (
          <ResultNFT key={index} nft={nft}/>
        ))}
      </>
    }
    const reason = this.props.reason
    if (reason && reason['status_code'] === 404) {
      return <div className="error-response">
        {errors.NO_RESULTS_FOUND}
        <div style={{height: "100%"}}>
          <img
              className="response-image"
              src="https://storage.googleapis.com/nft-search/img/no-results.png"
          />
        </div>
      </div>
    }
    if (reason && reason['status_code'] === 400 && reason['message'] === "File type not supported.") {
      return <div className="error-response">
        {errors.FILE_TYPE_NOT_SUPPORTED}
        <div style={{height: "100%"}}>
          <img
              style={{marginTop: "100px"}}
              className="response-image"
              src="https://storage.googleapis.com/nft-search/img/error.png"
          />
        </div>
      </div>
    }
    if (reason && errors[reason]) {
      return <>
        <div className="error-response">
          {errors[reason]}
          {reason === "NO_RESULTS_FOUND" ?
            <div style={{height: "100%"}}>
              <img
                className="response-image"
                src="https://storage.googleapis.com/nft-search/img/no-results.png"
              />
            </div>
            : <div style={{height: "100%"}}>
              <img
                style={{marginTop: "100px"}}
                className="response-image"
                src="https://storage.googleapis.com/nft-search/img/error.png"
              />
            </div>
          }
        </div>
      </>
    }
    if (reason) {
      return <>
        <div className="error-response">
          Unexpected error! Try again later.
          <div style={{height: "100%"}}>
            <img
              style={{marginTop: "100px"}}
              className="response-image"
              src="https://storage.googleapis.com/nft-search/img/error.png"
            />
          </div>
        </div>
      </>
    }
    return <>
      <div className="error-response">
      </div>
    </>
  }
}

export default SearchResults