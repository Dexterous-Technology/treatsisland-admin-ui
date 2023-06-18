import React, { Component } from "react";
import ProductImage from "../../../../const/products-images";
import CartUtils from "../../cart-utils";

const CartProductView = ({
  productName,
  productPrice,
  productId,
  productQuantity,
  isDonation = false,
}) => {
  return (
    <>
      <div className={`list-item ${isDonation && "donate-item"}`}>
        <div className="list-image-wrapper">
          {isDonation ? (
            <img src={require("../../../../assets/images/donate.png")} alt="" />
          ) : (
            <ProductImage productName={productName} />
          )}
        </div>

        <div className="list-details">
          <div className="title">{productName}</div>
          <div className="amount">${productPrice} / item</div>
        </div>

        <div className="list-qty">
          <span
            className="decre"
            onClick={(e) =>
              CartUtils.updateProductQuantity({
                productId: productId,
                quantity: productQuantity - 1,
              })
            }
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H20"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span className="value">{productQuantity}</span>
          <span
            className="incre"
            onClick={(e) =>
              CartUtils.updateProductQuantity({
                productId: productId,
                quantity: productQuantity + 1,
              })
            }
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H20M12 4V20"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="list-total-amount">
          ${productQuantity * productPrice}
        </div>

        <div className="action">
          <span
            className="remove"
            onClick={(e) =>
              CartUtils.removeProduct({
                productId: productId,
              })
            }
          >
            Remove
          </span>
        </div>
      </div>
    </>
  );
};

export default CartProductView;
