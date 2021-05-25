import React from "react";
import Footer from "../Footer";
import "./Results.css";
import SearchResults from "./SearchResults";
import search from "./SearchQuery";
import SkeletonLoader from "./SkeletonLoader";


class Results extends React.Component {
  params = null

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
    if (urlSplit && urlSplit.length) {
      this.state.searchQuery = urlSplit[urlSplit.length - 1]
      // this.searching = true
      this.setState({searching: true})
      search(this.state.searchQuery, this.pagination, this.setSearchResults)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  setSearchResults = (searchResults, reason) => {
    // TODO: uncomment
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
    this.setState({searching: true})
    search(this.state.searchQuery, this.pagination, this.setSearchResults)
  }


  render() {
    return (
      <>
        <div className="overlap-group2">
          <div className="g-nft apercupro-medium-black-30px"><a href="/">gNFT</a></div>
          <form onSubmit={this.handleSubmit}>
            <div className="search-module-results">
              <div className="search-components-results">
                <div className="search-box-results">
                  <img className="search-icon-results"
                       src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
                  <input
                    className="search-all-nfts-results"
                    placeholder="Search by keywords or image URL"
                    value={this.state.searchQuery} onChange={this.handleFormInputChange}
                  />
                </div>
                <input type="submit" value="Search"
                       className="button-results search-results apercupro-medium-white-20px"/>
              </div>
            </div>
          </form>
        </div>
        <div className="container-center-horizontal">
          <div className="results screen">

            {this.state.searching
              ? <SkeletonLoader/>
              : <SearchResults searchResults={this.searchResults} reason={this.state.reason}/>
            }
          </div>
        </div>
        <Footer/>
      </>

    );
  }
}

export default Results;
