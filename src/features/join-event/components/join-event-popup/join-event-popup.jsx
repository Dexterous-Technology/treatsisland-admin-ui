import React, { Component, useEffect, useState } from "react";
import "./join-event-popup.scss";
import { EventEmitter } from "../../../../utils/event-emitter";
import EventNames from "../../../../const/event-names";
import JoinEventHelper from "../../join-event-helper";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ApiCalls from "../../../../api";
import moment from "moment";
import Standard from "../../../../const/standards";

const JoinEventPopup = () => {
  const [eventCodeInputText, setEventCodeInputText] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [isEditorActive, setisEditorActive] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [event, setEvent] = useState(null);
  const { user } = useSelector((state) => state.user);
  const history = useHistory(false);

  const isLoggedIn = !!user;
  const _showPopup = async (eventCode = "") => {
    setEventCodeInputText(eventCode);
    await _submitCode(eventCode);
    setisVisible(true);
  };

  const _reset = () => {
    setEventCodeInputText("");
    setisVisible(false);
    setisEditorActive(true);
    setisLoading(false);
    setEvent(null);
    setErrorText("");
  };

  const _switchToEditor = () => {
    setisEditorActive(true);
    setisLoading(false);
    setEvent(null);
    setErrorText("");
  }

  const _showFurtherJoinFlow = () => {
    JoinEventHelper.eventId = eventCodeInputText;
    if (isLoggedIn) {
      // Join directly
      JoinEventHelper.initiateJoinProcess({
        eventId: eventCodeInputText,
        historyRef: history,
      });
    } else {
      //   console.log('SHOW_QUICK_WIZARD_LOGIN');
      EventEmitter.dispatch("SHOW_QUICK_WIZARD_LOGIN", {
        eventCodeToJoin: eventCodeInputText,
      });
      //   setTimeout(() => {
      //   }, 1000);
    }
    setTimeout(() => {
      _reset();
    }, 100);
  };

  const _hasExpired = (event) => {
    let hasExpired = false;
    const startDateTimeStamp = +moment(parseInt(event.StartDate)).toDate();
    const endDateTimeStamp = +moment(parseInt(event.StartDate))
      .add(5, "days")
      .toDate();
    const currentDateTimeStamp = +moment().toDate();
    if (currentDateTimeStamp > endDateTimeStamp) {
      hasExpired = true;
    }
    return hasExpired;
  };

  const _subscribeToEvents = () => {
    EventEmitter.subscribe(EventNames.eventJoinPopup.show, (eventCode = "") => {
      _showPopup(eventCode);
    });
    EventEmitter.subscribe(EventNames.eventJoinPopup.hide, () => {
      _reset();
    });
  };

  const _unsubscribeToEvents = () => {
    EventEmitter.cancelAll(EventNames.eventJoinPopup.show);
    EventEmitter.cancelAll(EventNames.eventJoinPopup.hide);
  };

  const _submitCode = async (eventCode = null) => {
    setErrorText("");
    setisLoading(true);
    let eventCodeToParse = eventCodeInputText;
    // Check if input value is empty but has a param value
    if (!eventCodeInputText?.length && eventCode?.length) {
      eventCodeToParse = eventCode
    }
    try {
      const { data } = await ApiCalls.event.public.getEventByCode(
        eventCodeToParse
      );
      console.log("data :>> ", data);
      if (data?.data?.event?.EventCode?.length) {
        const { event } = data?.data;
        const isExpired = _hasExpired(event);
        if (isExpired) {
          setErrorText("Event expired. Cannot join");
          setEvent(null);
        } else {
          setisEditorActive(false);
          setEvent(event);
        }
      } else {
        setErrorText("Not a valid event code");
      }
    } catch (error) {
      setErrorText("Unable to join event");
    }
    setisLoading(false);
  };

  useEffect(() => {
    _subscribeToEvents();
    return () => {
      _unsubscribeToEvents();
    };
  }, []);

  return (
    <>
      {isVisible ? (
        <>
          <div className="joinEventPopupOverlay">
            <div className="popWrapper">
              {isEditorActive ? (
                <>
                  <div className="codeEditor">
                    <h1>Join an event</h1>
                    <div className="inputWrapper">
                      <p>{eventCodeInputText?.length ? "Event Code" : ""}</p>
                      <input
                        type="text"
                        placeholder="Event Code"
                        value={eventCodeInputText}
                        onChange={(e) => setEventCodeInputText(e.target.value)}
                      />
                    </div>
                    <div className="warningWrapper">
                      {errorText?.length ? <p>{errorText}</p> : <></>}
                    </div>
                    <div className="actions">
                      {isLoading ? (
                        <div className="loader"></div>
                      ) : (
                        <>
                          <button className="cancel" onClick={_reset}>Dismiss</button>
                          <button
                            className="submit"
                            disabled={eventCodeInputText?.length < 5}
                            onClick={_submitCode}
                          >
                            Submit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="eventDetailsViewer">
                    <h1>Event details</h1>
                    <p>
                      <b>Name</b>: {event?.EventName}
                    </p>
                    <p>
                      <b>Code</b>: {eventCodeInputText}{" "}
                      <span onClick={_switchToEditor}>
                        <i className="fa-solid fa-pen"></i>
                      </span>
                    </p>
                    <p>
                      <b>Organization</b>: {event?.OrganizationName}
                    </p>
                    <p>
                      <b>Owner email</b>: {event?.Email}
                    </p>
                    <p>
                      <b>Start Date</b>:{" "}
                      {moment(parseInt(event?.StartDate)).format(Standard.dateTimeFormat)}
                    </p>
                    <p>
                      <b>End Date</b>:{" "}
                      {moment(parseInt(event?.StartDate))
                        .add(5, "days")
                        .format(Standard.dateTimeFormat)}
                    </p>
                    <div className="warningWrapper">
                      {errorText?.length ? <p>{errorText}</p> : <></>}
                    </div>
                    <div className="actions">
                      <button className="cancel" onClick={_reset}>Cancel</button>
                      <button className="submit" onClick={_showFurtherJoinFlow}>
                        Join
                      </button>
                      {/* <div className="loader"></div> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default JoinEventPopup;
