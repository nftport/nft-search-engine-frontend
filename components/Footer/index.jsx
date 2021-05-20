import React from "react";
import "./Footer.css";

function Footer(props) {
  const { line4, combinedShape, text1, place, privacyPolicy, className } = props;

  return (
    <div className={`footer ${className || ""}`}>
      <img className="line-4" src={line4} />
      <div className="flex-row-footer">
        <img className="combined-shape" src={combinedShape} />
        <div className="overlap-group-footer">
          <div className="link"/>
          <p className="text-1 valign-text-middle apercupro-regular-normal-black-16px">{text1}</p>
        </div>
        <div className="place valign-text-middle apercupro-medium-black-16px">{place}</div>
        <div className="privacy-policy valign-text-middle apercupro-medium-black-16px">{privacyPolicy}</div>
      </div>
    </div>
  );
}

export default Footer;
