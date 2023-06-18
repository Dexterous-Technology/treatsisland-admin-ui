import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Dashboard/Topbar";
import "./super-admin-dashboard.scss";

const SuperAdminAllEvents = () => {
    const [modalPopupStore, setModalPopupStore] = useState(false);
    const [modalAllPopupStore, setModalAllPopupStore] = useState(true);
    const [modalPopupStoreDetails, setModalPopupStoreDetails] = useState(false);
    const [modalBankInfo, setModalBankInfo] = useState(false);
    
    
    return (
        <div id="wrapper" className="superAdminDashboardWrapper all-events">
            {/* ************************** SIDEBAR */}
            <div className="sidebar">
                <div
                    id="sidemenuClose"
                    className="d-block d-md-none"
                    onClick={(e) => document.body.classList.remove("openAdminSideMenu")}
                >
                    <i className="fa fa-times" />
                </div>

                <div className="logo"><img src={require("../../assets/images/logo.png")} alt="" /></div>

                <div className="menu-items">
                    <div className="item active">All events</div>
                    <div className="item">Product management</div>
                </div>
            </div>
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
                                                        Organizer
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
                                                <td className="text-center"><input type="date" className="form-control" /></td>
                                                <td className="text-center"><input type="text" className="form-control" placeholder="Enter" /></td>
                                                <td className="text-center">
                                                    <b className="m-0">$ 1000</b>
                                                </td>
                                                <td className="text-center">$ 900</td>
                                                <td className="text-center">$ 100</td>
                                                <td className="text-center">
                                                    <div className="popupStoreButton"><div className="btn btn-light btn-sm" onClick={(e) => setModalPopupStore(true)}>View</div></div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="bankInfoButton"><div className="btn btn-light btn-sm" onClick={(e) => setModalBankInfo(true)}>View</div></div>
                                                </td>
                                            </tr>


                                            <tr>
                                                <td className="text-center">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="text-center">2</td>
                                                <td className="text-left">
                                                    <b>John doe's fundraising event</b>
                                                </td>
                                                <td className="text-center">John Doe</td>
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
                                                    <div className="popupStoreButton"><div className="btn btn-light btn-sm" onClick={(e) => setModalPopupStore(true)}>View</div></div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="bankInfoButton"><div className="btn btn-light btn-sm" onClick={(e) => setModalBankInfo(true)}>View</div></div>
                                                </td>
                                            </tr>


                                            <tr>
                                                <td className="text-center">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="text-center">3</td>
                                                <td className="text-left">
                                                    <b>John doe's fundraising event</b>
                                                </td>
                                                <td className="text-center">John Doe</td>
                                                <td className="text-center">5 Jan, 2023</td>
                                                <td className="text-center"><span className="badge badge-success">Active</span></td>
                                                <td className="text-center"><input type="date" className="form-control" /></td>
                                                <td className="text-center"><input type="text" className="form-control" placeholder="Enter" /></td>
                                                <td className="text-center">
                                                    <b className="m-0">$ 1000</b>
                                                </td>
                                                <td className="text-center">$ 900</td>
                                                <td className="text-center">$ 100</td>
                                                <td className="text-center">
                                                    <div className="popupStoreButton"><div className="btn btn-light btn-sm" onClick={(e) => setModalPopupStore(true)}>View</div></div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="bankInfoButton"><div className="btn btn-light btn-sm" onClick={(e) => setModalBankInfo(true)}>View</div></div>
                                                </td>
                                            </tr>


                                            <tr>
                                                <td className="text-center">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="text-center">4</td>
                                                <td className="text-left">
                                                    <b>John doe's fundraising event</b>
                                                </td>
                                                <td className="text-center">John Doe</td>
                                                <td className="text-center">5 Jan, 2023</td>
                                                <td className="text-center"><span className="badge badge-success">Active</span></td>
                                                <td className="text-center"><input type="date" className="form-control" /></td>
                                                <td className="text-center"><input type="text" className="form-control" placeholder="Enter" /></td>
                                                <td className="text-center">
                                                    <b className="m-0">$ 1000</b>
                                                </td>
                                                <td className="text-center">$ 900</td>
                                                <td className="text-center">$ 100</td>
                                                <td className="text-center">
                                                    <div className="popupStoreButton"><div className="btn btn-light btn-sm" onClick={(e) => setModalPopupStore(true)}>View</div></div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="bankInfoButton"><div className="btn btn-light btn-sm" onClick={(e) => setModalBankInfo(true)}>View</div></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>




                            {/* **************************************** MODALS - POPUP STORE */}
                            <div className={"modalPopupStores " + (modalPopupStore ? "show" : "")}>
                                {/* ALL POPUP STORES */}
                                <div className={"allPopupStores " + (modalAllPopupStore ? "d-block" : "d-none")}>
                                    <div className="modalTop" onClick={(e) => setModalPopupStore(false)}><i className="fa fa-arrow-left"></i> <span>Go back</span></div>

                                    <div className="modalHeader">List of active popup stores for John Doe's Fundraising Event (5 stores)</div>


                                    <div className="storeCards">
                                        <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                                            <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                                            <div className="storeDetails">
                                                <div className="storeName">Popup store #1</div>
                                                <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                                                <div className="amountRaised">
                                                    <div className="amount"> $50 raised of $150 </div>
                                                    <div className="progressWrapper">
                                                        <span className="progressMade" style={{width: "30%"}}></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        
                                        <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                                            <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                                            <div className="storeDetails">
                                                <div className="storeName">Popup store #1</div>
                                                <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                                                <div className="amountRaised">
                                                    <div className="amount"> $50 raised of $150 </div>
                                                    <div className="progressWrapper">
                                                        <span className="progressMade" style={{width: "30%"}}></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                                            <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                                            <div className="storeDetails">
                                                <div className="storeName">Popup store #1</div>
                                                <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                                                <div className="amountRaised">
                                                    <div className="amount"> $50 raised of $150 </div>
                                                    <div className="progressWrapper">
                                                        <span className="progressMade" style={{width: "30%"}}></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                                            <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                                            <div className="storeDetails">
                                                <div className="storeName">Popup store #1</div>
                                                <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                                                <div className="amountRaised">
                                                    <div className="amount"> $50 raised of $150 </div>
                                                    <div className="progressWrapper">
                                                        <span className="progressMade" style={{width: "30%"}}></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                                            <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                                            <div className="storeDetails">
                                                <div className="storeName">Popup store #1</div>
                                                <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                                                <div className="amountRaised">
                                                    <div className="amount"> $50 raised of $150 </div>
                                                    <div className="progressWrapper">
                                                        <span className="progressMade" style={{width: "30%"}}></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>





                                {/* SINGLE POPUP STORE DETAILS */}
                                <div className={"popupStoreDetails " + (modalPopupStoreDetails ? "d-block" : "d-none")}>
                                    <div
                                        className="modalTop"
                                        onClick={(e) => {
                                            setModalAllPopupStore(true);
                                            setModalPopupStoreDetails(false);
                                        }}
                                    >
                                        <i className="fa fa-arrow-left"></i> <span>Go back</span>
                                    </div>

                                    <div className="modalHeader">Popup store #1</div>

                                    <div className="innerWrapper">
                                        <div className="image-wrapper cover"><img src="https://picsum.photos/id/33/1200/300" alt="" /></div>

                                        <div className="intro">
                                            <div className="image-wrapper icon"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>

                                            <div className="storeName">Popup store #1</div>
                                            <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                                            <div className="totalSales">Total sales: $50</div>

                                            <div className="amountRaised">
                                                <div className="amount"> <span>$50 raised</span> <span>of $150</span> </div>
                                                <div className="progressWrapper">
                                                    <span className="progressMade" style={{width: "30%"}}></span>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="supporterWrapper">
                                            <div className="supporterTitle">All supporters</div>

                                            <div className="supporters">
                                                <div className="supporter">
                                                    <div className="left"> <span>1</span> <b>John Doe</b> </div>
                                                    <div className="right">$15</div>
                                                </div>
                                                <div className="supporter">
                                                    <div className="left"> <span>2</span> <b>John Doe</b> </div>
                                                    <div className="right">$15</div>
                                                </div>
                                                <div className="supporter">
                                                    <div className="left"> <span>3</span> <b>John Doe</b> </div>
                                                    <div className="right">$15</div>
                                                </div>
                                                <div className="supporter">
                                                    <div className="left"> <span>4</span> <b>John Doe</b> </div>
                                                    <div className="right">$15</div>
                                                </div>
                                                <div className="supporter">
                                                    <div className="left"> <span>5</span> <b>John Doe</b> </div>
                                                    <div className="right">$15</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* **************************************** MODAL - BANK INFO */}
                            <div className={"modalBankInfo " + (modalBankInfo ? "show" : "")}>
                                <div className="innerWrapper">
                                    <div className="modalHeader">
                                        <span>Bank details information</span>
                                        <span className="closeModal" onClick={(e) => setModalBankInfo(false)}><i className="fa fa-times"></i></span>
                                    </div>


                                    <div className="modalContent">
                                        <div className="item">
                                            <span>Bank routing number</span>
                                            <span>:</span>
                                            <span>56987564</span>
                                        </div>
                                        <div className="item">
                                            <span>Bank account number</span>
                                            <span>:</span>
                                            <span>32654569878965</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ************************** /CONTENT */}
                </div>
            </div>
        </div>
    );
}

export default SuperAdminAllEvents;