import React from "react";
import Footer from "../Footer";
import "./Results.css";
import "./ResultsMobile.css";
import SearchResults from "./SearchResults";
import searchQueries from "./SearchQuery";
import SkeletonLoader from "./SkeletonLoader";
import SearchModule from "../search/SearchModule";


class Results extends React.Component {
  params = null

  cameraImage = "/img/camera.svg"

  state = {
    mounted: false,

    searchQuery: "",
    searching: false,
    searchingPage: false,
    reason: null,
    searchParams: {
      searchType: null,
      value: null,
      extraFilters: null
    },
    hasNextPage: true
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

    if (type) {
      this.state.searchType = decodeURI(type)
    }

    if (query && type) {
      this.state.searchQuery = decodeURI(query)
      this.state.searchType = decodeURI(type)
      this.setState({
        searching: true,
        searchParams: {
          searchType: this.state.searchType,
          value: this.state.searchQuery,
          extraFilters: {}
        }
      })
      searchQueries.search(this.state.searchQuery, this.state.searchType, this.pagination, this.setSearchResults)
    } else if (type === "counterfeit" && address && token && chain) {
      this.setState({
        searching: true,
        searchParams: {
          searchType: this.state.searchType,
          value: {
            contractAddress: address,
            tokenId: token,
            chain: chain,
            filterAddress: filterAddress
          },
          extraFilters: {}
        }
      })
      searchQueries.searchCounterfeit(address, token, chain, filterAddress, this.pagination, this.setSearchResults)
    } else if (this.props.fileSearchInput && this.props.fileSearchInput.file && type) {
      this.setState({searching: true})
      const file = this.props.fileSearchInput.file
      searchQueries.searchFile(file, type, this.pagination, this.setSearchResults)
    }

    this.setState({mounted: true})
    this.addScrollEventListener();
  }

  addScrollEventListener() {
    window.addEventListener('scroll', () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 500
        && !this.state.searchingPage
        && this.state.searchParams
        && this.searchResults && this.searchResults.length
        && this.state.hasNextPage) {
        if (this.state.searchParams.value) {
          this.setState({searchingPage: true})
          this.pagination.pageNumber += 1
          if (this.state.searchParams.value && typeof this.state.searchParams.value === "object") {
            searchQueries.searchCounterfeit(
              this.state.searchParams.value.contractAddress,
              this.state.searchParams.value.tokenId,
              this.state.searchParams.value.chain,
              this.state.searchParams.value.filterAddress,
              this.pagination,
              this.addSearchResults
            )
          } else {
            searchQueries.search(
              this.state.searchParams.value,
              this.state.searchParams.searchType,
              this.pagination,
              this.addSearchResults,
              this.state.searchParams.extraFilters
            )
          }
        } else if (this.state.searchParams.file) {
          this.setState({searchingPage: true})
          this.pagination.pageNumber += 1
          searchQueries.searchFile(
            this.state.searchParams.file,
            this.state.searchParams.searchType,
            this.pagination,
            this.addSearchResults,
            this.state.searchParams.extraFilters
          )
        }
      }
    }, {
      passive: true
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  setSearchResults = (searchResults, reason) => {
    this.searchResults = searchResults
    this.setState({searching: false})
    this.setState({reason: reason})
    this.setState(this.searchResults)
  }

  addSearchResults = (searchResults, reason) => {
    this.setState({searchingPage: false})
    this.setState({reason: reason})
    if (this.searchResults && this.searchResults.length && searchResults && searchResults.length) {
      this.searchResults.push(...searchResults)
      this.setState(this.searchResults)
    } else {
      this.setState({hasNextPage: false})
    }
  }


  handleQuerySubmit = (searchType, value, extraFilters) => {
    if (!this.state.searching) {
      this.setState({searching: true})
      this.setState({hasNextPage: true})
      this.pagination.pageNumber = 1;
      if (searchType === "counterfeit" && typeof value === "object") {
        this.setState({
          searchParams: {
            searchType: searchType,
            value: value,
            extraFilters: extraFilters
          }
        })
        window.history.pushState({}, null, `/results?type=${searchType}&address=${value.contractAddress}`
          + `&token=${value.tokenId}&chain=${value.chain}&filter=${value.filterAddress}`);
        searchQueries.searchCounterfeit(value.contractAddress, value.tokenId, "ethereum", value.filterAddress, this.pagination, this.setSearchResults)
      } else {
        this.setState({
          searchParams: {
            searchType: searchType,
            value: value,
            extraFilters: extraFilters
          }
        })
        window.history.pushState({}, null, `/results?type=${searchType}&query=${value}`);
        searchQueries.search(value, searchType, this.pagination, this.setSearchResults, extraFilters)
      }
    }
  }

  handleFileUpload = (searchType, file, extraFilters) => {
    if (!this.state.searching) {
      this.pagination.pageNumber = 1;
      this.setState({hasNextPage: true})
      this.setState({searching: true})
      this.setState({
        searchParams: {
          searchType: searchType,
          file: file,
          extraFilters: extraFilters
        }
      })
      searchQueries.searchFile(file, searchType, this.pagination, this.setSearchResults, extraFilters)
    }
  }


  render() {
    return (
      <>
        <div className="g-nft-results-smaller apercupro-medium-black-30px"><a href="/">Fingible</a></div>
        <div className="overlap-group-results-header">
          <div className="g-nft-results apercupro-medium-black-30px"><a href="/">Fingible</a></div>
          {this.state.mounted &&
          <SearchModule
            page={"results"}
            cameraImage={this.cameraImage}
            onSubmit={this.handleQuerySubmit}
            handleFileUpload={this.handleFileUpload}
            selectType={this.state.searchType}
            searchParams={this.state.searchParams}
          />
          }

        </div>
        <div className="container-center-horizontal">
          <div style={{width: "10%"}} className="desktop-big"/>
          <div className="results screen">
            <div id="results" className="overlap-group-results">
              {this.state.searching ?
                <SkeletonLoader/> :
                <SearchResults
                  searchResults={this.searchResults}
                  reason={this.state.reason}
                />
              }
              {this.state.searchingPage &&
              <SkeletonLoader/>
              }
            </div>
          </div>
          <div style={{width: "10%"}} className="desktop-big"/>
        </div>

        <Footer/>
      </>

    );
  }

}

export default Results;
