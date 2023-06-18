import React, { Component } from "react";
import { useSelector } from "react-redux";
import ProductImage from "../../../../const/products-images";
import CartUtils from "../../cart-utils";
import CartProductView from "../cart-product-view/cart-product-view";

const CartProductsView = () => {
  const { selectedProducts } = useSelector((state) => state.cart);
  const totalCost = CartUtils.calculateCartTotal({
    withDelivery: false,
  });
  return (
    <>
      <div className={"inner-content cart-listing step1 show"}>
        <div className="modal-title">
          <span class="title">Shopping cart</span>
          {/* close button */}
          <div className="close-modal" onClick={CartUtils.hideExpandedCart}>
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5L4.99998 19M5.00001 5L19 19"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {/* /close button */}
        </div>

        <div className="cart-details">
          <div className="total">
            <span>{selectedProducts?.length}</span> items, total value{" "}
            <span>${totalCost}</span>
          </div>
          <span className="removeAll" onClick={CartUtils.removeAllProducts}>
            Remove all
          </span>
        </div>

        <div className="listing">
          {selectedProducts?.map((product) => (
            <CartProductView
              key={product.ProductID}
              productName={product.Product}
              productPrice={product.Price}
              productId={product.ProductID}
              productQuantity={product.quantity}
              isDonation={product.ProductTypeID === 2}
            />
            // <div className="list-item" key={product.ProductID}>
            //   <div className="list-image-wrapper">
            //     <ProductImage productName={product.Product}/>
            //   </div>

            //   <div className="list-details">
            //     <div className="title">{product.Product}</div>
            //     <div className="amount">
            //       ${product.Price} / item
            //     </div>
            //   </div>

            //   <div className="list-qty">
            //     <span
            //       className="decre"
            //       onClick={(e) =>
            //         CartUtils.updateProductQuantity({
            //           productId: product.ProductID,
            //           quantity: product.quantity - 1,
            //         })
            //       }
            //     >
            //       <svg
            //         width="24px"
            //         height="24px"
            //         viewBox="0 0 24 24"
            //         fill="none"
            //         xmlns="http://www.w3.org/2000/svg"
            //       >
            //         <path
            //           d="M4 12H20"
            //           stroke="#000000"
            //           stroke-width="1.5"
            //           stroke-linecap="round"
            //           stroke-linejoin="round"
            //         />
            //       </svg>
            //     </span>
            //     <span className="value">{product.quantity}</span>
            //     <span
            //       className="incre"
            //       onClick={(e) =>
            //         CartUtils.updateProductQuantity({
            //           productId: product.ProductID,
            //           quantity: product.quantity + 1,
            //         })
            //       }
            //     >
            //       <svg
            //         width="24px"
            //         height="24px"
            //         viewBox="0 0 24 24"
            //         fill="none"
            //         xmlns="http://www.w3.org/2000/svg"
            //       >
            //         <path
            //           d="M4 12H20M12 4V20"
            //           stroke="#000000"
            //           stroke-width="1.5"
            //           stroke-linecap="round"
            //           stroke-linejoin="round"
            //         />
            //       </svg>
            //     </span>
            //   </div>

            //   <div className="list-total-amount">
            //     ${product.quantity * (product.Price + product.ShippingCost)}
            //   </div>

            //   <div className="action">
            //     <span
            //       className="remove"
            //       onClick={(e) =>
            //         CartUtils.removeProduct({
            //           productId: product.ProductID,
            //         })
            //       }
            //     >
            //       Remove
            //     </span>
            //   </div>
            // </div>
          ))}
        </div>

        <div className="modal-buttons text-right">
          <span className="button" onClick={CartUtils.showCartAddressForm}>
            Next
          </span>
        </div>
      </div>
    </>
  );
};

export default CartProductsView;
