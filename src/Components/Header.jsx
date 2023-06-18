import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { EventEmitter } from "../utils/event-emitter";

const Header = () => {
  const [openSidemenu, setOpenSidemenu] = useState(false);
  const history = useHistory(false);
  const { user } = useSelector((state) => state.user);

  const isLoggedIn = !!user;

  const _navigate = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      history.push("/all-events");
    } else {
      EventEmitter.dispatch("SHOW_QUICK_WIZARD_LOGIN");
    }
  };

  const _navigateToVirtual = () => {
    history.push("/home")
    setTimeout(() => {
      const element = document.getElementById("virtual-fundraising");
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      }
    }, 400);
  };

  const _navigateToAboutUs = () => {
    history.push("/home")
    setTimeout(() => {
      const element = document.getElementById("aboutUs");
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 400);
  };

  return (
    <>
      <div className="site-header">
        {/* <div className="container-fluid"> */}
        <div className="inner-wrapper">
          <div className="left">
            <div className="logo" onClick={(e) => history.push("/")}>
              <img src={require("../assets/images/logo.png")} alt="" />
            </div>
          </div>

          <div className="right">
            <div
              className="d-block d-lg-none openMenu"
              onClick={(e) => {
                setOpenSidemenu(true);
                // document.body.classList.add("noScroll");
              }}
            >
              <i className="fa-solid fa-bars"></i>
            </div>

            <div className={"nav-menu " + (openSidemenu ? "show" : "")}>
              <div
                className="d-block d-lg-none closeMenu"
                onClick={(e) => {
                  setOpenSidemenu(false);
                  // document.body.classList.remove("noScroll");
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
              <ul className="nav font-heading">
                <li
                  className="nav-item"
                  onClick={_navigateToAboutUs}
                >
                  About us
                </li>
                <li className="nav-item" onClick={_navigateToVirtual}>
                  Virtual Fundraising
                </li>
                <li
                  className="nav-item"
                  onClick={(e) => history.push("/shop-premium-candy")}
                >
                  Shop Premium Candy
                </li>
                {isLoggedIn ? (
                  <>
                    <li className="nav-item cta-btn" onClick={_navigate}>
                      Dashboard
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item cta-btn" onClick={_navigate}>
                      Login
                    </li>
                    <li className="nav-item cta-btn" onClick={_navigate}>
                      Register
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};
export default Header;
