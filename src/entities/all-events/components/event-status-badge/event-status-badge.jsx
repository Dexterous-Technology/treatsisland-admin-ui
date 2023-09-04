import React, { useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "./event-status-badge.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import OutsideClickHandler from "react-outside-click-handler";
import EventUtils from "../../utils/event-utils";

const EventStatusbadge = ({
  status,
  formattedStartDate,
  formattedEndDate,
  startDate: _startDate,
  endDate: _endDate,
  eventOrganizer,
  event,
}) => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const _generateClassName = (status) => {
    switch (status) {
      case "Completed":
        return "badge badge-secondary";
      case "Ongoing":
        return "badge badge-success";
      case "Scheduled":
        return "badge badge-info";
      default:
        return "badge badge-secondary";
    }
  };

  const _toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const _reset = () => {
    setIsDatePickerVisible(false);
    setErrorMessage("");
  };

  useEffect(() => {
    if (_startDate && _endDate) {
      console.log("_startDate 8989891:>> ", _startDate);
      setStartDate(parseInt(_startDate));
      setEndDate(parseInt(_endDate));
    }
  }, [isDatePickerVisible]);

  const _submit = (e) => {
    e.preventDefault();
    // If no valid date or endDate is less than startDate
    if (!startDate || !endDate || endDate < startDate) {
      setErrorMessage("Please enter valid dates");
      return;
    } else {
      setErrorMessage("");
    }
    EventUtils.updateEventDate(event, startDate, endDate);
    setIsDatePickerVisible(false);
  };

  const cName = _generateClassName(status);
  return (
    <>
      <div className={`statusWrapper`}>
        <div className="left">
          <span className={cName}>{status}</span>
          <div className="dateRange">{formattedStartDate}</div>
          <div className="dateRange">{formattedEndDate}</div>
        </div>
        <div className="right">
          {/* Bootstap pencil icon as a button */}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={_toggleDatePicker}
          >
            <i className="fa fa-pencil"></i>
          </button>
          {isDatePickerVisible ? (
            <>
              <OutsideClickHandler onOutsideClick={_reset}>
                <div className="dateEditorPopup">
                  <div className="card">
                    <div className="">
                      <h3 className="text-center title">{eventOrganizer}</h3>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="startDate">Start Date</label>
                          <ReactDatePicker
                            selected={
                              startDate
                                ? moment(startDate).toDate()
                                : moment().add(0, "days").toDate()
                            }
                            onChange={(date) => {
                              setStartDate(+moment(date).toDate());
                            }}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                            showTimeSelect
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="endDate">End Date</label>
                          <ReactDatePicker
                            selected={
                              endDate
                                ? moment(endDate).toDate()
                                : moment().add(0, "days").toDate()
                            }
                            onChange={(date) => {
                              setEndDate(+moment(date).toDate());
                            }}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                            showTimeSelect
                          />
                        </div>
                        {errorMessage?.length? (
                          <div className="alert alert-danger">
                            {errorMessage}
                          </div>
                        ): <></>}
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-secondary mr-2"
                          >
                            Dismiss
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={_submit}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </OutsideClickHandler>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default EventStatusbadge;
