/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import Sidebar from "../../Components/Dashboard/Sidebar";
import Topbar from "../../Components/Dashboard/Topbar";
import CopyToClipboard from "../../core/copy-to-clipboard-button/copy-to-clipboard-button";
import EventUtils from "../../entities/events/utils/event-utils";
import PopupUtils from "../../entities/events/utils/popup-utils";
// import PopupStoreEditor from "../../entities/popup-store/components/popup-store-editor/popup-store-editor";
import "./all-events-page.scss";
import ShareButton from "../../core/share-button/share-button";
import moment from "moment";

const AllEventsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [filterEventId, setFilterEventId] = useState(null);

  const { events } = useSelector((state) => state.event);

  const _loadEvents = async () => {
    setIsLoaderActive(true);
    console.log('load events 12345');
    await EventUtils.loadAllEvents();
    setIsLoaderActive(false);
  };

  const _filterByEventIfNeeded = () => {
    if (location?.search?.length) {
      const { eid } = queryString.parse(location.search);
      setFilterEventId(eid);
    }
  };

  const _getEventStatus = (event) => {
    let status = "Scheduled";
    const startDateTimeStamp = +moment(parseInt(event.StartDate)).toDate();
    const endDateTimeStamp = +moment(parseInt(event.StartDate))
      .add(5, "days")
      .toDate();
    const currentDateTimeStamp = +moment().toDate();
    if (
      currentDateTimeStamp > startDateTimeStamp &&
      currentDateTimeStamp < endDateTimeStamp
    ) {
      status = "Active";
    } else if (currentDateTimeStamp > endDateTimeStamp) {
      status = "Expired";
    }
    return status;
  };

  const _filterEvents = (events) => {
    let filteredEvents = [...events];
    if (filterEventId?.length) {
      let filteredEvent = events.find((e) => e.EventCode === filterEventId);
      if (filteredEvent) {
        filteredEvents = [filteredEvent];
      }
    }
    if (showActiveOnly) {
      filteredEvents = filteredEvents.filter(
        (event) => _getEventStatus(event) === "Active"
      );
    }
    return filteredEvents;
  };

  useEffect(() => {
    _loadEvents();
  }, []);

  useEffect(() => {
    _filterByEventIfNeeded();
  }, [location.search]);

  const filteredEvents = _filterEvents(events);

  return (
    <>
      {isLoaderActive ? (
        <div className="loaderWrapper pageLoader">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}
      {/* <PopupStoreEditor /> */}

      {
        <div id="page-top" className="manage-popup-store-page">
          <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar />
                <div className="container-fluid">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Events
                      </h6>

                      <div className="button">
                        {/* <span className="btn btn-sm btn-primary font-weight-bold border-0 text-capitalize">
                          <i className="fa fa-plus"></i> Add new
                        </span> */}
                        <div className="toggleWrapper">
                          <div className="options">
                            <div
                              className={`option ${
                                showActiveOnly && "selected"
                              }`}
                              onClick={(e) => setShowActiveOnly(true)}
                            >
                              Active only
                            </div>
                            <div
                              className={`option ${
                                !showActiveOnly && "selected"
                              }`}
                              onClick={(e) => setShowActiveOnly(false)}
                            >
                              Show All
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        {filteredEvents.map((event) => (
                          <div class="col-xl-3 col-lg-4 col-md-6 mb-4" key={event.EventID}>
                            <div className="org-card h-auto">
                              <div className="text-center my-3">
                                {event?.PopupCode?.length ? (
                                  <a
                                    className="d-inline-block py-2 px-3 m-0 eventManageBtn"
                                    onClick={(e) =>
                                      PopupUtils.managePopupStore({
                                        clickEvent: e,
                                        popupId: event.EventPopupID,
                                        history,
                                      })
                                    }
                                  >
                                    <i className="fa fa-edit"></i> Manage
                                    popup store
                                  </a>
                                ) : (
                                  <a
                                    className="d-inline-block py-2 px-3 m-0 eventManageBtn"
                                    onClick={(e) =>
                                      PopupUtils.createPopupStore({
                                        clickEvent: e,
                                        event,
                                      })
                                    }
                                  >
                                    <i className="fa fa-edit"></i> Create
                                    popup store
                                  </a>
                                )}
                              </div>

                              <div
                                className="big-image"
                                onClick={(e) => {
                                  history.push(
                                    `/event-view-page/${event.EventID}`
                                  );
                                  // if (event.EventMemberTypeID === 1) {
                                  // }
                                }}
                              >
                                <img
                                  src={require("../../assets/images/logo.png")}
                                  alt=""
                                />
                              </div>

                              <div className="details">
                                <h5 className="card-title">
                                  {event.EventName}{" "}
                                  <div className="shareWRapper">
                                    <ShareButton
                                      entity="event"
                                      event={event}
                                      linkPart={`/join-event?je=${event?.EventCode}`}
                                      messagePart={`Hello Team - I set up a Treats Island Candy virtual fundraiser! It's 100% contactless. We keep 50% of the profit and the product ships directly to your supporters. Please download the Treats Island Candy app and use the event code to enter our event and open your Candy Pop-up Store. Event link:- `}
                                    />
                                  </div>
                                </h5>
                                <p className="">
                                  Org: {event.OrganizationName}
                                </p>
                                <div className="buttons text-center buttonsWrapper">
                                  <div className="tagsWrapper">
                                    <div
                                      className={`eventTypeTag ${
                                        event.EventMemberTypeID === 2
                                          ? "joined"
                                          : "own"
                                      }`}
                                    >
                                      {event.EventMemberTypeID === 2
                                        ? "Joined"
                                        : "Owned"}
                                    </div>

                                    <div
                                      className={`statusTag ${_getEventStatus(
                                        event
                                      )}`}
                                    >
                                      {_getEventStatus(event)}
                                    </div>
                                  </div>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up" />
          </a>
        </div>
      }
    </>
  );
};

export default AllEventsPage;
