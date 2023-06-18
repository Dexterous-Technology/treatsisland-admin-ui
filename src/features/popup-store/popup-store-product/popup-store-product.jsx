import React, { Component, useState } from "react";
import ProductImage from "../../../const/products-images";

const ProdDesc = (props) => {
  const [prodDescExpand, setProdDescExpand] = useState(false);
  const canHide = props?.desc?.length > 90;
  // console.log('canHide :>> ', canHide);
  return (
    <div
      className={"desc " + (prodDescExpand ? " expanded " : "") + (canHide? " canHide": "")}
      onClick={(e) => setProdDescExpand(!prodDescExpand)}
    >
      <span>{props.desc || ""}</span>
    </div>
  );
};

const PopupStoreProduct = ({
  productName,
  productDesc,
  productPrice,
  productQuantity,
  onAdd,
  onDelete,
  isDonation = false,
  isPremiumStore = false,
  isSelected = false,
}) => {
  return (
    <div className={`product ${isDonation && "donateProduct"}`}>
      <div className="image-wrapper">
        {isDonation ? (
          <img src={require("../../../assets/images/donate.png")} alt="" />
        ) : (
          <ProductImage productName={productName} />
        )}
      </div>
      <div className="name">{productName}</div>
      <div className="price">${productPrice}</div>
      {/* <div className="desc">
                              <span>{product.Description || ""}</span>
                            </div> */}
      <ProdDesc desc={productDesc} />
      <div className="actionWrapper">
        <button className="addToCartBtn" onClick={onAdd}>
          {!isSelected ? `Add to cart` : `Added (${productQuantity})`}
        </button>
        {isSelected ? (
          <button className="addToCartBtn" onClick={onDelete}>
            Remove
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PopupStoreProduct;
