import React, { Component, useEffect, useState } from "react";
import PopupStore from "../popup-store/popup-store";
import "./all-product.scss";
import { useSelector } from "react-redux";
import ProductUtils from "../../product-utils";
import ToggleButton from "../../../../core/form-elements/toggle-button/toggle-button";

const ListingAllProduct = ({ onDismiss = () => {} }) => {
  const [modalProductEdit, setModalProductEdit] = useState(true);
  const [productId, setproductId] = useState(5);
  const { sortedProducts } = useSelector((state) => state.adminStore);

  const _productEditModal = () => {
    onDismiss({
      productId,
      modalProductEdit,
    });
  };

  const _loadProducts = () => {
    ProductUtils.loadProducts();
  };

  const _editProduct = (product) => {
    ProductUtils.openProductInEditor(product);
  };

  const _handleToggle = ({ isActive = false, productId = 0 }) => {
    ProductUtils.toggleProduct({
      isActive,
      productId,
    });
  };

  useEffect(() => {
    _loadProducts();
  }, []);
  return (
    <>
      {sortedProducts.map((product, index) => (
        <tr key={product.ProductID}>
          <td className="text-center">{index + 1}</td>
          <td className="text-center">
            <div className="innerWrapper d-flex align-center">
              <div className="image-wrapper">
                <img src={product.imageLink} alt="" />
              </div>
            </div>
          </td>
          <td className="text-left">{product.Product}</td>
          <td className="text-left">
            <span className="small">{product.Description}</span>
          </td>
          <td className="text-center">Candy</td>
          <td className="text-center">{}</td>
          <td className="text-center">$ {product.Price}</td>
          <td className="text-center">--</td>
          <td className="text-center">
            <div className="actionWrapper">
              <div className="editProductButton">
                <div
                  className="btn btn-info btn-sm"
                  onClick={(e) => _editProduct(product)}
                >
                  Edit
                </div>
              </div>

              <ToggleButton
                isEnabled={product.isActive}
                onToggle={(isActive) =>
                  _handleToggle({
                    isActive,
                    productId: product.ProductID,
                  })
                }
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ListingAllProduct;
