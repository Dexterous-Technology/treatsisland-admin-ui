import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ApiCalls from "../../api";
import PopupUtils from "../../entities/events/utils/popup-utils";
import PopupMedia from "../../entities/popup-store/components/popup-media/popup-media";
import CartUtils from "../../features/cart/cart-utils";
import ManageCartFloatingSection from "../../features/cart/components/manage-cart-floating-section/manage-cart-floating-section";
import PopupStoreProduct from "../../features/popup-store/popup-store-product/popup-store-product";
import "./popup-store-page.scss";

const PopupStorePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [stats, setStats] = useState({
    recentPurchasers: [],
    currentStoreLeaderBoard: [],
    allStoresLeaderBoard: [],
  });
  const { selectedProducts } = useSelector((state) => state.cart);
  const history = useHistory();

  const [popupStore, setPopupStore] = useState(null);
  const params = useParams();
  const _placeDonateAtTop = (allProducts) => {
    const copyOfAllProducts = [...allProducts];
    const donateProductIndex = copyOfAllProducts.findIndex(
      (product) => product.ProductTypeID === 2
    );
    if (donateProductIndex > -1) {
      const donateProduct = copyOfAllProducts[donateProductIndex];
      copyOfAllProducts.splice(donateProductIndex, 1);
      copyOfAllProducts.push(donateProduct);
      // copyOfAllProducts.splice(0, 0, donateProduct);
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
        const formattedProducts = _placeDonateAtTop(allProducts);
        setProducts(formattedProducts);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const _loadPopupStoreData = async () => {
    const popupStoreStats = await PopupUtils.getStatsByPopupCode({
      popupCode: params?.storeId,
    });
    setStats(popupStoreStats);
    // console.log("popupStoreStats :>> ", popupStoreStats);
    let store = null;
    if (params?.storeId?.length) {
      setIsLoaderActive(true);
      store = await PopupUtils.loadPopupStoreByCode(params?.storeId);
      setIsLoaderActive(false);
    }
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
  };

  useEffect(() => {
    _loadProducts();
    _loadPopupStoreData();
  }, []);

  const _formatProducts = () => {
    const idMappedSelectedProducts = {};
    selectedProducts.forEach((product) => {
      idMappedSelectedProducts[product.ProductID] = product.quantity;
    });
    return products.map((product) => ({
      ...product,
      _isSelected: !!idMappedSelectedProducts[product.ProductID],
      _qauntity: idMappedSelectedProducts[product.ProductID],
      _isDonation: product.ProductTypeID === 2,
    }));
  };

  const images = PopupUtils.generateImages(popupStore);
  const formattedProducts = _formatProducts();

  console.log("formattedProducts", formattedProducts);
  // console.log(
  //   "stats.currentStoreLeaderBoard :>> ",
  //   stats.currentStoreLeaderBoard
  // );

  const _checkIfActiveEvent = () => {
    let _isActive = false;
    if (popupStore && popupStore.StartDate) {
      const startDateTimeStamp = +moment(
        parseInt(popupStore.StartDate)
      ).toDate();
      const endDateTimeStamp = +moment(parseInt(popupStore.StartDate))
        .add(5, "days")
        .toDate();
      const currentDateTimeStamp = +moment().toDate();
      if (
        currentDateTimeStamp > startDateTimeStamp &&
        currentDateTimeStamp < endDateTimeStamp
      ) {
        _isActive = true;
      }
    }
    return _isActive;
  };

  const isActive = _checkIfActiveEvent();

  return (
    <div className="popup-store-page-wrapper">
      {isLoaderActive ? (
        <div className="loaderWrapper pageLoader">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}

      {popupStore ? (
        <>
          <Header />

          {/************************************** CART */}
          <ManageCartFloatingSection />
          {/************************************** /CART */}

          <div className="popup-store-page">
            <div className="cover-image">
              <PopupMedia 
                src={images.coverImage} 
                showControls={true} 
                                muteByDefault={false}
                                position={{
                                  top: '30%',
                                  right: '20px'
                                }}
              />
            </div>

            <div className="container">
              {/****************************** STORE TOP */}
              <div className="store-top">
                <div className="logo-image">
                  <PopupMedia src={images.iconImage} muteByDefault={true} />
                </div>

                <div className="subtitle">{popupStore.SubTitle || ""}</div>
                <div className="title">{popupStore.PopupName || ""}</div>
                <div className="description text-center">
                  <p>{popupStore.PopupDesc || ""}</p>
                  <p>50% of each purchase benefits this fundraiser.</p>
                </div>

                <div className="fundraise-section">
                  <div className="inner">
                    <div className="left">
                      <span>${stats?.currentStore?.goalAchieved}</span> sold of
                      ${popupStore.PopupGoal} goal
                    </div>
                    {stats?.recentPurchasers?.length ? (
                      <div className="right">
                        {stats.recentPurchasers.length} supporter
                        {stats.recentPurchasers.length > 1 ? "s" : ""}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="fund-track">
                    <span
                      className="fund-track-complete"
                      style={{
                        "--complete-percent": `${
                          (stats?.currentStore?.goalAchieved * 100) /
                            popupStore?.PopupGoal <
                          100
                            ? (stats?.currentStore?.goalAchieved * 100) /
                              popupStore?.PopupGoal
                            : 100
                        }%`,
                      }}
                    ></span>
                  </div>
                </div>
              </div>
              {/****************************** /STORE TOP */}

              {/****************************** STORE PRODUCTS */}
              <div className="store-bottom">
                {/* <div className="container"> */}
                <div className="row">
                  <div className="col-md-4">
                    <div className="about">
                      {/* <div className="title">About</div> */}
                    </div>

                    <div className="leaderboard">
                      <div className="title">Leaderboard</div>
                      {stats.currentStoreLeaderBoard.map(
                        (customer, customerIndex) => (
                          <div className="item" key={customerIndex}>
                            <div className="left">
                              <span className="slno small mr-2">
                                {customerIndex + 1}
                              </span>
                              {/* <div className="image-wrapper">
                                <img
                                  src={`https://i.pravatar.cc/300/img=${customer.sum}`}
                                  alt=""
                                />
                              </div> */}
                              <div className="name">
                                {customer.customerName}
                                {customer.purchaseNote?.length ? (
                                  <>
                                    <div
                                      className="customNote"
                                      data-note={customer.purchaseNote}
                                    >
                                      <i className="far fa-message"></i>
                                      <span>{customer.purchaseNote}</span>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className="amount">${customer.sum}</div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="leaderboard">
                      <div className="title">Recent supporters</div>
                      {stats.recentPurchasers.map((customer, customerIndex) => (
                        <div className="item" key={customerIndex}>
                          <div className="left">
                            <span className="slno small mr-2">1</span>
                            {/* <div className="image-wrapper">
                              <img
                                src={`https://i.pravatar.cc/300/img=${customer.sum}`}
                                alt=""
                              />
                            </div> */}
                            <div className="name">
                              {customer.customerName}
                              {customer.purchaseNote?.length ? (
                                <>
                                  <div
                                    className="customNote"
                                    data-note={customer.purchaseNote}
                                  >
                                    <i className="far fa-message"></i>
                                    <span>{customer.purchaseNote}</span>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="amount">${customer.sum}</div>
                        </div>
                      ))}
                    </div>
                    <div className="leaderboard">
                      <div className="title">Event leader boards</div>
                      {stats.allStoresLeaderBoard.map((store, storeIndex) => (
                        <div className="item" key={storeIndex}>
                          <div className="left">
                            <span className="slno small mr-2">
                              {storeIndex + 1}
                            </span>
                            {/* <div className="image-wrapper">
                              <img
                                src={`https://picsum.photos/300?img=${store.sum}`}
                                alt=""
                              />
                            </div> */}
                            <div className="name"> {store.PopupName} </div>
                          </div>
                          <div className="amount">${store.sum}</div>
                        </div>
                      ))}

                      {/* <div className="item">
                        <div className="left">
                          <span className="slno small mr-2">
                            2
                          </span>
                          <div className="image-wrapper">
                            <img
                              src={`https://picsum.photos/300`}
                              alt=""
                            />
                          </div>
                          <div className="name">
                            John doe

                            <div className="customNote" data-note="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente officia praesentium, odio modi incidunt ducimus assumenda molestiae nulla quia rem quasi repellat tempore, reiciendis, eum provident accusamus fugiat voluptates ex.">
                              <i className="far fa-message"></i>
                              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente officia praesentium, odio modi incidunt ducimus assumenda molestiae nulla quia rem quasi repellat tempore, reiciendis, eum provident accusamus fugiat voluptates ex.</span>
                            </div>
                          </div>
                        </div>
                        <div className="amount">$6500</div>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="right">
                      <div className="title">Shop now</div>

                      <div className="products">
                        {/* <div className="product donateProduct">
                          <div className="image-wrapper">
                            <img
                              src={require("../../assets/images/donate.png")}
                              alt=""
                            />
                          </div>
                          <div className="name">Donate</div>
                          <div className="price">$20</div>
                          <div className="desc">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Soluta aliquam vel incidunt tempora suscip
                          </div>
                          <div className="actionWrapper">
                            <button className="addToCartBtn">
                              Add to cart
                            </button>
                          </div>
                        </div> */}

                        {formattedProducts?.map((product) => (
                          <PopupStoreProduct
                            productName={product.Product}
                            productDesc={product.Description}
                            productPrice={product.Price}
                            key={product.ProductID}
                            productQuantity={product._qauntity}
                            onAdd={() => {
                              if (isActive) {
                                CartUtils.addProduct({
                                  product,
                                  popupStore,
                                });
                              } else {
                                toast.error("Store is not active!");
                              }
                            }}
                            onDelete={() => {
                              CartUtils.removeProduct({
                                productId: product.ProductID,
                              });
                            }}
                            isDonation={product._isDonation}
                            isPremiumStore={false}
                            isSelected={product._isSelected}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
              {/****************************** /STORE PRODUCTS */}
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PopupStorePage;
