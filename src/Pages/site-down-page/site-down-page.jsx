import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./site-down-page.scss";

const SiteDownPage = () => {
  return (
    <>
      <div className="site-down-wrapper">
        <div className="innerContent">
          <div className="image-wrapper"><img src={require("../../assets/images/unplugged.png")} alt="" /></div>

          <div className="details">
            <div className="big-title">The site is currently down <br /> for a scheduled maintenance</div>
            <div className="desc">
              <p>
                We're performing some scheduled maintenance to our site...😓
                <br /> You can still contact us at <span className="email">treatsisland@gmail.com</span>.
              </p>
            </div>

            <div className="footer">
              <p>" We'll be back with candies soon! 🍭 "</p>
              <span>- Team, <img src={require("../../assets/images/logo.png")} alt="" /> Trests Island</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteDownPage;
