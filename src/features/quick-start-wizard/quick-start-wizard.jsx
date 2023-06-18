import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiCalls from "../../api";
import { setOrgs } from "../../store/org-store";
import { EventEmitter } from "../../utils/event-emitter";
import QuickWizardAuth from "./components/quick-wizard-auth/quick-wizard-auth";
import QuickWizardForm from "./components/quick-wizard-form/quick-wizard-form";
import QuickWizardReview from "./components/quick-wizard-review/quick-wizard-review";
import QuickWizardSuccess from "./components/quick-wizard-success/quick-wizard-success";
import "./quick-start-wizard.scss";
import { useHistory } from "react-router-dom";
import QuickWizardEmail from "./components/quick-wizard-email/quick-wizard-email";
import QuickWizardExtra from "./components/quick-wizard-extra/quick-wizard-extra";
import AuthHelper from "../../utils/auth-helper";
import QuickWizardBankDetails from "./components/quick-wizard-bank-details/quick-wizard-bank-details";

const defaultFormFields = {
  orgName: "",
  orgType: "",
  eventName: "",
  eventStartDate: "",
};

const titles = [
  "Add email address",
  "Login using phone number",
  "Create an event",
  "Review",
  "Some more info about you",
  "Bank details",
  "Successfully created!",
];

const QuickStartWizard = () => {
  const [formValues, setFormValues] = useState({ ...defaultFormFields });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [eventJoinCode, setEventJoinCode] = useState("");
  const [onlyLogin, setOnlyLogin] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [eventCode, setEventCode] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);

  const isLoggedIn = !!user;
  console.log("user :>> ", user);

  // console.log('history 123:>> ', history);

  const _gotoNextStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const _gotoPrevStep = () => {
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const _reset = () => {
    setCurrentStepIndex(0);
    setIsVisible(false);
    setAuthEmail("");
  };

  const _fetchAllProducts = async () => {
    try {
      const {
        data: {
          data: { allProducts },
        },
      } = await ApiCalls.product.private.getAllProducts();
      if (allProducts?.length) {
        setAllProducts(allProducts);
      }
    } catch (error) {}
  };

  const _createEvent = async (org) => {
    try {
      const payload = {
        orgId: org.OrganizationID,
        eventName: formValues.eventName,
        teamName: formValues.eventName,
        startDate: formValues.startDate,
        endDate: +moment(parseInt(formValues.startDate))
          .add(5, "days")
          .toDate(),
        productIds: allProducts.map((product) => product.ProductID),
      };
      const response = await ApiCalls.event.private.createEvent(payload);
      // EventEmitter.dispatch('REFRESH_EVENTS');
      if (response?.data?.data?.newEventCode?.length) {
        setEventCode(response?.data?.data?.newEventCode);
        // setEvent(response.data.data.allEvents[0]);
        history.push(
          `/event-view-page/${response.data.data.allEvents[0].EventID}`
        );
      }
      // console.log("response.data", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const _createOrg = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCalls.org.private.createOrg({
        name: formValues.orgName,
        orgTypeId: formValues.orgType,
      });
      if (response?.data?.data?.allOrgMemberShips) {
        dispatch(setOrgs(response?.data?.data?.allOrgMemberShips));
        const org = response?.data?.data?.allOrgMemberShips.find(
          (o) =>
            o.OrganizationName === formValues.orgName ||
            o.OrganizationTypeID === formValues.orgType
        );
        await _createEvent(org);
      }
      _gotoNextStep();
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  const _renderStep = () => {
    switch (currentStepIndex) {
      case 0: {
        return (
          <QuickWizardAuth
            gotoNextStep={_gotoNextStep}
            gotoPrevStep={_gotoPrevStep}
            eventCodeToJoin={eventJoinCode}
            onlyLogin={onlyLogin}
            authEmail={authEmail}
            closeModal={_reset}
          />
        );
      }
      case 1: {
        return (
          <QuickWizardForm
            gotoNextStep={_gotoNextStep}
            gotoPrevStep={_gotoPrevStep}
            formValues={formValues}
            closeModal={_reset}
            setFormValues={setFormValues}
          />
        );
      }
      case 2: {
        return (
          <QuickWizardReview
            gotoNextStep={_createOrg}
            gotoPrevStep={_gotoPrevStep}
            formValues={formValues}
          />
        );
      }
      case 3: {
        return (
          <QuickWizardExtra
            gotoNextStep={_gotoNextStep}
            gotoPrevStep={_gotoPrevStep}
            formValues={formValues}
          />
        );
      }
      case 4: {
        return (
          <QuickWizardSuccess
            gotoNextStep={_gotoNextStep}
            gotoPrevStep={_gotoPrevStep}
            formValues={formValues}
            eventCode={eventCode}
            onHide={_closeWizard}
          />
        );
      }
      default: {
        return <></>;
      }
    }
  };

  const _showWizard = ({ onlyLogin = false }) => {
    setFormValues({ ...defaultFormFields });
    setOnlyLogin(onlyLogin);
    console.log("isLoggedIn :>> ", isLoggedIn);
    if (isLoggedIn) {
      setCurrentStepIndex(1);
    } else {
      setCurrentStepIndex(0);
    }
    setIsVisible(true);
    document.body.classList.add("noScroll");
    setEventCode("");
  };

  const _closeWizard = () => {
    setIsVisible(false);
    _reset();
    document.body.classList.remove("noScroll");
  };

  useEffect(() => {
    _fetchAllProducts();
    EventEmitter.subscribe("SHOW_QUICK_WIZARD", () => {
      setEventJoinCode("");
      _showWizard({
        onlyLogin: false,
      });
    });
    EventEmitter.subscribe("SHOW_QUICK_WIZARD_LOGIN", (params = null) => {
      setEventJoinCode("");
      if (params?.eventCodeToJoin) {
        setEventJoinCode(params.eventCodeToJoin);
      }

      _showWizard({
        onlyLogin: true,
      });
    });
    return () => {
      EventEmitter.cancelAll("SHOW_QUICK_WIZARD");
      EventEmitter.cancelAll("SHOW_QUICK_WIZARD_LOGIN");
    };
  }, [user]);

  return (
    <>
      {isVisible ? (
        <>
          {isLoading ? (
            <div className="quickWizardLoaderWrapper">
              <div className="loaderWrapper pageLoader">
                <div className="loader"></div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* *************************************************** WIZARD */}
          {eventJoinCode?.length ? (
            <div className="eventJoinNotifierWrapper">
              <div className="eventJoinNotifier">
                Please login/signup to join the event
              </div>
            </div>
          ) : (
            <></>
          )}
          <div
            className={"wizard show"}
            onClick={(e) => {
              e.preventDefault();
              if (e.target === e.currentTarget) {
                // setOpenWizard(false);
                // _showStep(1);
              }
            }}
          >
            <div className="wizard_inner">
              <div className="wizard_title">
                <span className="title"></span>

                <div className="wizard_close" onClick={_closeWizard}>
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5L4.99998 19M5.00001 5L19 19"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              {_renderStep()}
            </div>
          </div>
          {/* *************************************************** /WIZARD */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default QuickStartWizard;
