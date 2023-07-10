import React, { Component, useEffect, useState } from "react";
import BankInfoPopup from "../bank-info/bank-info";
import PopupStore from "../popup-store/popup-store";
import EventUtils from "../../utils/event-utils";
import { useSelector } from "react-redux";
import moment from "moment";
import Standard from "../../../../const/standards";

const ListingAllEvent = ({ onClickBankInfo, onClickAllPopupStore }) => {
  const { events } = useSelector((state) => state.adminStore);
  return (
    <>
      {events.map((event, index) => (
        <tr key={event.EventID}>
          <td className="text-center">
            <input type="checkbox" />
          </td>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">
            <b>{event.EventName}</b>
          </td>
          <td className="text-center">{event.EventCode}</td>
          <td className="text-center">
            {event._formattedDate} <br />({event._daysAgo})
          </td>
          <td className="text-center">
            <span className="badge badge-secondary">{event._status}</span>
          </td>
          <td className="text-center">
            <input type="date" className="form-control" />
          </td>
          <td className="text-center">
            <input type="text" className="form-control" placeholder="Enter" />
          </td>
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
                onClick={(e) => onClickBankInfo(event)}
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
