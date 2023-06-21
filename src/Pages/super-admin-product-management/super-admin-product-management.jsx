import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Dashboard/Topbar";
import "../super-admin-all-events/super-admin-dashboard.scss";
import Sidebar from "../../Components/SuperDashboard/Sidebar";

import ListingAllProduct from "../../entities/product-management/components/all-product/all-product";
import EditProductPopup from "../../entities/product-management/components/edit-product/edit-product";


const SuperAdminProductManagement = () => {
   
    const [eventVisibleProductEditModel, setEventVisibleProductEditModel] = useState({
        modalProductEdit: false,
        productId: null,
    });

    const _productEditModel = (event) => {
        setEventVisibleProductEditModel({
          modalProductEdit: event.modalProductEdit,
          productId:event.productId
        });
    };

    const onProductEditModelDismiss = (event) => {
        setEventVisibleProductEditModel({
          modalProductEdit: false,
          productId: null,
        });
    };
    

    return (
        <div id="wrapper" className="superAdminDashboardWrapper product-management">
            
            {/* ************************** SIDEBAR */}
            <Sidebar />
            {/* ************************** /SIDEBAR */}


            <div id="content-wrapper">
                <div id="content">
                    <Topbar />

                    {/* ************************** CONTENT */}
                    <div className="container-fluid">
                        <div className="contentInnerWrapper">
                            <div className="pageTitle">Product management</div>

                            <div className="innerWrapper">
                                <div class="table-responsive">
                                    <table class="table">
                                        <col width="40px" />
                                        <col width="40px" />
                                        <col width="320px" />
                                        <col width="320px" />
                                        <col width="200px" />
                                        <col width="200px" />
                                        <col width="200px" />
                                        <col width="200px" />
                                        <col width="200px" />


                                        <thead>

                                            <tr>
                                                <th scope="col" className="small font-weight-bold text-center"> # </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center">
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-left">
                                                    <div className="innerWrapper d-flex align-center">
                                                        Product name
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold">
                                                    <div className="innerWrapper d-flex align-center">
                                                        Description
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Category
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Creation date
                                                        <div className="tableSort ml-1 d-grid">
                                                            <i className="fa fa-chevron-up"></i>
                                                            <i className="fa fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th scope="col" className="small font-weight-bold text-center">
                                                    <div className="innerWrapper d-flex align-center justify-content-center">
                                                        Price
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
                                                <th scope="col" className="small font-weight-bold text-center">Action</th>
                                            </tr>

                                        </thead>


                                        <tbody>
                                            <ListingAllProduct onDismiss={_productEditModel}/>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            {/* **************************************** MODALS - PRODUCT EDIT */}
                            <EditProductPopup {...eventVisibleProductEditModel}  onDismiss={onProductEditModelDismiss}/>

                        </div>
                    </div>
                    {/* ************************** /CONTENT */}
                </div>
            </div>
        </div>
    );
}

export default SuperAdminProductManagement;