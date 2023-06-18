import moment from "moment";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareButton from "../../../../core/share-button/share-button";
import Standard from "../../../../const/standards";
const QuickWizardSuccess = ({ formValues, eventCode, onHide }) => {
  const _generateMessageAndLink = () => {
    const result = {
      message: "",
      link: "",
    };
    const inviteLink = `${window.location.origin}/join-event?je=${eventCode}`;

    const startDate = moment(parseInt(formValues.startDate)).format(
      Standard.dateFormat
    );
    const time = moment(parseInt(formValues.startDate)).format(
      Standard.timeFormat
    );
    const endDate = moment(parseInt(formValues.startDate))
      .add(5, "days")
      .format(Standard.dateFormat);
    result.link = inviteLink;
    result.message = `Hello Team - I set up a virtual fundraiser with Treats Island Candy! It is 100% contactless. We get to keep 50% of total profit and Treat Island Candy will ship the product directly to our buyers.
  
Each of us will create a Pop-Up Store selling this specialized candy! The prices range from $15 to $20 per container and you won't find these premium products in general stores.

Our fundraising window begins on ${startDate}, at ${time} and goes until ${endDate}, at ${time}.

Before the fundraiser begins:
1. Click on the LINK below
2. Confirm the Event Code ${eventCode}
3. Create your personalized Pop-Up Store

SHARE WITH YOUR MEMBERS
${inviteLink}`;
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

  const _copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };

  const inviteLink = `${window.location.origin}/join-event?je=${eventCode}`;

  const startDate = moment(parseInt(formValues.startDate)).format(
    Standard.dateFormat
  );
  const time = moment(parseInt(formValues.startDate)).format(
    Standard.timeFormat
  );
  const endDate = moment(parseInt(formValues.startDate))
    .add(5, "days")
    .format(Standard.dateFormat);

  const _generateInvitationMessage = () => {
    // return `Hello Team - I set up a Treats Island Candy virtual fundraiser! It's 100% contactless. We keep 50% of the profit and the product ships directly to your supporters. Please download the Treats Island Candy app and use the event code to enter our event and open your Candy Pop-up Store. Event link:- ${inviteLink}`;
    return `Hello Team - I set up a virtual fundraiser with Treats Island Candy! It is 100% contactless. We get to keep 50% of total profit and Treat Island Candy will ship the product directly to our buyers.
    
Each of us will create a Pop-Up Store selling this specialized candy! The prices range from $15 to $20 per container and you won't find these premium products in general stores.

Our fundraising window begins on ${startDate}, at ${time} and goes until ${endDate}, at ${time}.

Before the fundraiser begins:
1. Click on the LINK below
2. Confirm the Event Code ${eventCode}
3. Create your personalized Pop-Up Store

SHARE WITH YOUR MEMBERS
${inviteLink}`;
  };

  const [messagePreviewExpand, setMessagePreviewExpand] = useState(false);

  return (
    <>
      {/* <ToastContainer /> */}
      <div className={"wizard_steps success"}>
        <div className="wizard_content">
          <div className="left">
            <div className="image-wrapper">
              <img
                src={require("../../../../assets/images/success.gif")}
                alt=""
              />
            </div>
            <div className="title h1 font-weight-bold">
              Event successfully created!
            </div>

            <div className="details my-4">
              <div className="item">
                <span>
                  Event coordinator name:{" "}
                  <b className="h5 font-weight-bold">{formValues?.eventName}</b>
                </span>
              </div>
              <div className="item mt-2 small text-secondary">
                <span>
                  Organization: <b>{formValues?.orgName}</b>
                </span>
              </div>
              <div className="item small text-secondary">
                <span>
                  Start date:{" "}
                  <b>
                    {moment(formValues?.startDate).format(
                      Standard.dateTimeFormat
                    )}
                  </b>
                </span>
              </div>
              <div className="item small text-secondary">
                <span>
                  End date:{" "}
                  <b>
                    {moment(formValues.startDate)
                      .add(5, "days")
                      .format(Standard.dateTimeFormat)}{" "}
                    (5 days)
                  </b>
                </span>
              </div>
              {/* <div className="gotoEventBtn" onClick={(e) => _navigateToEvent()}>
                <div className="button">Goto event page</div>
              </div> */}
            </div>
          </div>

          <div className="right">
            <div className="quickStartSuccessTeamMessage">
              {/* {invitationMessage} */}

              <div className="messagePreview">
                <div
                  className={
                    "innerContent " + (messagePreviewExpand ? "expanded" : "")
                  }
                >
                  <p>
                    Hello Team - I set up a virtual fundraiser with Treats
                    Island Candy! It is 100% contactless. We get to keep 50% of
                    total profit and Treat Island Candy will ship the product
                    directly to our buyers.
                  </p>

                  <p>
                    Each of us will create a Pop-Up Store selling this
                    specialized candy! The prices range from $15 to $20 per
                    container and you won't find these premium products in
                    general stores.
                  </p>

                  <p>
                    Our fundraising window begins on {startDate}, at {time}{" "}
                    and goes until {endDate}, at {time}.
                  </p>

                  <p className="mb-0">Before the fundraiser begins:</p>
                  <ol>
                    <li>Click on the LINK below</li>
                    <li>Confirm the Event Code {eventCode}</li>
                    <li>Create your personalized Pop-Up Store</li>
                  </ol>

                  <div className="shareLink">
                    <div>SHARE WITH YOUR MEMBERS</div>
                    <span>{inviteLink}</span>
                  </div>
                </div>

                <div
                  className="readMore"
                  onClick={(e) =>
                    setMessagePreviewExpand(!messagePreviewExpand)
                  }
                >
                  {messagePreviewExpand ? "Load less" : "Load more"}
                </div>

                <div className="shareButtons">
                  <div
                    className="copyButton"
                    onClick={_copyMessage}
                  >
                    <div className="button">
                      <i className="far fa-copy mr-2"></i> Copy entire message
                    </div>
                  </div>

                  <div className="button btnCopyText" onClick={_initiateMessage}>
                    <i className="far fa-comment mr-2" ></i> Share in a Text
                  </div>
                  <div className="button btnCopyText" onClick={_initiateEmail}>
                    <i className="far fa-envelope mr-2"></i> Share in an Email
                  </div>
                </div>
              </div>

              <div className="or">
                <span>OR</span>
              </div>

              <div className="shareLinkCopy">
                <div className="title">Copy the invite link</div>
                <div className="inputBox">
                  <div className="url">{inviteLink}</div>
                  <div
                    className="btnCopyLink"
                    onClick={_copyLink}
                  >
                    <i className="far fa-copy mr-2"></i> Copy
                  </div>
                </div>
              </div>


              <div className="gotoevent" onClick={onHide}>
                <div className="button"><i className="fa fa-external-link mr-2"></i> Go to event</div>
              </div>

              {/* <ShareButton
                linkPart={`/join-event?je=${eventCode}`}
                messagePart={invitationMessage}
                copyFullMessage={true}
                joinMessageWithLink={false}
              /> */}
            </div>

            <div className="details"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickWizardSuccess;
