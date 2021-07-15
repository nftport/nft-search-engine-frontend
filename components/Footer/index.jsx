import React from "react";
import "./Footer.css";
import "./FooterMobile.css";

function Footer(props) {

  return (
    <div className="footer">
      <div className="flex-row-footer">
        <div className="flex-col-footer">
          <a href="https://twitter.com/Sentinel_AI" target="_blank">
            <img className="combined-shape"
                 src="https://storage.googleapis.com/nft-search/img/combined-shape%402x.svg"/>
          </a>
        </div>
        <div className="desktop flex-col-footer-center valign-text-middle text-1 apercupro-regular-normal-black-16px">
          Copyright (c) 2021 NFTPort. All
          rights reserved.
        </div>
        <div className="flex-col-footer-end">
          <div className="footer-links">
            <div className="place valign-text-middle apercupro-medium-black-16px">
              <a href="mailto:info@thesentinel.ai">Contact</a>
            </div>
            <div className="privacy-policy valign-text-middle apercupro-medium-black-16px">
              <a href="/privacy-policy">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="mobile flex-col-footer-center valign-text-middle text-1 apercupro-regular-normal-black-16px">
          Copyright (c) 2021 NFTPort. All
          rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
