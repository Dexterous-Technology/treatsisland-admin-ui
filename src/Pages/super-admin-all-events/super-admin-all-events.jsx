import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Dashboard/Topbar";
import Sidebar from "../../Components/SuperDashboard/Sidebar";
import ListingAllEvent from "../../entities/all-events/components/all-event/listing-all-event";
import "./super-admin-dashboard.scss";
import BankInfoPopup from "../../entities/all-events/components/bank-info/bank-info";
import PopupStore from "../../entities/all-events/components/popup-store/popup-store";

const SuperAdminAllEvents = () => {
    

    const [eventVisibleBankInfoModel, setEventVisibleBankInfoModel] = useState({
        modalBankInfo: false,
        productId: null,
    });
    const _bankInfoModel = (event) => {
        setEventVisibleBankInfoModel({
          modalBankInfo: event.modalBankInfo,
          productId:event.productId
        });
    };

    const _bankInfoModelDismiss = () => {
       setEventVisibleBankInfoModel({
           modalBankInfo: false,
           productId: null,
        });
    };



    const [eventVisiblePopupStoreModel, setEventVisiblePopupStoreModel] = useState({
        eventVisiblePopupStore: false,
        popupStoreId: null,
    });

    const _allPopupStoreModel = (event) => {
        setEventVisiblePopupStoreModel({
          eventVisiblePopupStore: event.eventVisiblePopupStore,
          popupStoreId:event.popupStoreId
        });
    };

    const _popupStoreModelDismiss = (event) => {
       setEventVisiblePopupStoreModel({
           eventVisiblePopupStore: false,
           popupStoreId: null,
        });
    };
    

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
                                <div class="table-responsive">
                                    <table class="table">
                                        <col width="50px" />
                                        <col width="30px" />
                                        <col width="348px" />
                                        <col width="150px" />
                                        <col width="150px" />
                                        <col width="100px" />
                                        <col width="100px" />
                                        <col width="100px" />
                                        <col width="100px" />
                                        <col width="150px" />
                                        <col width="100px" />
                                        <col width="60px" />
                                        <col width="60px" />

                                        <thead>
                                            <tr>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Paid
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center"> # </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center">
                                                        Event name
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Event code
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Created
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Status
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Pay Date
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Pay Code
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Total sales
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center"> Amount owned to organizer </th>
                                                <th scope="col" className="small font-weight-bold text-center"> To Treats Island </th>
                                                <th scope="col" className="small font-weight-bold text-center"> Popup stores </th>
                                                <th scope="col" className="small font-weight-bold text-center"> Bank info </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <ListingAllEvent  onClickBankInfo={_bankInfoModel}  onClickAllPopupStore={_allPopupStoreModel}/>
                                        </tbody>
                                    </table>
                                </div>
                            </div>




                            {/* **************************************** MODALS - POPUP STORE */}
                            <PopupStore {...eventVisiblePopupStoreModel}   onPopupStoreModalDismiss={_popupStoreModelDismiss}/>


                            {/* **************************************** MODAL - BANK INFO */}
                            <BankInfoPopup {...eventVisibleBankInfoModel}   onBankInfoModalDismiss={_bankInfoModelDismiss}/>
                        </div>
                    </div>
                    {/* ************************** /CONTENT */}
                </div>
            </div>
        </div>
    );
}

export default SuperAdminAllEvents;