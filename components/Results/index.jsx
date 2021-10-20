import React from "react";
import Footer from "../Footer";
import "./Results.css";
import "./ResultsMobile.css";
import SearchResults from "./SearchResults";
import searchQueries from "./SearchQuery";
import SkeletonLoader from "./SkeletonLoader";
import FileUploadForm from "../FileUploadForm";
import SearchModule from "../search/SearchModule";


class Results extends React.Component {
  params = null

  cameraImage = "/img/camera.svg"

  state = {
    searchQuery: "",
    searching: false,
    reason: null
  }
  searchResults = null

  pagination = {
    pageNumber: 1,
    pageSize: 50
  }


  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("query");
    const type = queryParams.get("type");

    const address = queryParams.get("address");
    const token = queryParams.get("token");
    const chain = queryParams.get("chain");
    const filterAddress = queryParams.get("filter");

    if (query && type) {
      this.state.searchQuery = decodeURI(query)
      this.state.searchType = decodeURI(type)
      this.setState({searching: true})
      searchQueries.search(this.state.searchQuery, this.state.searchType, this.pagination, this.setSearchResults)
    } else if (type === "counterfeit" && address && token && chain) {
      this.setState({searching: true})
      searchQueries.searchCounterfeit(address, token, chain, filterAddress, this.pagination, this.setSearchResults)
    } else if (this.props.fileSearchInput && this.props.fileSearchInput.file && type) {
      this.setState({searching: true})
      const file = this.props.fileSearchInput.file
      searchQueries.searchFile(file, type, this.pagination, this.setSearchResults)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  setSearchResults = (searchResults, reason) => {
    this.searchResults = searchResults
    this.setState({searching: false})
    this.setState({reason: reason})
    this.setState(this.searchResults)
  }


  handleQuerySubmit = (searchType, value, extraFilters) => {
    if (!this.state.searching) {
      this.setState({searching: true})
      if (searchType === "counterfeit" && typeof value === "object") {
        window.history.pushState({}, null, `/results?type=${searchType}&address=${value.contractAddress}`
          + `&token=${value.tokenId}&chain=${value.chain}&filter=${value.filterAddress}`);
        searchQueries.searchCounterfeit(value.contractAddress, value.tokenId, "ethereum", value.filterAddress, this.pagination, this.setSearchResults)
      } else {
        window.history.pushState({}, null, `/results?type=${searchType}&query=${value}`);
        searchQueries.search(value, searchType, this.pagination, this.setSearchResults, extraFilters)
      }
    }
  }

  handleFileUpload = (searchType, file, extraFilters) => {
    if (!this.state.searching) {
      this.setState({searching: true})
      searchQueries.searchFile(file, searchType, this.pagination, this.setSearchResults, extraFilters)
    }
  }


  render() {
    return (
      <>
        <div className="g-nft-results-smaller apercupro-medium-black-30px"><a href="/">Fingible</a></div>
        <div className="overlap-group-results-header">
          <div className="g-nft-results apercupro-medium-black-30px"><a href="/">Fingible</a></div>
          <SearchModule
            page={"results"}
            cameraImage={this.cameraImage}
            onSubmit={this.handleQuerySubmit}
            handleFileUpload={this.handleFileUpload}
          />
        </div>
        <div className="container-center-horizontal">
          <div style={{width: "10%"}} className="desktop-big"/>
          <div className="results screen">

            {this.state.searching
              ? <SkeletonLoader/>
              : <SearchResults searchResults={this.searchResults} reason={this.state.reason}/>
            }
          </div>
          <div style={{width: "10%"}} className="desktop-big"/>

        </div>
        <Footer/>
      </>

    );
  }
}

export default Results;
