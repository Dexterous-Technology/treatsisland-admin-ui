/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, NavLink, useParams } from "react-router-dom";
import AuthHelper from "../../utils/auth-helper";
import Sidebar from "../../Components/Dashboard/Sidebar";
import Topbar from "../../Components/Dashboard/Topbar";
import "./event-page.scss";
import EventEditorPopup from "../../entities/events/components/event-editor-popup/event-editor-popup";
import ApiCalls from "../../api";
import { setEvents } from "../../store/event-store";
import { useDispatch, useSelector } from "react-redux";
import PopupUtils from "../../entities/events/utils/popup-utils";
import CopyToClipboard from "../../core/copy-to-clipboard-button/copy-to-clipboard-button";
import ShareButton from "../../core/share-button/share-button";

const OrganizationPage = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const [eventEditorPopup, setEventEditorPopup] = useState({
    isEditing: false,
    isVisible: false,
    selectedEvent: null,
  });

  const _showPopupToAddNewEvent = () => {
    setEventEditorPopup({
      isEditing: false,
      isVisible: true,
      selectedEvent: null,
    });
  };

  const _showPopupToEditEvent = (event) => {
    setEventEditorPopup({
      isEditing: true,
      isVisible: true,
      selectedEvent: event,
    });
  };

  const _hideEventEditor = () => {
    setEventEditorPopup({
      isEditing: false,
      isVisible: false,
      selectedEvent: null,
    });
    _loadEvents();
  };

  const _loadEvents = async () => {
    setIsLoaderActive(true);
    try {
      const response = await ApiCalls.event.private.loadEventsByOrg(
        params.orgid
      );
      if (response?.data?.data?.allEvents) {
        dispatch(setEvents(response?.data?.data?.allEvents));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
    setIsLoaderActive(false);
  };

  // const _openEventPage = (org) => {
  //   history.push(`/event/${org.OrganizationID}`);
  // };

  useEffect(() => {
    _loadEvents();
  }, []);

  return (
    <>
      {isLoaderActive ? (
        <div className="loaderWrapper pageLoader">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}
      <div id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              <div className="container-fluid">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Event</h6>
                  </div>

                  <div className="card-header py-3 text-right">
                    {/* <NavLink
                      className="btn btn-danger btn-icon-split mr-2"
                      to="/organization"
                    >
                      <span className="text">Back</span>
                    </NavLink> */}

                    <button
                      className="btn btn-danger btn-icon-split"
                      onClick={_showPopupToAddNewEvent}
                    >
                      <span className="text">Add</span>
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="col-12">
                      <div className="row">
                        {events?.map((event) => (
                          <div className="col-12">
                            <div className="eventCard">
                              <div className="eventCover"></div>
                              <div className="eventDetails">
                                <div className="actionsWraper">
                                  <button
                                    className="editBtn"
                                    onClick={(e) =>
                                      _showPopupToEditEvent(event)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button className="deleteBtn">Delete</button>
                                </div>
                                <div className="eventMetaWrapper">
                                  <div className="eventTitle labelWrapper">
                                    Event Name: <span>{event?.Name}</span>
                                  </div>
                                  <div className="eventTeamTitle labelWrapper">
                                    Team Name: <span>{event?.TeamName}</span>
                                  </div>
                                  <div className="inviteCode labelWrapper">
                                    Invite code: <span>{event?.EventCode}</span>
                                  </div>
                                  <div className="inviteLink labelWrapper">
                                    Date:{" "}
                                    <span>
                                      {event?.StartDate} to {event?.EndDate}
                                    </span>
                                  </div>
                                  <div className="inviteLink labelWrapper">
                                    {/* Invite link:{" "} */}

                                    <div className="shareWRapper">
                                      <ShareButton
                                        linkPart={`/join-event?je=${event?.EventCode}`}
                                        event={event}
                                        entity="event"
                                        messagePart={`Hello Team - I set up a Treats Island Candy virtual fundraiser! It's 100% contactless. We keep 50% of the profit and the product ships directly to your supporters. Please download the Treats Island Candy app and use the event code to enter our event and open your Candy Pop-up Store. Event link:- `}
                                      />
                                    </div>
                                  </div>

                                  <div className="orgEventPopupButton">
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
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
      <EventEditorPopup
        {...eventEditorPopup}
        onDismiss={_hideEventEditor}
        orgId={params.orgid}
      />
    </>
  );
};

export default OrganizationPage;
