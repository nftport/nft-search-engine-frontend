import React from "react";
import {useHistory} from "react-router-dom";
import "./MainPage.css";
import Footer from "../Footer";
import { withRouter } from 'react-router-dom';

class MainPage extends React.Component {

  state = {
    showFileUpload: false
  }
  landingImages = this.props.landingImages
  searchIcon = this.props.searchIcon
  cameraImage = this.props.cameraImage
  showFileUpload = "24px"

  componentDidMount() {
    // this.state.history = useHistory()
  }
    // history = useHistory();


  handleChange = event => {
    this.state.value = event.target.value
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/results/" + this.state.value);
  }

  toggleFileUploader = () => {
    console.log("Toggle")
    this.setState({showFileUpload: !this.state.showFileUpload})
  }


  render() {
    return (
      <>
        <div className="container-center-horizontal">
          <div className="main-page screen">
            <div className="flex-row">
              <div className="flex-col-1">
                <div className="g-nft-i62631055">gNFT</div>
                <img className="image-2" src={this.landingImages[0]}/>
                <img className="image-3" src={this.landingImages[1]}/>
              </div>
              <div className="flex-col-6">
                <div className="flex-col-7">
                  <h1 className="text-2">Google for NFTs</h1>
                  <div className="google-for-nf-ts-i62">Visual & Reverse Image Search for 2M NFTs</div>

                  <div className="search-module-wrapper">
                  <form onSubmit={this.handleSubmit}>
                    <div className="search-module">
                      <div className="search-components">

                        <div className="search-box">
                          <img className="search-icon" src={this.searchIcon}/>
                          <input
                            className="search-all-nfts"
                            placeholder="Search by keywords or image URL"
                            value={this.state.value} onChange={this.handleChange}
                          />
                          <img onClick={this.toggleFileUploader} className="image-16" src={this.cameraImage}/>
                        </div>
                        <input type="submit" value="Search" className="button search apercupro-medium-white-20px"/>
                      </div>

                    </div>
                  </form>
                    {this.state.showFileUpload &&
                    <div className="file-upload">
                      <button>Select a file</button> or drag it here
                    </div>
                    }
                  </div>
                </div>
                <div className="flex-row-2">
                  <div className="flex-col-4">
                    <img className="image-4" src={this.landingImages[2]}/>
                    <img className="image-5" src={this.landingImages[3]}/>
                  </div>
                  <div className="flex-col-5">
                    <img className="image-" src={this.landingImages[4]}/>
                    <img className="image-11" src={this.landingImages[5]}/>
                  </div>
                  <img className="image-6" src={this.landingImages[6]}/>
                  <div className="flex-col-3">
                    <img className="image-" src={this.landingImages[7]}/>
                    <img className="image-12" src={this.landingImages[8]}/>
                  </div>
                  <div className="flex-col-2">
                    <img className="image-" src={this.landingImages[9]}/>
                    <img className="image-13" src={this.landingImages[10]}/>
                  </div>
                </div>
              </div>
              <div className="flex-col">
                <div className="overlap-group button">
                  <div className="get-api-access"><a href="mailto:info@thesentinel.ai" style={{color: "white"}}>GET API
                    ACCESS</a>
                  </div>
                </div>
                <img className="image-10" src={this.landingImages[11]}/>
                <img className="screenshot-2021-05-17-at-1103-1" src={this.landingImages[12]}/>
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
