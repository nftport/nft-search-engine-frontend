import React from "react";
import "./MainPage.css";
import "./MainPageMobile.css";
import Footer from "../Footer";
import {withRouter} from 'react-router-dom';
import SearchModule from "../search/SearchModule"

class MainPage extends React.Component {

  landingImages = this.props.landingImages
  searchIcon = this.props.searchIcon
  cameraImage = this.props.cameraImage
  showFileUpload = "24px"

  componentDidMount() {
  }


  handleQuerySubmit = (searchType, value) => {
    if (searchType === "counterfeit" && typeof value === "object") {
      this.props.history.push(`/results?type=${searchType}&address=${value.contractAddress}`
      + `&token=${value.tokenId}&chain=${value.chain}&filter=${value.filterAddress}`);
    } else {
      this.props.history.push(`/results?type=${searchType}&query=${value}`);
    }
  }

  handleFileUpload = (searchType, file) => {
    this.props.fileSearch(file)
    this.props.history.push(`/results?type=${searchType}`)
  }


  render() {
    return (
      <>
        <div className="container-center-horizontal">
          <div className="main-page screen">
            <div className="flex-row">
              <div className="flex-col-1-header">
                <div className="g-nft">Fingible</div>
              </div>
              <div className="flex-col-6-header">
                <div className="text-2">Google for NFTs</div>
                <div className="main-subtitle">Reverse Image Search & Counterfeit Detection for Ethereum & Polygon
                  NFTs
                </div>
                <SearchModule
                  cameraImage={this.cameraImage}
                  onSubmit={this.handleQuerySubmit}
                  handleFileUpload={this.handleFileUpload}
                />
              </div>
              <div className="flex-col-header">
                <a href="https://www.nftport.xyz/" target="_blank" className="desktop">
                  <div className="overlap-group button get-api-access">
                    Built with NFTPort
                  </div>
                </a>
              </div>
            </div>

            <div className="flex-row">

              <div className="flex-row-2">
                <div className="flex-col-1">
                  <img className="image-" src={this.landingImages[0]}/>
                  <img className="image- image-bottom" src={this.landingImages[1]}/>
                </div>
                <div className="flex-col-4">
                  <img className="image-" src={this.landingImages[2]}/>
                  <img className="image- image-bottom" src={this.landingImages[3]}/>
                </div>
                <div className="flex-col-5">
                  <img className="image-" src={this.landingImages[4]}/>
                  <img className="image- image-bottom" src={this.landingImages[5]}/>
                </div>
                <div className="flex-col-5">
                  <img className="image- image-main-center" src={this.landingImages[6]}/>
                </div>
                <div className="flex-col-5">
                  <img className="image-" src={this.landingImages[7]}/>
                  <img className="image- image-bottom" src={this.landingImages[8]}/>
                </div>
                <div className="flex-col-4">
                  <img className="image-" src={this.landingImages[9]}/>
                  <img className="image- image-bottom" src={this.landingImages[10]}/>
                </div>
                <div className="flex-col">
                  <img className="image-" src={this.landingImages[11]}/>
                  <img className="image- image-bottom" src={this.landingImages[12]}/>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  }
}

export default withRouter(MainPage);
