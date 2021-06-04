import React from "react";
import Footer from "../Footer";
import "./Results.css";
import "./ResultsMobile.css";
import SearchResults from "./SearchResults";
import searchQueries from "./SearchQuery";
import SkeletonLoader from "./SkeletonLoader";
import FileUploadForm from "../FileUploadForm";


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
    let urlSplit = window.location.href.split("results/");
    if (urlSplit && urlSplit.length && urlSplit.length > 1) {
      const searchQuery = urlSplit[urlSplit.length - 1]
      if (searchQuery) {
        this.state.searchQuery = decodeURI(searchQuery)
        this.setState({searching: true})
        searchQueries.search(this.state.searchQuery, this.pagination, this.setSearchResults)
      }
    }
    if (this.props.fileSearchInput && this.props.fileSearchInput.file) {
      this.setState({searching: true})
      const file = this.props.fileSearchInput.file
      searchQueries.searchFile(file, this.pagination, this.setSearchResults)
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


  handleFormInputChange = (event) => {
    this.state.searchQuery = event.target.value
    this.setState(this.state)
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.searching) {
      this.setState({searching: true})
      searchQueries.search(this.state.searchQuery, this.pagination, this.setSearchResults)
    }
  }

  toggleFileUploader = () => {
    this.setState({showFileUpload: !this.state.showFileUpload})
  }

  handleFileSearchSubmit = query => {
    if (!this.state.searching) {
      this.setState({searching: true})
      searchQueries.search(query, this.pagination, this.setSearchResults)
    }
  }

  handleFileUpload = file => {
    if (!this.state.searching) {
      this.setState({searching: true})
      searchQueries.searchFile(file, this.pagination, this.setSearchResults)
    }
  }


  render() {
    return (
      <>
        <div className="overlap-group-results-header">
          <div className="g-nft-results apercupro-medium-black-30px"><a href="/">NFTPort</a></div>
          <div className="search-module-results"
               style={{background: this.state.showFileUpload ? "var(--light-grey)" : ""}}>
            <form onSubmit={this.handleSubmit}>

              <div className="search-components-results">
                <div className="search-box-results">
                  <img className="search-icon-results"
                       src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
                  <input
                    className="search-all-nfts-results"
                    placeholder="Search by keywords or image URL"
                    value={this.state.searchQuery} onChange={this.handleFormInputChange}
                  />
                  <img onClick={this.toggleFileUploader} className="camera-image" src={this.cameraImage}/>
                </div>
                <input type="submit" value="Search"
                       className="button-results search-results apercupro-medium-white-20px"/>
              </div>
            </form>
            <div>
              {this.state.showFileUpload &&
              <FileUploadForm resultsPage
                              handleFileUpload={this.handleFileUpload}
                              handleSubmit={this.handleFileSearchSubmit}/>
              }
            </div>
          </div>


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
