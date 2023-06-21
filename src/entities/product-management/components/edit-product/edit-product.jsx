import React, { Component, useEffect, useState } from "react";
const EditProductPopup = ({
  modalProductEdit = true,
  productId = null,
  onDismiss = () => {},
}) => {

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
    };

  useEffect(() => {
  }, [modalProductEdit])

  return (
    <>
        <div className={"modalProductEdit " + (modalProductEdit ? "show" : "")}>
          <div className="modalTop" onClick={onDismiss}><i className="fa fa-arrow-left"></i> <span>Go back</span></div>

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
                          <div className="btn btn-light mr-3"  onClick={onDismiss}>Cancel</div>
                          <div className="btn btn-primary">Update</div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </>
  );
};

export default EditProductPopup;
