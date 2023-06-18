import React from "react";
import "./share-button.scss";
import { ToastContainer, toast } from "react-toastify";
import Standard from "../../const/standards";
import moment from "moment";
import { RWebShare } from "react-web-share";

const ShareButton = ({
  linkPart,
  messagePart,
  copyFullMessage = false,
  joinMessageWithLink = true,
  entity = "event",
  event = null,
  popupStore = null,
}) => {
  const _checkIfMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];
  
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
  };
  const detectBrowserType = () => {
    if (window) {
      // Opera 8.0+
      const isOpera =
        // eslint-disable-next-line no-undef
        (!!window.opr && !!opr.addons) ||
        !!window.opera ||
        navigator.userAgent.indexOf(" OPR/") >= 0;
      // Firefox 1.0+
      const isFirefox = typeof InstallTrigger !== "undefined";
      // Safari 3.0+ "[object HTMLElementConstructor]"
      const isSafari =
        /constructor/i.test(window.HTMLElement) ||
        (function (p) {
          return p.toString() === "[object SafariRemoteNotification]";
        })(
          !window["safari"] ||
            (typeof safari !== "undefined" && window["safari"].pushNotification)
        );
      // Internet Explorer 6-11
      const isIE = /*@cc_on!@*/ false || !!document.documentMode;
      // Edge 20+
      const isEdge = !isIE && !!window.StyleMedia;
      // Chrome 1 - 79
      const isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);
      // Edge (based on chromium) detection
      const isEdgeChromium =
        isChrome && navigator.userAgent.indexOf("Edg") != -1;
      // Blink engine detection
      const isBlink = (isChrome || isOpera) && !!window.CSS;
      return {
        isOpera,
        isFirefox,
        isSafari,
        isIE,
        isEdge,
        isChrome,
        isEdgeChromium,
        isBlink,
      };
    } else {
      return {};
    }
  };
  const _generateMessageAndLink = () => {
    const result = {
      message: "",
      link: "",
    };
    if (entity === "event") {
      const inviteLink = `${window.location.origin}/join-event?je=${event?.EventCode}`;

      const startDate = moment(parseInt(event?.StartDate)).format(
        Standard.dateFormat
      );
      const time = moment(parseInt(event?.StartDate)).format(
        Standard.timeFormat
      );
      const endDate = moment(parseInt(event?.StartDate))
        .add(5, "days")
        .format(Standard.dateFormat);
      result.link = inviteLink;
      result.message = `Hello Team - I set up a virtual fundraiser with Treats Island Candy! It is 100% contactless. We get to keep 50% of total profit and Treat Island Candy will ship the product directly to our buyers.
    
Each of us will create a Pop-Up Store selling this specialized candy! The prices range from $15 to $20 per container and you won't find these premium products in general stores.

Our fundraising window begins on ${startDate}, at ${time} and goes until ${endDate}, at ${time}.

Before the fundraiser begins:
1. Click on the LINK below
2. Confirm the Event Code ${event?.EventCode}
3. Create your personalized Pop-Up Store

SHARE WITH YOUR MEMBERS
${inviteLink}`;
    } else {
      const popuplink = `${window.location.origin}/popup-store/${popupStore?.PopupCode}`;
      result.message = `Come buy candy and support my event: ${popuplink}`;
      result.link = popuplink;
    }
    return result;
  };

  const { message, link } = _generateMessageAndLink();

  const _initiateMessage = () => {
    _copyMessage();
    const URL = `sms:?&body=${message}`;
    window.open(URL, "_blank");
  };
  const _initiateEmail = () => {
    _copyMessage();
    const URL = `mailto:?&body=${message}`;
    window.open(URL, "_blank");
  };
  const _copyMessage = () => {
    navigator.clipboard.writeText(message);
    toast("Copied to clipboard!");
  };
  const _copyLink = () => {
    navigator.clipboard.writeText(link);
    toast("Copied to clipboard!");
  };

  const _visitLink = () => {
    window.open(link, "_blank").focus();
  };
  const _shareOnSocialMedia = (sharedMethod = "COPY_LINK") => {
    const pageName = "";
    let link = "";
    switch (sharedMethod) {
      case "WHATSAPP": {
        link = `https://api.whatsapp.com/send?text=${pageName}&${link}`;
        break;
      }
      case "INSTAGRAM": {
        link = `https://www.instagram.com/?url=${link}`;
        break;
      }
      case "FACEBOOK": {
        link = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
        break;
      }
      case "TWITTER": {
        link = `https://twitter.com/intent/tweet?text=${pageName}&url=${link}`;
        break;
      }
      case "LINKEDIN": {
        link = `https://www.linkedin.com/shareArticle?mini=true&url=${link}`;
        break;
      }
      default: {
        link = ``;
      }
    }
    window.open(link, "_blank").focus();
  };

  const _isNativeShareSupported = () => {
    try {
      const browserTypes = detectBrowserType();
      return window?.navigator?.share && !browserTypes?.isEdgeChromium;
    } catch (error) {
      return false;
    }
  };

  const isNative = _isNativeShareSupported();
  const isMobile = _checkIfMobile();
  console.log('isMobile :>> ', isMobile);

  return (
    <>
      <div className="buttonOuterWrapper">
        <button>
          <i className="fa-solid fa-share-nodes"></i> Share
        </button>
        <div className="shareOptions">
          <div className="option" onClick={_initiateEmail}>
            <i className="fa-solid fa-envelope"></i>&nbsp;Email
          </div>
          <div className="option" onClick={_initiateMessage}>
            <i className="fa-solid fa-comment-sms"></i>&nbsp;Text
          </div>

          {entity === "popup" ? (
            <>
              <div
                className="option"
                onClick={(e) => _shareOnSocialMedia("FACEBOOK")}
              >
                <i className="fa-brands fa-facebook"></i>&nbsp;Share on facebook
              </div>
              <div
                className="option"
                onClick={(e) => _shareOnSocialMedia("TWITTER")}
              >
                <i className="fa-brands fa-twitter"></i>&nbsp;Share on twitter
              </div>
              <div className="option" onClick={_visitLink}>
                <i className="fa-solid fa-link"></i>&nbsp;Visit Popup Store
              </div>
            </>
          ) : (
            <>
              <div className="option" onClick={_copyMessage}>
                <i className="fa-solid fa-copy"></i>&nbsp;Copy message
              </div>
              <div className="option" onClick={_copyLink}>
                <i className="fa-solid fa-copy"></i>&nbsp;Copy link
              </div>
            </>
          )}
          {isMobile && isNative ? (
            <RWebShare
              data={{
                text: message,
                url: "link",
                title: "Treats island",
              }}
            >
              <div className="option" onClick={_initiateMessage}>
                <i className="fa-solid fa-mobile"></i>&nbsp;Share via mobile
              </div>
            </RWebShare>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default ShareButton;
