import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Button from "../Components/Button/Button";

const AboutUsPage = () => {
  
  return (
    // <div className={"homePage " + (scroll ? "sticky" : "")}>
    <div className="homePage sticky">
      <Header />


      {/******************************* ABOUT US */}
      <div className="about-us pb-5 mb-5">
        <div className="bgImage">
          <img src={require("../../src/assets/images/design.png")} alt="" />
        </div>
        <div className="waveBg">
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
          <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"></path>
        </svg>


        </div>
        <div className="container-fluid">
          <div className="section-title dark mb-5">About us</div>
          
          <div className="desc">
            <p>Treats Island is a Premium Candy Retailer and Virtual Fundraiser which began with a goal of supporting youth sports programs in raising money for their teams.  After several years of operating in the youth sports space, a husband-and-wife team found themselves inside of a candy store while traveling out of state for their children’s tournament. It was always important for them to find ways to make kids and parents smile by promoting both fun and fitness while simultaneously making these amazing experiences more accessible and affordable for families.</p>

            <p>Fast forward to 2021, a year after the pandemic caused by COVID 19 began and Treats Island Premium Candy took off.  While previously existing only in the retail space, virtual sales were now at an all-time high and Treats Island Virtual Fundraising was developed. Not only were they able to help youth sports programs but all types of businesses who were working to raise funds. More organizations are making the most of their support networks and creating memories that will last a lifetime.</p>
          </div>
        </div>
      </div>
      {/******************************* /ABOUT US */}



      

      <Footer />
    </div>
  );
};
export default AboutUsPage;