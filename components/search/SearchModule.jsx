import {ethers} from "ethers"
import React from "react";
import "./search.css";
import "./searchMobile.css";
import FileUploadForm from "../FileUploadForm";
import SelectField from "./SelectField"

class SearchModule extends React.Component {

  state = {
    mounted: false,
    showFileUpload: false,
    showExtraFilters: false,
    error: "",
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

  componentDidMount() {
    if (this.props.selectType) {
      this.state.searchType = this.props.selectType
      this.handleSearchTypeChange(this.props.selectType)
      if (this.props.searchParams && this.props.searchParams.value) {
        const query = this.props.searchParams.value;
        if (typeof query === "object" && query.contractAddress && query.tokenId) {
          this.setState({
            counterfeitSearch: {
              contractAddress: query.contractAddress,
              tokenId: query.tokenId,
              chain: "ethereum",
              filterAddress: query.filterAddress,
            }
          })
        } else if (query && typeof query === "string") {
          if (query.startsWith("http://") || query.startsWith("https://")) {
            this.setState({
              urlValue: query,
              showFileUpload: true,
            })
          } else {
            this.setState({value: this.props.searchParams.value})
          }
        }
      }
    }

    this
      .setState({mounted: true})
  }

  toggleFileUploader = () => {
    this.setState({showFileUpload: !this.state.showFileUpload})
  }

  toggleExpandFilters = () => {
    this.setState({showExtraFilters: !this.state.showExtraFilters})
  }

  handleSearchTypeChange = value => {
    this.setState({
      searchType: value,
      showFileUpload: false,
      value: "",
      error: "",
      urlValue: ""
    })
  }

  handleQueryChange = event => {
    this.state.value = event.target.value
    this.setState({value: event.target.value})
  }

  handleContractChange = event => {
    this.state.counterfeitSearch.contractAddress = event.target.value
    this.setState({counterfeitSearch: this.state.counterfeitSearch, error: ""})
  }

  handleTokenChange = event => {
    this.state.counterfeitSearch.tokenId = event.target.value
    this.setState({counterfeitSearch: this.state.counterfeitSearch})
  }

  handleFilterAddressChange = event => {
    this.state.counterfeitSearch.filterAddress = event.target.value
    this.setState({counterfeitSearch: this.state.counterfeitSearch})
  }

  handleChainChange = event => {
    this.state.counterfeitSearch.chain = event.target.value
    this.setState({counterfeitSearch: this.state.counterfeitSearch})
  }

  handleUrlQueryChange = event => {
    this.state.urlValue = event.target.value
    this.setState({urlValue: event.target.value, error: ""})
  }

  handleQuerySubmit = event => {
    event.preventDefault();
    if (this.state.value) {
      this.props.onSubmit(this.state.searchType, this.state.value)
    } else if (this.state.urlValue) {
      this.props.onSubmit(this.state.searchType, this.state.urlValue, {filterAddress: this.state.counterfeitSearch.filterAddress})
    } else if (this.state.searchType === "counterfeit"
      && this.state.counterfeitSearch.contractAddress
      && this.state.counterfeitSearch.tokenId) {
      try {
        ethers.utils.getAddress(this.state.counterfeitSearch.contractAddress)
      } catch (e) {
        this.setState({error: "Invalid contract address"})
        return
      }
      this.props.onSubmit(this.state.searchType, this.state.counterfeitSearch)
    }
  }

  handleFileUpload = file => {
    this.props.handleFileUpload(this.state.searchType, file, {filterAddress: this.state.counterfeitSearch.filterAddress})
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
                  className={this.props.page ? "search-box search-box-results" : "search-box"}>
                  <img className={this.props.page ? "search-icon-results" : "search-icon"}
                       src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
                  <input
                    className={this.props.page ? "desktop search-all-nfts-results" : "desktop search-all-nfts"}
                    placeholder="Search by keywords from NFT name and description"
                    value={this.state.value} onChange={this.handleQueryChange}
                  />
                  <input
                    className={this.props.page ? "mobile search-all-nfts-results" : "mobile search-all-nfts"}
                    placeholder="Search by keywords"
                    value={this.state.value} onChange={this.handleQueryChange}
                  />
                </div>
              </div>
            </>
            }
            {this.state.searchType === "reverse" &&
            <>
              <div className="search-box-main">
                <div className={this.props.page ? "search-box search-box-results" : "search-box"}>
                  <img className={this.props.page ? "search-icon-results" : "search-icon"}
                       src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
                  <input
                    className={this.props.page ? "desktop search-all-nfts-results" : "desktop search-all-nfts"}
                    placeholder="Visual search from images by keywords"
                    value={this.state.value} onChange={this.handleQueryChange}
                  />
                  <input
                    className={this.props.page ? "mobile search-all-nfts-results" : "mobile search-all-nfts"}
                    placeholder="Visual search by keywords or image URL"
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
                    className={this.props.page ? "mobile search-all-nfts-results" : "mobile search-all-nfts"}
                    placeholder="Contract address"
                    value={this.state.counterfeitSearch.contractAddress} onChange={this.handleContractChange}
                  />
                  <input
                    className={this.props.page ? "desktop search-all-nfts-results" : "desktop search-all-nfts"}
                    placeholder="Contract address"
                    value={this.state.counterfeitSearch.contractAddress} onChange={this.handleContractChange}
                  />
                  <img onClick={this.toggleFileUploader} className="camera-image" src={this.props.cameraImage}/>
                </div>
                {this.state.error &&
                <div className="error-text">{this.state.error}</div>
                }
                <div className={this.props.page ? "mobile search-box-results" : "mobile search-box"}
                     style={{marginTop: "20px"}}>
                  <input
                    className={this.props.page ? "mobile search-all-nfts-results search-all-nfts-counterfeit" : "mobile search-all-nfts search-all-nfts-counterfeit"}
                    placeholder="Token ID"
                    value={this.state.counterfeitSearch.tokenId} onChange={this.handleTokenChange}
                  />
                </div>

                <div
                  className={this.props.page ? "mobile extra-filters-text-results" : "mobile extra-filters-text"}
                  style={{marginTop: "20px"}}>Extra filters
                </div>
                <div className={this.props.page ? "mobile search-box-results" : "mobile search-box"}>
                  <input
                    className={this.props.page ? "mobile search-all-nfts-results" : "mobile search-all-nfts"}
                    placeholder="Contract address to filter out"
                    value={this.state.counterfeitSearch.filterAddress} onChange={this.handleFilterAddressChange}
                  />
                </div>


              </div>
            </>
            }
            <SelectField
              page={this.props.page}
              onChange={this.handleSearchTypeChange}
              selectType={this.props.selectType}
            />
            <input type="submit" value="Search" className={this.props.page ?
              "button-results search apercupro-medium-white-20px" : "button search apercupro-medium-white-20px"}/>
          </div>
        </div>
        {this.state.searchType === "counterfeit" &&
        <div
          className={this.props.page ? "desktop search-box-results search-box-counterfeit-results" : "desktop search-box search-box-counterfeit"}>
          <input
            className={this.props.page ? "desktop search-all-nfts-results search-all-nfts-counterfeit" : "desktop search-all-nfts search-all-nfts-counterfeit"}
            placeholder="Token ID"
            value={this.state.counterfeitSearch.tokenId} onChange={this.handleTokenChange}
          />
        </div>
        }
      </form>
      {this.state.showFileUpload &&
      <>
        <p className="form-separator-text">
          <span>OR</span>
        </p>
        {this.state.mounted &&
        <FileUploadForm
          handleFileUpload={this.handleFileUpload}
          handleSubmit={this.handleQuerySubmit}
          handleQueryChange={this.handleUrlQueryChange}
          resultsPage={this.props.page}
          urlValue={this.state.urlValue}
        />
        }
      </>
      }
      {this.state.searchType === "counterfeit" &&
      <>
        <div
          className={this.props.page ? "desktop extra-filters-text-results" : "desktop extra-filters-text"}
          style={{marginTop: "20px"}}
          onClick={this.toggleExpandFilters}
        >
          Extra filters
          {this.state.showExtraFilters ?
            <img className="arrow-icon"
                 src="https://storage.googleapis.com/nft-search/img/up-arrow.svg"/>
            : <img className="arrow-icon"
                   src="https://storage.googleapis.com/nft-search/img/down-arrow.svg"/>
          }
        </div>
        {this.state.showExtraFilters &&
        <div
          className={this.props.page ? "desktop search-box-results search-box-counterfeit-results" : "desktop search-box search-box-counterfeit"}
          style={this.props.page ? {marginTop: "20px"} : {}}>
          <input
            className={this.props.page ? "desktop search-all-nfts-results search-all-nfts-counterfeit" : "desktop search-all-nfts search-all-nfts-counterfeit"}
            placeholder="Contract address to filter out"
            value={this.state.counterfeitSearch.filterAddress} onChange={this.handleFilterAddressChange}
          />
        </div>
        }
      </>
      }
    </div>;
  }
}

export default SearchModule;
