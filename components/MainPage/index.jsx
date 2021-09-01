import React from "react";
import "./MainPage.css";
import "./MainPageMobile.css";
import Footer from "../Footer";
import {withRouter} from 'react-router-dom';
import FileUploadForm from "../FileUploadForm/index";


class MainPage extends React.Component {

  state = {
    showFileUpload: false,
    files: []
  }
  landingImages = this.props.landingImages
  searchIcon = this.props.searchIcon
  cameraImage = this.props.cameraImage
  showFileUpload = "24px"

  componentDidMount() {
  }


  toggleFileUploader = () => {
    this.setState({showFileUpload: !this.state.showFileUpload})
  }

  handleQuerySubmit = event => {
    event.preventDefault();
    if (this.state.value) {
      this.props.history.push("/results/" + this.state.value);
    }
  }

  handleQueryChange = event => {
    this.state.value = event.target.value
  }

  handleSubmit = query => {
    this.props.history.push("/results/" + query);
  }

  handleFileUpload = file => {
    this.props.fileSearch(file)
    this.props.history.push("/results")
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
                <div className="main-subtitle">Visual & Reverse Image Search for Ethereum & Polygon NFTs</div>
                <div className="search-module-wrapper">
                  <form onSubmit={this.handleQuerySubmit}>
                    <div className="search-module">
                      <div className="search-components search-components-main">
                        <div className="search-box search-box-main">
                          <img className="search-icon"
                               src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
                          <input
                            className="desktop search-all-nfts"
                            placeholder="Search by keywords"
                            value={this.state.value} onChange={this.handleQueryChange}
                          />
                          <input
                            className="mobile search-all-nfts"
                            placeholder="Search by keywords or image URL"
                            value={this.state.value} onChange={this.handleQueryChange}
                          />
                          <img onClick={this.toggleFileUploader} className="camera-image" src={this.cameraImage}/>
                        </div>
                        <input type="submit" value="Search" className="button search apercupro-medium-white-20px"/>
                      </div>

                    </div>
                  </form>
                  {this.state.showFileUpload &&
                  <FileUploadForm handleFileUpload={this.handleFileUpload}
                                  handleSubmit={this.handleSubmit}/>
                  }
                </div>
              </div>
              <div className="flex-col-header">
                <a href="https://www.nftport.xyz/" target="_blank" className="desktop">
                  <div className="overlap-group button get-api-access">
                      Built with NFTPort
                  </div>
                </a>
                <a href="https://www.nftport.xyz/" target="_blank" className="mobile">
                  <div className="overlap-group api-button get-api-access">
                      NFTPort
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
