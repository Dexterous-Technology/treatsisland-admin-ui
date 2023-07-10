import React, { Component, useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";

const MODAL_VIEWS = {
  ALL_POPUP_STORES: "ALL_POPUP_STORES",
  SINGLE_POPUP_STORE_DETAILS: "SINGLE_POPUP_STORE_DETAILS",
};

const PopupStore = ({
  eventVisiblePopupStore = true,
  popupStoreId = null,
  onPopupStoreModalDismiss = () => {},
}) => {
  const [selectedPopupStore, setSelectedPopupStore] = useState(null);
  const [activeView, setActiveView] = useState(MODAL_VIEWS.ALL_POPUP_STORES);
  const { selectedEvent, selectedPopUp, isPopupStoreModalVisible } =
    useSelector((state) => state.adminStore);

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
                      <div className="amount"> $50 raised of $150 </div>
                      <div className="progressWrapper">
                        <span
                          className="progressMade"
                          style={{ width: "30%" }}
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
                <img src="https://picsum.photos/id/33/1200/300" alt="" />
              </div>

              <div className="intro">
                <div className="image-wrapper icon">
                  <img src="https://picsum.photos/id/237/200/300" alt="" />
                </div>

                <div className="storeName">{selectedPopupStore?.PopupName}</div>
                <div className="storeDesc">{selectedPopupStore?.PopupDesc}</div>

                <div className="totalSales">Total sales: $50</div>

                <div className="amountRaised">
                  <div className="amount">
                    {" "}
                    <span>$50 raised</span> <span>of $150</span>{" "}
                  </div>
                  <div className="progressWrapper">
                    <span
                      className="progressMade"
                      style={{ width: "30%" }}
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
                      <div className="right">${order?.total}</div>
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
