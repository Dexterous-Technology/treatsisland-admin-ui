import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Dashboard/Topbar";
import "../super-admin-all-events/super-admin-dashboard.scss";

const SuperAdminProductManagement = () => {
    const [modalProductEdit, setModalProductEdit] = useState(false);
    
    
    const ToggleButton = () => {
        const [toggleState, setToggleState] = useState(true);
        return (
            <div className={"activeToggle " + (toggleState ? "on" : "off")} onClick={(e) => setToggleState(!toggleState)}>
                {
                    toggleState ?
                    <>
                        <i className="fas fa-toggle-on"></i>
                        <span>Active</span>
                    </>
                    :
                    <>
                        <i className="fas fa-toggle-off"></i>
                        <span>Deactive</span>
                    </>
                }
            </div>
        );
    }
    
    return (
        <div id="wrapper" className="superAdminDashboardWrapper product-management">
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
                    <div className="item">All events</div>
                    <div className="item active">Product management</div>
                </div>
            </div>
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
                                                        {/* <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div> */}
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
                                            <tr>
                                                <td className="text-center">1</td>
                                                <td className="text-center">
                                                    <div className="innerWrapper d-flex align-center">
                                                        <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                                                    </div>
                                                </td>
                                                <td className="text-left">Chamoy Peach Rings</td>
                                                <td className="text-left"><span className="small">Lorem ipsum dolor sit, amet consectetur adipiscing elit, tristique interdum.</span></td>
                                                <td className="text-center">Candy</td>
                                                <td className="text-center">5th January, 2023</td>
                                                <td className="text-center">$ 20</td>
                                                <td className="text-center">15</td>
                                                <td className="text-center">
                                                    <div className="actionWrapper">
                                                        <div className="editProductButton">
                                                            <div className="btn btn-info btn-sm" onClick={(e) => setModalProductEdit(true)}>Edit</div>
                                                        </div>

                                                        <ToggleButton />
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>




                            {/* **************************************** MODALS - PRODUCT EDIT */}
                            <div className={"modalProductEdit " + (modalProductEdit ? "show" : "")}>
                                <div className="modalTop" onClick={(e) => setModalProductEdit(false)}><i className="fa fa-arrow-left"></i> <span>Go back</span></div>

                                <div className="modalHeader">Edit product</div>


                                <div className="modalContent">
                                    <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <div className="image-wrapper">
                                                <img src="https://picsum.photos/id/237/200/300" alt="" />

                                                <div className="editIcon"><i className="fa fa-edit"></i></div>
                                            </div>
                                        </div>


                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <div className="form-group">
                                                        <label htmlFor="">Product name</label>
                                                        <input type="text" className="form-control" value="Chamoy peach rings" />
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <ToggleButton />
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="">Price ($)</label>
                                                        <input type="text" className="form-control" value="1000" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="">Discount (%)</label>
                                                        <input type="text" className="form-control" value="10" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="">Sale price (calculated)</label>
                                                        <input type="text" className="form-control" value="900" />
                                                    </div>
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="form-check p-0">
                                                        <input type="checkbox" className="mr-2" />
                                                        <label htmlFor="instock">In stock</label>
                                                    </div>
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="">Description</label>
                                                        <textarea name="" id="" rows="5" className="form-control"></textarea>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="buttons text-right">
                                                <div className="btn btn-light mr-3">Cancel</div>
                                                <div className="btn btn-primary">Update</div>
                                            </div>
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

export default SuperAdminProductManagement;