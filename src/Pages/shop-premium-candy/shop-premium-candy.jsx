import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ApiCalls from "../../api";
import ProductImage from "../../const/products-images";
import PopupUtils from "../../entities/events/utils/popup-utils";
import CartUtils from "../../features/cart/cart-utils";
import ManageCartFloatingSection from "../../features/cart/components/manage-cart-floating-section/manage-cart-floating-section";
import "./shop-premium-candy.scss";
import { useSelector } from "react-redux";

const ShopPremiumCandy = () => {
  const [products, setProducts] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [popupStore, setPopupStore] = useState(null);
  const history = useHistory();
  const { selectedProducts } = useSelector((state) => state.cart);
  const _removeDonate = (allProducts) => {
    const copyOfAllProducts = [...allProducts];
    const donateProductIndex = copyOfAllProducts.findIndex(
      (product) => product.ProductTypeID === 2
    );
    if (donateProductIndex > -1) {
      const donateProduct = copyOfAllProducts[donateProductIndex];
      copyOfAllProducts.splice(donateProductIndex, 1);
    }
    return copyOfAllProducts;
  };

  const _loadProducts = async () => {
    try {
      const {
        data: {
          data: { allProducts },
        },
      } = await ApiCalls.product.public.getAllProducts();
      if (allProducts) {
        const formattedProducts = _removeDonate(allProducts);
        setProducts(formattedProducts);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const _loadPopupStoreData = async () => {
    setIsLoaderActive(true);
    _loadProducts();
    const store = await PopupUtils.loadPopupStoreByCode(
      process.env.REACT_APP_PREMIUM_CANDY_STORE_CODE
    );
    if (store) {
      // console.log('store :>> ', store);
      setPopupStore(store);
      CartUtils.setPopupStore(store);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Store is not active",
        text: "",
        timer: 2000,
        timerProgressBar: true,

        // footer: '<a href="">Why do I have this issue?</a>'
      }).then(() => {
        history.push("/home");
      });
    }
    setIsLoaderActive(false);
  };

  useEffect(() => {
    // window.addEventListener("scroll", () => {
    //   setScroll(window.scrollY > 50);
    // });
    _loadPopupStoreData();
  }, []);

  const ProductDesc = (props) => {
    const [prodDescExpand, setProdDescExpand] = useState(false);
    const canHide = props?.desc?.length > 90;
    console.log('canHide :>> ', canHide);
    return (
      <div
        className={"desc " + (prodDescExpand ? "expanded " : "") + (canHide? "canHide": "")}
        onClick={(e) => setProdDescExpand(!prodDescExpand)}
      >
        <span>{props.desc || ""}</span>
      </div>
    );
  };

  const _formatProducts = () => {
    const idMappedSelectedProducts = {};
    selectedProducts.forEach((product) => {
      idMappedSelectedProducts[product.ProductID] = product.quantity;
    });
    console.log("idMappedSelectedProducts", idMappedSelectedProducts);
    return products.map((product) => ({
      ...product,
      _isSelected: !!idMappedSelectedProducts[product.ProductID],
      _qauntity: idMappedSelectedProducts[product.ProductID],
    }));
  };

  const formattedProducts = _formatProducts();

  return (
    <div className="shop-premium-candy-page-wrapper">
      {isLoaderActive ? (
        <div className="loaderWrapper pageLoader">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}
      <Header />

      {/************************************** CART */}
      <ManageCartFloatingSection />
      {/************************************** /CART */}

      <div className="shop-premium-candy-page">
        <div className="container">
          {/****************************** STORE PRODUCTS */}
          <div className="store-bottom">
            <div className="title">
              <div className="left">Shop Premium Candy!</div>
              <div className="right">
                {/* <div className="search">
                  <span className="fa fa-search"></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div> */}
              </div>
            </div>

            <div className="products">
              {formattedProducts?.map((product) => (
                <div className="product">
                  <div className="image-wrapper">
                    <ProductImage productName={product.Product} />
                  </div>
                  <div className="name">{product.Product}</div>
                  <div className="price"> ${product.Price} </div>
                  <ProductDesc desc={product.Description} />
                  <div className="actionWrapper">
                    <button
                      className="addToCartBtn"
                      onClick={(e) => {
                        CartUtils.addProduct({
                          product,
                          popupStore,
                        });
                      }}
                    >
                      {!product._isSelected
                        ? `Add to cart`
                        : `Added (${product._qauntity})`}
                    </button>
                    {product._isSelected ? (
                      <button
                        className="addToCartBtn"
                        onClick={(e) => {
                          CartUtils.removeProduct({
                            productId: product.ProductID,
                          });
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/****************************** /STORE PRODUCTS */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPremiumCandy;
