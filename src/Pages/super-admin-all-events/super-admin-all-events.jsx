import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Dashboard/Topbar";
import Sidebar from "../../Components/SuperDashboard/Sidebar";
import ListingAllEvent from "../../entities/all-events/components/all-event/listing-all-event";
import "./super-admin-dashboard.scss";
import BankInfoPopup from "../../entities/all-events/components/bank-info/bank-info";
import PopupStore from "../../entities/all-events/components/popup-store/popup-store";
import EventUtils from "../../entities/all-events/utils/event-utils";
import SalesInfoModal from "../../entities/all-events/components/sales-info-modal/sales-info-modal";

const SuperAdminAllEvents = () => {
  const [isPopupStoreModalVisible, setIsPopupStoreModalVisible] =
    useState(false);

  const [bankInfoModalOptions, setBankInfoModalOptions] = useState({
    isVisible: false,
    selectedEvent: null,
  });

  const _showBankInfoModal = (event) => {
    setBankInfoModalOptions({
      isVisible: true,
      selectedEvent: event,
    });
  };

  const _hideBankInfoModal = () => {
    setBankInfoModalOptions({
      isVisible: false,
      selectedEvent: null,
    });
  };

  const _showPopupStoreModal = (event) => {
    EventUtils.showEventPopups(event);
  };

  const _showSalesInfoModal = (event) => {
    EventUtils.showSalesInfoModal(event);
  };

  const _loadEvents = () => {
    EventUtils.loadAllEvents();
  };

  useEffect(() => {
    _loadEvents();
  }, []);

  return (
    <div id="wrapper" className="superAdminDashboardWrapper all-events">
      {/* ************************** SIDEBAR */}
      <Sidebar />
      {/* ************************** /SIDEBAR */}

      <div id="content-wrapper">
        <div id="content">
          <Topbar />

          {/* ************************** CONTENT */}
          <div className="container-fluid">
            <div className="contentInnerWrapper">
              <div className="pageTitle">All events</div>

              <div className="innerWrapper">
                <div className="table-responsive">
                  <table className="table">
                    {/* <col width="50px" /> */}
                    <col width="30px" />
                    <col width="348px" />
                    <col width="150px" />
                    <col width="150px" />
                    <col width="100px" />
                    {/* <col width="100px" /> */}
                    {/* <col width="100px" /> */}
                    <col width="100px" />
                    <col width="150px" />
                    <col width="100px" />
                    <col width="60px" />
                    <col width="60px" />

                    <thead>
                      <tr>
                        {/* <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center justify-content-center">
                            Paid
                            <div className="tableSort ml-1 d-grid">
                              <i className="fa fa-chevron-up"></i>
                              <i className="fa fa-chevron-down"></i>
                            </div>
                          </div>
                        </th> */}
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          {" "}
                          #{" "}
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center">
                            Event organizer
                            <div className="tableSort ml-1 d-grid">
                              <i className="fa fa-chevron-up"></i>
                              <i className="fa fa-chevron-down"></i>
                            </div>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center justify-content-center">
                            Event code
                            <div className="tableSort ml-1 d-grid">
                              <i className="fa fa-chevron-up"></i>
                              <i className="fa fa-chevron-down"></i>
                            </div>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center justify-content-center">
                            Created
                            <div className="tableSort ml-1 d-grid">
                              <i className="fa fa-chevron-up"></i>
                              <i className="fa fa-chevron-down"></i>
                            </div>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center justify-content-center">
                            Status
                            <div className="tableSort ml-1 d-grid">
                              <i className="fa fa-chevron-up"></i>
                              <i className="fa fa-chevron-down"></i>
                            </div>
                          </div>
                        </th>
                        {/* <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center justify-content-center">
                            Pay Date
                            <div className="tableSort ml-1 d-grid">
                              <i className="fa fa-chevron-up"></i>
                              <i className="fa fa-chevron-down"></i>
                            </div>
                          </div>
                        </th> */}
                        {/* <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center justify-content-center">
                            Pay Code
                            <div className="tableSort ml-1 d-grid">
                              <i className="fa fa-chevron-up"></i>
                              <i className="fa fa-chevron-down"></i>
                            </div>
                          </div>
                        </th> */}
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center justify-content-center">
                            Total sales
                            <div className="tableSort ml-1 d-grid">
                              <i className="fa fa-chevron-up"></i>
                              <i className="fa fa-chevron-down"></i>
                            </div>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          {" "}
                          Amount owned to organizer{" "}
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          {" "}
                          To Treats Island{" "}
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          {" "}
                          Popup stores{" "}
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          {" "}
                          Bank info{" "}
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          {" "}
                          Sales{" "}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <ListingAllEvent
                        onClickBankInfo={_showBankInfoModal}
                        onClickAllPopupStore={_showPopupStoreModal}
                        onSalesInfoClick={_showSalesInfoModal}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
              <SalesInfoModal />

              {/* **************************************** MODALS - POPUP STORE */}
              <PopupStore />

              {/* **************************************** MODAL - BANK INFO */}
              <BankInfoPopup
                isVisible={bankInfoModalOptions.isVisible}
                onModalDismiss={_hideBankInfoModal}
                selectedEvent={bankInfoModalOptions.selectedEvent}
              />
            </div>
          </div>
          {/* ************************** /CONTENT */}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAllEvents;
