import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Button from "../Components/Button/Button";
import ImagePicker from "../core/image-picker/image-picker";
import QuickStartWizard from "../features/quick-start-wizard/quick-start-wizard";
import { EventEmitter } from "../utils/event-emitter";
import AuthHelper from "../utils/auth-helper";
import { useLocation } from "react-router-dom";
import GeneralUtils from "../utils/general-utils";
import { useSelector } from "react-redux";
import JoinEventHelper from "../features/join-event/join-event-helper";
import ApiCalls from "../api";
import ProductImage from "../const/products-images";
import JoinEventPopup from "../features/join-event/components/join-event-popup/join-event-popup";
import EventNames from "../const/event-names";

const HomePage = () => {
  const [scroll, setScroll] = useState(false);
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.user);

  const isLoggedIn = !!user;

  const location = useLocation();
  const history = useHistory(false);

const _loadProducts = async () => {
  try {
    const { data: {data: {allProducts
    }} } = await ApiCalls.product.public.getAllProducts();
    if (allProducts) {
      setProducts(allProducts);
    }
  } catch (error) {
    console.log('error :>> ', error);
  }
}

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
    _loadProducts();
  }, []);

  

  useEffect(() => {
    if (location.pathname.indexOf('/join-event') > -1) {
      // Show event join logic
      const { je: eventCode } = GeneralUtils.getQueryParams();
      console.log('eventCode :>> ', eventCode);
      if (eventCode?.length) {
        EventEmitter.dispatch(EventNames.eventJoinPopup.show, eventCode)
      }
    }
  }, [location])



  var bannerSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: false,
    pauseOnFocus: false,
  };
  var whoAreWeSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };
  var productSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const _checkIfPaymentStatusAvialable = () => {
    if (window?.location?.pathname.indexOf("/completion") > -1) {
        Swal.fire({
            icon: "success",
            title: "",
            text: "Order placed successfully!",
            // footer: '<a href="">Why do I have this issue?</a>'
          });
    }
  }

  const _showWizard = () => {
    // alert('SHOW_QUICK_WIZARD')
    EventEmitter.dispatch("SHOW_QUICK_WIZARD");
  }

  useEffect(() => {
    _checkIfPaymentStatusAvialable();
  }, [])

  const _navigate = (e) => {
    e.preventDefault();
    if (AuthHelper.checkIfLoggedIn()) {
      history.push("/all-events");
    } else {
      history.push("/login");
    }
  };


  
  const ProductDesc = (props) => {
    const [productDescExtend, setProductDescExtend] = useState(false);
    return (
      <div className={"details " + (productDescExtend ? "extended" : "")} onClick={(e) => setProductDescExtend(!productDescExtend)}>
        <div className="title">{props.productName}</div>
        <div className="desc">
          {props.productDesc}
        </div>
      </div>
    );
  }

  return (
    <div className={"homePage " + (scroll ? "sticky" : "")}>
      <Header />

      {/******************************* BANNER SECTION */}
      <div className="banner-section">
        <div className="top">
          <img
            src={require("../assets/images/home-banner.jpg")}
            className="banner-bg"
            alt=""
          />

          <div className="banner-content">
            <div className="bigTitle font-heading">
              VIRTUAL FUNDRAISING <br className="d-block d-md-none" /> MADE EASY
            </div>
            <div className="buttons">
              <span className="btnBanner font-body" onClick={_showWizard}> Start Fundraiser Today </span>
            </div>
          </div>
        </div>






        <div className="bottom">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="h3 hightlight">
                  Raise Funds For Your Organization
                </div>
              </div>
              <div className="col-lg-4">
                <div className="stats">
                  <div className="stat font-heading">
                    <span className="h2 mb-0 number">50% <br /> profit</span>
                    {/* <span className="text">profit</span> */}
                  </div>
                  <div className="stat font-heading">
                    <span className="h2 mb-0 number">Just <br /> 5 days</span>
                    {/* <span className="text">Days</span> */}
                  </div>
                  <div className="stat font-heading">
                    <span className="h2 mb-0 number">No <br /> Fees</span>
                    {/* <span className="text">Donation</span> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-2 text-center">
                <span className="btnDonate">You win!!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/******************************* /BANNER SECTION */}




      {/******************************* WHO ARE WE */}
      <div className="who-are-we p-0">
        <div className="row m-0">
          <div className="col-md-6 left">
            <div className="h3 text-center font-heading"><a role="button" onClick={_showWizard}>Fundraise Here</a></div>
            <ul>
              <li>Candy for the kid in you</li>
              <li>50% Profit is yours to keep</li>
              <li>100% Virtual</li>
            </ul>
          </div>
          <div className="col-md-6 right">
            <div className="h3 text-center font-heading"><a role="button" onClick={(e) => history.push("/shop-premium-candy")}>Shop here</a></div>
            <ul>
              <li>Pop-Up Store</li>
              <li>Premium Candy</li>
              <li>Shop Direct Anytime</li>
            </ul>
          </div>
        </div>
      </div>
      {/******************************* /WHO ARE WE */}




      {/******************************* BRAND STATS */}
      <div className="brand-stats">
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-candy-cane"></i>
          </div>

          <div className="right">
            <div className="h2 title">Treats to awaken your inner child</div>
          </div>
        </div>

        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-money-bill-trend-up"></i>
          </div>

          <div className="right">
            <div className="h2 title"> Ships Direct to You/Your Supporters. </div>
          </div>
        </div>

        <div className="item">
          <div className="icon">
            <i className="fa-regular fa-handshake"></i>
          </div>

          <div className="right">
            <div className="h2 title"> Eat Candy. Stay Calm. </div>
          </div>
        </div>
      </div>
      {/******************************* /BRAND STATS */}




      {/******************************* HOW WE WORK */}
      <div className="how-we-work">
        <div className="container-fluid">
          <div className="section-title dark mb-5">How it works</div>

          <div className="inner-wrapper">
            <div className="left">
              <img
                src={require("../assets/images/home-2.jpg")}
                alt=""
              />
            </div>

            <div className="right">
              <div className="steps-wrapper">
                <div className="item noHover">
                  <span className="item-title">Easy as 1-2-3</span>
                </div>
                <div className="item">
                  <span className="item-title" >Event organizers</span>

                  <div className="sub-item">
                    <div className="sub-item-title" onClick={_showWizard}>1. Set up your fundraiser</div>
                    <div className="sub-item-title">2. Establish your 5 day window</div>
                    <div className="sub-item-title">3. Share group code with organization</div>
                  </div>
                </div>
                <div className="item">
                  <span className="item-title" >Members</span>

                  <div className="sub-item">
                    <div className="sub-item-title">1. Set up your individual pop-up store</div>
                    <div className="sub-item-title">2. Share with your supporters</div>
                    <div className="sub-item-title">3. Raise funds</div>
                  </div>
                </div>
                <div className="item">
                  <span className="item-title" onClick={_showWizard}>Set up now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/******************************* /HOW WE WORK */}





      {/******************************* VIRTUAL FUNDRAISING */}
      <div className="virtual-fundraising" id="virtual-fundraising">
        <div className="container-fluid">
          <div className="section-title dark mb-5">Virtual Fundraising</div>

          <div className="itemBlocks">
            <div className="itemBlock">
              <div className="icon"><img src={require("../../src/assets/images/1.png")} alt="" /></div>
              <span>100% Online ONLY…No paperwork! No cash to collect! And Nothing to distribute! You raise the funds and we take care of the rest.</span>
            </div>
            <div className="itemBlock">
              <div className="icon"><img src={require("../../src/assets/images/2.png")} alt="" /></div>
              <span>Make memories and support your community</span>
            </div>
            <div className="itemBlock">
              <div className="icon"><img src={require("../../src/assets/images/3.png")} alt="" /></div>
              <span>Whether you’re supporting a fundraiser, sending a gift or just looking to reignite a childhood memory, we have something for the kid in you.</span>
            </div>
            <div className="itemBlock">
              <div className="icon"><img src={require("../../src/assets/images/4.png")} alt="" /></div>
              <span>Our premium, tasty treats from Treats Island will have your supporters insisting on coming back to raise money over and over again. Select treats are seasonal and will not always be available.</span>
            </div>
          </div>
        </div>
      </div>
      {/******************************* /VIRTUAL FUNDRAISING */}





      {/******************************* PRODUCT SLIDER */}
      <div className="product-slider">
        <div className="container-fluid">
          <div className="row m-0">
            <div className="col-lg-4">
              <div className="section-title text-left">
                Candy makes the world a better place.
              </div>
              <div className="desc">
                Our premium, tasty treats from Treats Island will have your
                supporters insisting on coming back to raise money over and over
                again. Select treats are seasonal and will not always be
                available.
              </div>

              <div className="buttons mt-4">
                <div
                  className="button small dark"
                  onClick={(e) => history.push("/shop-premium-candy")}
                >Explore our shop</div>
              </div>
            </div>
            {
              products?.length? (
            <div className="col-lg-8">
              <Slider {...productSettings}>
                  {
                    products?.map(product => (
                      <div>
                        <div className="productItem">
                          <div className="image-wrapper">
                            <ProductImage 
                              productName={product.Product}
                            />
                          </div>
                          <ProductDesc productName={product.Product} productDesc={product.Description} />
                        </div>
                      </div>
                    ))
                  }
              </Slider>
            </div>
              ): <></>
            }

            
          </div>
        </div>
      </div>
      {/******************************* /PRODUCT SLIDER */}



      {/******************************* ABOUT US */}
      <div className="about-us" id="aboutUs">
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




      {/******************************* RECENT CAMPAIGNS - six images section */}
      <div className="recent-campaigns">
        <div className="inner-wrapper">
          {/* <div className="item intro">
            Recent <br /> Projects
            <i className="fa-solid fa-circle-chevron-right"></i>
          </div> */}

          <div className="item">
            <div className="image-wrapper">
              <img src={require("../assets/images/home-page-image-1.png")} alt="" />
            </div>
            <div className="details">
              <i className="fa-solid fa-circle-chevron-right"></i>
              <span>Track & Field</span>
            </div>
          </div>

          <div className="item">
            <div className="image-wrapper">
              <img src={require("../assets/images/TI_Cheer.jpeg")} alt="" />
            </div>
            <div className="details">
              <i className="fa-solid fa-circle-chevron-right"></i>
              <span>Cheer</span>
            </div>
          </div>

          <div className="item">
            <div className="image-wrapper">
              <img
                src={require("../assets/images/TI_Volleyball.jpeg")}
                alt=""
              />
            </div>
            <div className="details">
              <i className="fa-solid fa-circle-chevron-right"></i>
              <span>Volleyball</span>
            </div>
          </div>

          <div className="item">
            <div className="image-wrapper">
              <img src={require("../assets/images/TI_football.jpeg")} alt="" />
            </div>
            <div className="details">
              <i className="fa-solid fa-circle-chevron-right"></i>
              <span>Football</span>
            </div>
          </div>

          <div className="item">
            <div className="image-wrapper">
              <img src={require("../assets/images/TI_Girls.jpeg")} alt="" />
            </div>
            <div className="details">
              <i className="fa-solid fa-circle-chevron-right"></i>
              <span>Girls</span>
            </div>
          </div>


          <div className="item">
            <div className="image-wrapper">
              <img src={require("../assets/images/home-page-image-2.png")} alt="" />
            </div>
            <div className="details">
              <i className="fa-solid fa-circle-chevron-right"></i>
              <span>Basketball</span>
            </div>
          </div>
        </div>
      </div>
      <JoinEventPopup />
      {/******************************* /RECENT CAMPAIGNS - six images section */}

      {/******************************* MAP */}
      {/* <div className="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.34734137497!2d88.27731227470198!3d22.535412195662786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1675263869491!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div> */}
      {/******************************* /MAP */}

      

      <Footer />
    </div>
  );
};
export default HomePage;
