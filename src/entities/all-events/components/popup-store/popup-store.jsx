import React, { Component, useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import EventUtils from "../../utils/event-utils";

const MODAL_VIEWS = {
  ALL_POPUP_STORES: "ALL_POPUP_STORES",
  SINGLE_POPUP_STORE_DETAILS: "SINGLE_POPUP_STORE_DETAILS",
};

const PopupStore = ({
}) => {
  const [selectedPopupStore, setSelectedPopupStore] = useState(null);
  const [activeView, setActiveView] = useState(MODAL_VIEWS.ALL_POPUP_STORES);
  const { selectedEvent, selectedPopUp, isPopupStoreModalVisible } =
    useSelector((state) => state.adminStore);

    const onPopupStoreModalDismiss = () => {
      EventUtils.hideEventPopups();
    }

  const _showPopupDetails = (store) => {
    setSelectedPopupStore(store);
    setActiveView(MODAL_VIEWS.SINGLE_POPUP_STORE_DETAILS);
  };

  // console.log('isPopupStoreModalVisible :>> ', isPopupStoreModalVisible);

  if (selectedEvent) {
    return (
      <>
        {/* **************************************** MODALS - POPUP STORE */}
        <div
          className={
            "modalPopupStores " + (isPopupStoreModalVisible ? "show" : "")
          }
        >
          {/* ALL POPUP STORES */}
          <div
            className={
              "allPopupStores " +
              (activeView === MODAL_VIEWS.ALL_POPUP_STORES
                ? "d-block"
                : "d-none")
            }
          >
            <div className="modalTop" onClick={onPopupStoreModalDismiss}>
              <i className="fa fa-arrow-left"></i> <span>Go back</span>
            </div>

            <div className="modalHeader">
              List of active popup stores for {selectedEvent?.EventName}'s
              Fundraising Event ({selectedEvent?._storeDetails.length} stores)
            </div>

            <div className="storeCards">
              {selectedEvent._storeDetails.map((store, index) => (
                <div
                  key={index}
                  className="storeCard"
                  onClick={(e) => _showPopupDetails(store)}
                >
                  <div className="image-wrapper">
                    <img src={store?.storeCover} alt="" />
                  </div>
                  <div className="storeDetails">
                    <div className="storeName">{store?.PopupName}</div>
                    <div className="storeDesc">{store?.PopupDesc}</div>

                    <div className="amountRaised">
                      <div className="amount"> ${store?._totalFromAllOrders} raised of ${store?.PopupGoal} ({
                        (store?._totalFromAllOrders*100)/store?.PopupGoal
                      }%) </div>
                      <div className="progressWrapper">
                        <span
                          className="progressMade"
                          style={{ width: `${(store?._totalFromAllOrders*100)/store?.PopupGoal}%` }}
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SINGLE POPUP STORE DETAILS */}
          <div
            className={
              "popupStoreDetails " +
              (activeView === MODAL_VIEWS.SINGLE_POPUP_STORE_DETAILS
                ? "d-block"
                : "d-none")
            }
          >
            <div
              className="modalTop"
              onClick={(e) => setActiveView(MODAL_VIEWS.ALL_POPUP_STORES)}
            >
              <i className="fa fa-arrow-left"></i> <span>Go back</span>
            </div>

            <div className="modalHeader">{selectedPopupStore?.PopupName}</div>

            <div className="innerWrapper">
              <div className="image-wrapper cover">
                <img src={selectedPopupStore?.storeCover} alt="" />
              </div>

              <div className="intro">
                <div className="image-wrapper icon">
                  <img src={selectedPopupStore?.storeLogo} alt="" />
                </div>

                <div className="storeName">{selectedPopupStore?.PopupName}</div>
                <div className="storeDesc">{selectedPopupStore?.PopupDesc}</div>

                <div className="totalSales">Total sales: ${selectedPopupStore?._totalFromAllOrders}</div>

                <div className="amountRaised">
                  <div className="amount">
                    {" "}
                    <span>${selectedPopupStore?._totalFromAllOrders} raised</span> <span>of ${selectedPopupStore?.PopupGoal}</span>{" "}
                  </div>
                  <div className="progressWrapper">
                    <span
                      className="progressMade"
                      style={{ width: `${(selectedPopupStore?._totalFromAllOrders*100)/selectedPopupStore?.PopupGoal}%`}}
                    ></span>
                  </div>
                </div>
              </div>

              <div className="supporterWrapper">
                <div className="supporterTitle">All supporters</div>

                <div className="supporters">
                  {selectedPopupStore?.orders?.map((order, index) => (
                    <div className="supporter" key={index}>
                      <div className="left">
                        {" "}
                        <span>{index + 1}</span> <b>{order?.customer?.Name}</b>{" "}
                      </div>
                      <div className="right">${order?._totalOrderValue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default PopupStore;
