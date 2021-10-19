import React from "react";
import "./search.css";
import FileUploadForm from "../FileUploadForm";

class SearchModule extends React.Component {

  state = {
    showFileUpload: false,
    files: [],
    searchType: "text",
    value: "",
    urlValue: "",
    counterfeitSearch: {
      contractAddress: "",
      tokenId: "",
      chain: "ethereum",
      filterAddress: "",
    },
  }


  toggleFileUploader = () => {
    this.setState({showFileUpload: !this.state.showFileUpload})
  }

  handleSearchTypeChange = event => {
    this.state.searchType = event.target.value
    this.setState({
      searchType: event.target.value,
      showFileUpload: false,
      value: ""
    })
  }

  handleQueryChange = event => {
    this.state.value = event.target.value
    this.setState({value: event.target.value})
  }

  handleContractChange = event => {
    this.state.counterfeitSearch.contractAddress = event.target.value
    this.setState({counterfeitSearch: this.state.counterfeitSearch})
  }

  handleTokenChange = event => {
    this.state.counterfeitSearch.tokenId = event.target.value
    this.setState({counterfeitSearch: this.state.counterfeitSearch})
  }

  handleFilterAddressChange = event => {
    this.state.counterfeitSearch.filterAddress = event.target.value
    this.setState({counterfeitSearch: this.state.counterfeitSearch})
    console.log(this.state.counterfeitSearch)
  }

  handleChainChange = event => {
    this.state.counterfeitSearch.chain = event.target.value
    this.setState({counterfeitSearch: this.state.counterfeitSearch})
  }

  handleUrlQueryChange = event => {
    this.state.urlValue = event.target.value
    this.setState({urlValue: event.target.value})
  }

  handleQuerySubmit = event => {
    event.preventDefault();
    if (this.state.value) {
      this.props.onSubmit(this.state.searchType, this.state.value)
    } else if (this.state.urlValue) {
      this.props.onSubmit(this.state.searchType, this.state.urlValue)
    } else if (this.state.searchType === "counterfeit"
      && this.state.counterfeitSearch.contractAddress
      && this.state.counterfeitSearch.tokenId) {
      this.props.onSubmit(this.state.searchType, this.state.counterfeitSearch)
    }
  }

  handleFileUpload = file => {
    this.props.handleFileUpload(this.state.searchType, file)
  }

  render() {
    return <div className={this.props.page ? "search-module-results" : "search-module-wrapper"}
                style={{background: this.state.showFileUpload && this.props.page ? "var(--light-grey)" : ""}}>
      <form onSubmit={this.handleQuerySubmit}>
        <div className={this.props.page ? "search-module-results" : "search-module"}
             style={{background: this.state.showFileUpload && this.props.page ? "var(--light-grey)" : ""}}>
          <div
            className={this.props.page ? "search-components search-components-results" : "search-components search-components-main"}>
            {this.state.searchType === "text" &&
            <>
              <div className="search-box-main">
                <div
                  className={this.props.page ? "search-box search-box-results" : "search-box search-box-main"}>
                  <img className={this.props.page ? "search-icon-results" : "search-icon"}
                       src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
                  <input
                    className={this.props.page ? "desktop search-all-nfts-results" : "desktop search-all-nfts"}
                    placeholder="Search by keywords"
                    value={this.state.value} onChange={this.handleQueryChange}
                  />
                  <input
                    className="mobile search-all-nfts"
                    placeholder="Search by keywords or image URL"
                    value={this.state.value} onChange={this.handleQueryChange}
                  />
                </div>
              </div>
            </>
            }
            {this.state.searchType === "reverse" &&
            <>
              <div className="search-box-main">
                <div className={this.props.page ? "search-box search-box-results" : "search-box search-box-main"}>
                  <img className={this.props.page ? "search-icon-results" : "search-icon"}
                       src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
                  <input
                    className={this.props.page ? "desktop search-all-nfts-results" : "desktop search-all-nfts"}
                    placeholder="Search by keywords"
                    value={this.state.value} onChange={this.handleQueryChange}
                  />
                  <input
                    className="mobile search-all-nfts"
                    placeholder="Search by keywords or image URL"
                    value={this.state.value} onChange={this.handleQueryChange}
                  />
                  <img onClick={this.toggleFileUploader} className="camera-image" src={this.props.cameraImage}/>
                </div>
              </div>
            </>
            }
            {this.state.searchType === "counterfeit" &&
            <>
              <div className="search-box-main">
                <div className={this.props.page ? "search-box-results" : "search-box"}>
                  <img className={this.props.page ? "search-icon-results" : "search-icon"}
                       src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
                  <input
                    className={this.props.page ? "desktop search-all-nfts-results" : "desktop search-all-nfts"}
                    placeholder="Contract address"
                    value={this.state.counterfeitSearch.contractAddress} onChange={this.handleContractChange}
                  />
                  <img onClick={this.toggleFileUploader} className="camera-image" src={this.props.cameraImage}/>
                </div>
              </div>
            </>
            }
            <div className={this.props.page ? "search-select-wrapper-results" : "search-select-wrapper"}>
              <select name="Search Type" className="search-type-select" onChange={this.handleSearchTypeChange}>
                <option value="text">Text search</option>
                <option value="reverse">Reverse Image Search</option>
                <option value="counterfeit">Counterfeit Detection</option>
              </select>
            </div>
            <input type="submit" value="Search" className={this.props.page ?
              "button-results search apercupro-medium-white-20px" : "button search apercupro-medium-white-20px"}/>
          </div>
        </div>
        {this.state.searchType === "counterfeit" &&
        <div
          className={this.props.page ? "search-box-results search-box-counterfeit-results" : "search-box search-box-counterfeit"}>
          <input
            className={this.props.page ? "desktop search-all-nfts-results" : "desktop search-all-nfts"}
            placeholder="Token id"
            value={this.state.counterfeitSearch.tokenId} onChange={this.handleTokenChange}
          />
        </div>
        }
      </form>
      {this.state.showFileUpload &&
      <>
        <p className="extra-filters-text" style={{textAlign: "center"}}>OR</p>
        <FileUploadForm
          handleFileUpload={this.handleFileUpload}
          handleSubmit={this.props.onSubmit}
          handleQueryChange={this.handleUrlQueryChange}
          onSubmit={this.handleQuerySubmit}
          resultsPage={this.props.page}
        />
      </>
      }
      {this.state.searchType === "counterfeit" &&
      <>
        <div className="extra-filters-text" style={{marginTop: "20px"}}>Extra filters</div>
        <div
          className={this.props.page ? "search-box-results search-box-counterfeit-results" : "search-box search-box-counterfeit"}
          style={this.props.page? {marginTop: "20px"} : {margin: "30px"}}>
          <input
            className={this.props.page ? "desktop search-all-nfts-results" : "desktop search-all-nfts"}
            placeholder="Contract address to filter out"
            value={this.state.counterfeitSearch.filterAddress} onChange={this.handleFilterAddressChange}
          />
        </div>
      </>
      }
    </div>;
  }
}

export default SearchModule;
