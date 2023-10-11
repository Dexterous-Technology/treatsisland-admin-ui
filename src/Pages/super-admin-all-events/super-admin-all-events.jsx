import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Dashboard/Topbar";
import Sidebar from "../../Components/SuperDashboard/Sidebar";
import ListingAllEvent from "../../entities/all-events/components/all-event/listing-all-event";
import "./super-admin-dashboard.scss";
import BankInfoPopup from "../../entities/all-events/components/bank-info/bank-info";
import PopupStore from "../../entities/all-events/components/popup-store/popup-store";
import EventUtils from "../../entities/all-events/utils/event-utils";
import SalesInfoModal from "../../entities/all-events/components/sales-info-modal/sales-info-modal";
import EventStatusbadge from "../../entities/all-events/components/event-status-badge/event-status-badge";

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


  const [moreInfo,  setMoreInfo] = useState(false);

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
                        {/* <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          {" "}
                          Bank info{" "}
                        </th> */}
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




                      {/* ******************************* DEMO DATA FOR TABLE */}
                      <tr>
                        <td className="text-center">99</td>
                        <td className="text-left">
                          <div className="moreInfoToggle" onClick={(e) => setMoreInfo(true)}>
                            <b title="Event name's event">Event name's event</b>
                            <span className="moreInfo" title="More information"><i className="fa fa-info-circle"></i></span>
                          </div>
                        </td>
                        <td className="text-center">kakaka</td>
                        <td className="text-center">5th nov 2023</td>
                        <td className="text-center">
                          <EventStatusbadge
                            status={"active"}
                            formattedStartDate={"5th nov 2023"}
                            formattedEndDate={"10th nov 2023"}
                            // startDate={event.StartDate}
                            // endDate={event.EndDate}
                            eventOrganizer={"EventName"}
                            // event={event}
                          />
                        </td>
                        <td className="text-center"> <b className="m-0">$ 500</b> </td>
                        <td className="text-center">$ 200</td>
                        <td className="text-center">$ 300</td>
                        <td className="text-center">
                          <div className="popupStoreButton">
                            <div
                              className="btn btn-light btn-sm"
                              // onClick={(e) => onClickAllPopupStore(event)}
                            >
                              View
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="bankInfoButton">
                            <div
                              className="btn btn-light btn-sm"
                              // onClick={(e) => onSalesInfoClick(event)}
                            >
                              View
                            </div>
                          </div>
                        </td>
                      </tr>
                      {/* ******************************* /DEMO DATA FOR TABLE */}


                    </tbody>
                  </table>
                  

                  {/* ******************************** MORE INFO MODAL */}
                  <div className={"modalMoreInfo " + (moreInfo ? "show" : "")}>
                    <div className="overlay" onClick={(e) => setMoreInfo(false)}></div>
                    <div className="modalInner">
                      <div className="closeModal">
                        <div className="modalTitle">More info for Event name's event</div>
                        <i className="fa fa-times" onClick={(e) => setMoreInfo(false)}></i>
                      </div>

                      <div className="modalContent">
                        <div className="modalSection">
                          <div className="modalSectionTitle">Contact details</div>
                          <div className="item">
                            <span className="label">Email address:</span>
                            <span className="data">email@address.com</span>
                            <span className="copy"><i className="far fa-copy"></i></span>
                          </div>
                          <div className="item">
                            <span className="label">Cellphone:</span>
                            <span className="data">+9191919191</span>
                            <span className="copy"><i className="far fa-copy"></i></span>
                          </div>
                        </div>


                        <div className="modalSection">
                          <div className="modalSectionTitle">Organisation details</div>
                          <div className="item">
                            <span className="label">Organisation name:</span>
                            <span className="data">John Doe's Organisation</span>
                            <span className="copy"><i className="far fa-copy"></i></span>
                          </div>
                          <div className="item">
                            <span className="label">Type of organisation:</span>
                            <span className="data">type</span>
                            <span className="copy"><i className="far fa-copy"></i></span>
                          </div>
                        </div>


                        <div className="modalSection">
                          <div className="modalSectionTitle">Bank details</div>
                          <div className="item">
                            <span className="label">Full name:</span>
                            <span className="data">John doe</span>
                            <span className="copy"><i className="far fa-copy"></i></span>
                          </div>
                          <div className="item">
                            <span className="label">Bank name:</span>
                            <span className="data">John doe's bank</span>
                            <span className="copy"><i className="far fa-copy"></i></span>
                          </div>
                          <div className="item">
                            <span className="label">Bank account number:</span>
                            <span className="data">123456789</span>
                            <span className="copy"><i className="far fa-copy"></i></span>
                          </div>
                          <div className="item">
                            <span className="label">Bank routing number:</span>
                            <span className="data">545543.1</span>
                            <span className="copy"><i className="far fa-copy"></i></span>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ******************************** /MORE INFO MODAL */}

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
