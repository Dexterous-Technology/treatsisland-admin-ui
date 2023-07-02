import React, { Component, useEffect, useState } from "react";
import BankInfoPopup from "../bank-info/bank-info";
import PopupStore from "../popup-store/popup-store";
import EventUtils from "../../utils/event-utils";
import { useSelector } from "react-redux";

const ListingAllEvent = ({ 
  onClickBankInfo = () => {},
  onClickAllPopupStore = () => {},
  }) => {

    const [modalBankInfo, setModalBankInfo] = useState(true);
    const [productId, setproductId] = useState(5);
    const { events } = useSelector((state) => state.adminStore);

    const _showPopupToBankInfo = () => {
      onClickBankInfo({
        productId,
        modalBankInfo        
      });
    };

    const [eventVisiblePopupStore, setEventVisiblePopupStore] = useState(true);
    const [popupStoreId, setPopupStoreId] = useState(5);

    const _showAllPopupStore = () => {
        onClickAllPopupStore({
          eventVisiblePopupStore,
          popupStoreId
        });
    };

    const _loadEvents = () => {
      EventUtils.loadAllEvents();
    };

    useEffect(() => {
      _loadEvents();
    }, []);

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
          <td className="text-center">5 Jan, 2023</td>
          <td className="text-center"><span className="badge badge-secondary">Expired</span></td>
          <td className="text-center"><input type="date" className="form-control" /></td>
          <td className="text-center"><input type="text" className="form-control" placeholder="Enter" /></td>
          <td className="text-center">
              <b className="m-0">$ 1000</b>
          </td>
          <td className="text-center">$ 900</td>
          <td className="text-center">$ 100</td>
          <td className="text-center">
            <div className="popupStoreButton"><div className="btn btn-light btn-sm" onClick={_showAllPopupStore}>View</div></div>
          </td>
          <td className="text-center">
            <div className="bankInfoButton"><div className="btn btn-light btn-sm" onClick={_showPopupToBankInfo}>View</div></div>
          </td>
        </tr>
      ))}
        {/* **************************************** MODALS - POPUP STORE */}
        {/*<PopupStore {...eventVisiblePopupStore} onDismiss={_hideAllPopupStore}/>*/}
        
    </>
  );
};

export default ListingAllEvent;
