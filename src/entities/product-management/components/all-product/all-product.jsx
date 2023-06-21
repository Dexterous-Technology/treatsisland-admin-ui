import React, { Component, useEffect, useState } from "react";
import PopupStore from "../popup-store/popup-store";
import "./all-product.scss";

const ListingAllProduct = ({ 
  onDismiss = () => {},
  }) => {
    const [modalProductEdit, setModalProductEdit] = useState(true);
    const [productId, setproductId] = useState(5);

    const _productEditModal = () => {
      onDismiss({
        productId,
        modalProductEdit        
      });
    };


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

    }, []);

  return (
    <>
      
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
                      <div className="btn btn-info btn-sm" onClick={(e) => _productEditModal()}>Edit</div>
                  </div>

                  <ToggleButton />
              </div>
          </td>
      </tr>
    </>
  );
};

export default ListingAllProduct;
