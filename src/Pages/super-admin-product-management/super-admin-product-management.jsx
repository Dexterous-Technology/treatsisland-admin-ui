import React from "react";
import Topbar from "../../Components/Dashboard/Topbar";
import Sidebar from "../../Components/SuperDashboard/Sidebar";
import "../super-admin-all-events/super-admin-dashboard.scss";

import ListingAllProduct from "../../entities/product-management/components/all-product/all-product";
import ProductEditor from "../../entities/product-management/components/product-editor/product-editor";
import ProductUtils from "../../entities/product-management/product-utils";
import { useSelector } from "react-redux";
const SuperAdminProductManagement = () => {
  const { productSotringOptions } = useSelector((state) => state.adminStore);
  const {sortBy, sortOrder} = productSotringOptions
  const _addProduct = () => {
    ProductUtils.showProductEditorToAdd();
  };

  const _applySort = (sortBy, sortOrder)=>{
    ProductUtils.applySort({sortBy, sortOrder})
  }

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
              <div className="titleBar">
                <div className="leftSide">
                  <div className="pageTitle">Product management</div>
                </div>
                <div className="rightSide">
                  <button onClick={_addProduct}>
                    <i className="fa fa-plus"></i> Add new product
                  </button>
                </div>
              </div>

              <div className="innerWrapper">
                <div className="table-responsive">
                  <table className="table">
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
                          <div className="innerWrapper d-flex align-center"></div>
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-left"
                        >
                          <div className="innerWrapper d-flex align-center">
                            Product name
                            <div className="tableSort ml-1 d-grid">
                              <i onClick={()=>_applySort('Product', 'asc')} className={sortBy==='Product' && sortOrder==='asc'? "fa fa-chevron-up active-sort":"fa fa-chevron-up"} ></i>
                              <i onClick={()=>_applySort('Product', 'desc')} className={sortBy==='Product' && sortOrder==='desc'? "fa fa-chevron-down active-sort": "fa fa-chevron-down"}></i>
                            </div>
                          </div>
                        </th>
                        <th scope="col" className="small font-weight-bold">
                          <div className="innerWrapper d-flex align-center">
                            Description
                            <div className="tableSort ml-1 d-grid">
                              <i onClick={()=>_applySort('Description', 'asc')} className={sortBy==='Description' && sortOrder==='asc'? "fa fa-chevron-up active-sort":"fa fa-chevron-up"} ></i>
                              <i onClick={()=>_applySort('Description', 'desc')} className={sortBy==='Description' && sortOrder==='desc'? "fa fa-chevron-down active-sort": "fa fa-chevron-down"}></i>
                            </div>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="small font-weight-bold text-center"
                        >
                          <div className="innerWrapper d-flex align-center justify-content-center">
                            Category
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
                            Creation date
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
                            Price
                            <div className="tableSort ml-1 d-grid">
                            <i onClick={()=>_applySort('Price', 'asc')} className={sortBy==='Price' && sortOrder==='asc'? "fa fa-chevron-up active-sort":"fa fa-chevron-up"} ></i>
                              <i onClick={()=>_applySort('Price', 'desc')} className={sortBy==='Price' && sortOrder==='desc'? "fa fa-chevron-down active-sort": "fa fa-chevron-down"}></i>
                            </div>
                          </div>
                        </th>
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
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <ListingAllProduct />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* **************************************** MODALS - PRODUCT EDIT */}
              <ProductEditor />
            </div>
          </div>
          {/* ************************** /CONTENT */}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProductManagement;
