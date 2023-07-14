import React, { Component, useEffect, useState } from "react";
import BankInfoPopup from "../bank-info/bank-info";
import PopupStore from "../popup-store/popup-store";


const ListingAllEvent = ({ 
  onClickBankInfo = () => {},
  onClickAllPopupStore = () => {},
  }) => {

    const [modalBankInfo, setModalBankInfo] = useState(true);
    const [productId, setproductId] = useState(5);

    const _showPopupToBankInfo = () => {
      onClickBankInfo({
        productId,
        modalBankInfo        
      });
    };




    // const [eventVisiblePopupStore, setEventPopupStore] = useState({
    //     isVisible: false,
    //     selectedEvent: null,
    // });

    const [eventVisiblePopupStore, setEventVisiblePopupStore] = useState(true);
    const [popupStoreId, setPopupStoreId] = useState(5);

    const _showAllPopupStore = () => {
        onClickAllPopupStore({
          eventVisiblePopupStore,
          popupStoreId
        });
    };

    // const _hideAllPopupStore = () => {
    //     setEventPopupStore({
    //       isVisible: false,
    //       selectedEvent: null,
    //     });
    // };


    // const [eventVisibleBankInfoPopup, setEventBankInfoPopup] = useState({
    //     isVisible: false,
    //     selectedEvent: null,
    // });

    // const _showPopupToBankInfo = () => {
    //     setEventBankInfoPopup({
    //       isVisible: true,
    //       selectedEvent: null
    //     });
    // };


    // const _hidePopupBankInfo = (event) => {
    //     setEventBankInfoPopup({
    //       isVisible: false,
    //       selectedEvent: null,
    //     });
    // };





    useEffect(() => {

    }, []);

  
  const [showSelectDateModal, setShowSelectDateModal] = useState(false);
  const [showSelectCodeModal, setShowSelectCodeModal] = useState(false);

  return (
    <>
        <tr>
          <td className="text-center">
              <input type="checkbox" />
          </td>
          <td className="text-center">1</td>
          <td className="text-left">
              <b>John doe's fundraising event</b>
          </td>
          <td className="text-center">John Doe</td>
          <td className="text-center">5 Jan, 2023</td>
          <td className="text-center"><span className="badge badge-secondary">Expired</span></td>
          <td className="text-center payDate">
            <div
              className="btnSelectDate"
              onClick={(e) => setShowSelectDateModal(true)}
            >Select a date</div>

            {/* <div className="btnSelectedDate">
              <span className="date">13/09/2023</span>
              <span className="clear"><i className="fa fa-times"></i></span>
            </div> */}


            { showSelectDateModal ?
              <div className="modalSelectDate">
                <div className="inner">
                  <div className="title">
                    <span>Select a pay date</span>
                    <i className="fa fa-times" onClick={(e) => setShowSelectDateModal(false)}></i>
                  </div>
                  <div className="inputWrapper">
                    <input type="date" className="form-control" />
                    <div className="btn">Save</div>
                  </div>
                </div>
              </div>
              : "" }
          </td>
          <td className="text-center payCode">
            <div
              className="btnSelectCode"
              onClick={(e) => setShowSelectCodeModal(true)}
            >Add code</div>

            {/* <div className="btnSelectedCode">
              <span className="code">65986598</span>
              <span className="clear"><i className="fa fa-times"></i></span>
            </div> */}

            { showSelectCodeModal ?
              <div className="modalSelectCode">
                <div className="inner">
                  <div className="title">
                    <span>Select a pay code</span>
                    <i className="fa fa-times" onClick={(e) => setShowSelectCodeModal(false)}></i>
                  </div>
                  <div className="inputWrapper">
                    <input type="text" className="form-control" placeholder="Enter code here" />
                    <div className="btn">Save</div>
                  </div>
                </div>
              </div>
              : "" }
          </td>
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

        {/* **************************************** MODALS - POPUP STORE */}
        {/*<PopupStore {...eventVisiblePopupStore} onDismiss={_hideAllPopupStore}/>*/}
        
    </>
  );
};

export default ListingAllEvent;
