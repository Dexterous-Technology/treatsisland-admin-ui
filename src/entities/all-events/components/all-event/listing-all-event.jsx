import React from "react";
import { useSelector } from "react-redux";
import EventStatusbadge from "../event-status-badge/event-status-badge";
import EventUtils from "../../utils/event-utils";
import "./listing-all-event.scss";
const ListingAllEvent = ({
  onClickBankInfo = () => {},
  onClickAllPopupStore = () => {},
  onSalesInfoClick = () => {},
  onClickMoreInfo = () => {},
}) => {
  const { events } = useSelector((state) => state.adminStore);

  const showArchiveWarning = (event) => {
    if (window.confirm("Are you sure you want to archive this event?")) {
      EventUtils.archiveEvent(event);
    }
  }

  const activeEvents = events.filter((event) => event.IsActive === 1);

  return (
    <>
      {activeEvents.map((event, index) => (
        <tr key={event.EventID}>
          {/* <td className="text-center">
            <input type="checkbox" disabled/>
          </td> */}
          <td className="text-center">{event.EventID}</td>
          <td className="text-left">
            <b>{event.EventName}</b> &nbsp;
            <span className="moreInfo" title="More information"
              onClick={(e) => onClickMoreInfo(event)}
            ><i className="fa fa-info-circle"></i></span>
            &nbsp;
            
          

          </td>
          <td>
          <span className="archiveBtn" title="Archive"
              onClick={(e) => showArchiveWarning(event)}
            ><i className="fa fa-archive"></i> {" "}
              Archive
            
            </span>
          </td>
          <td className="text-center">{event.EventCode}</td>
          <td className="text-center">{event._formattedDate}</td>
          <td className="text-center">
            <EventStatusbadge
              status={event._status}
              formattedStartDate={event._formattedStartDate}
              formattedEndDate={event._formattedEndDate}
              startDate={event.StartDate}
              endDate={event.EndDate}
              eventOrganizer={event.EventName}
              event={event}
            />
          </td>
          {/* <td className="text-center">
            <input type="date" className="form-control" />
          </td>
          <td className="text-center">
            <input type="text" className="form-control" placeholder="Enter" />
          </td> */}
          <td className="text-center">
            <b className="m-0">$ {event.totalSales}</b>
          </td>
          <td className="text-center">$ {event.ownerEarnings}</td>
          <td className="text-center">$ {event.platformEarnings}</td>
          <td className="text-center">
            <div className="popupStoreButton">
              <div
                className="btn btn-light btn-sm"
                onClick={(e) => onClickAllPopupStore(event)}
              >
                View
              </div>
            </div>
          </td>
          
          <td className="text-center">
            <div className="bankInfoButton">
              <div
                className="btn btn-light btn-sm"
                onClick={(e) => onSalesInfoClick(event)}
              >
                View
              </div>
            </div>
          </td>
          
        </tr>
      ))}
      {/* **************************************** MODALS - POPUP STORE */}
      {/*<PopupStore {...eventVisiblePopupStore} onDismiss={_hideAllPopupStore}/>*/}
    </>
  );
};

export default ListingAllEvent;
