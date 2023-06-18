import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../../Components/Dashboard/Sidebar";
import Topbar from "../../Components/Dashboard/Topbar";
import CopyToClipboard from "../../core/copy-to-clipboard-button/copy-to-clipboard-button";
import PopupUtils from "../../entities/events/utils/popup-utils";
import PopupMedia from "../../entities/popup-store/components/popup-media/popup-media";
import PopupStoreEditor from "../../entities/popup-store/components/popup-store-editor/popup-store-editor";
import { EventEmitter } from "../../utils/event-emitter";
import "./popup-store-admin-page.scss";
import ShareButton from "../../core/share-button/share-button";
import { useSelector } from "react-redux";

const OrganizationPage = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const history = useHistory();
  const [stats, setStats] = useState({
    recentPurchasers: [],
    currentStoreLeaderBoard: [],
    allStoresLeaderBoard: [],
  });
  const { user } = useSelector((state) => state.user);
  const [popupStore, setPopupStore] = useState(null);
  const params = useParams();
  const _loadPopupStoreData = async () => {
    // const popupStore = await PopupUtils.loadPopupStoreByCode()
    let store = null;
    if (params?.storeId?.length) {
      setIsLoaderActive(true);
      store = await PopupUtils.loadPopupStoreById(params?.storeId);
      console.log("store :>> ", store);
      const popupStoreStats = await PopupUtils.getStatsByPopupCode({
        popupCode: store.PopupCode,
      });
      setStats(popupStoreStats);
      setIsLoaderActive(false);
    }
    if (store.PopupCreatedBy.toString() !== user?.UserID.toString()) {
      Swal.fire({
        icon: "warning",
        title: "You don't have access to view this page",
        text: "",
        timer: 2000,
        timerProgressBar: true,

        // footer: '<a href="">Why do I have this issue?</a>'
      }).then(() => {
        history.push("/all-events");
      });
      return;
    }
    if (store) {
      setPopupStore(store);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Store is not active",
        text: "",
        timer: 2000,
        timerProgressBar: true,

        // footer: '<a href="">Why do I have this issue?</a>'
      }).then(() => {
        history.push("/all-events");
      });
    }
  };

  console.log("popupStore :>> ", popupStore);

  useEffect(() => {
    _loadPopupStoreData();
    EventEmitter.subscribe("REFRESH_POPUP_STORE", () => {
      _loadPopupStoreData();
    });
    return () => {
      EventEmitter.cancelAll("REFRESH_POPUP_STORE");
    };
  }, []);
  console.log("user :>> ", user);

  const images = PopupUtils.generateImages(popupStore);
  return (
    <>
      {isLoaderActive ? (
        <div className="loaderWrapper pageLoader">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}
      {popupStore ? (
        <>
          <div id="page-top" className="manage-popup-store-page">
            <div id="wrapper">
              <Sidebar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <Topbar />
                  <div className="container-fluid">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-block d-md-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Manage Pop-up Store{" "}
                          {/* <CopyToClipboard
                            linkPart={`/popup-store/${popupStore?.PopupCode}`}
                          /> */}
                        </h6>

                        <div className="button d-block d-md-flex justify-content-center align-items-center text-right">
                          <div className="mr-0 mr-md-5 my-3 my-md-0 text-center">
                            <ShareButton
                              popupStore={popupStore}
                              entity={"popup"}
                            />
                          </div>
                          {user?.UserID === parseInt(popupStore?.CreatedBy) ? (
                            <span
                              className="btn btn-sm btn-primary font-weight-bold border-0 text-capitalize"
                              onClick={(e) =>
                                PopupUtils.editPopupStore({
                                  clickEvent: e,
                                  event: popupStore,
                                })
                              }
                            >
                              <i className="fa fa-edit"></i> Edit popup store
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>


                      <div className="card-body">
                        <div className="top">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="box-wrapper">
                                <div className="image-square">
                                  <PopupMedia src={images.iconImage} showControls={false} muteByDefault={true} />
                                </div>
                                <div className="subtitle">
                                  {popupStore.SubTitle || ""}
                                </div>
                                <div className="title">
                                  {popupStore.PopupName || ""}
                                </div>
                                <div className="goal">
                                  <div>
                                    <b>${stats?.currentStore?.goalAchieved}</b>{" "}
                                    sold of <span>{popupStore.PopupGoal}</span>{" "}
                                    goal
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="image-big">
                                <PopupMedia src={images.coverImage} showControls={true} 
                                muteByDefault={false}
                                position={{
                                  top: '1rem',
                                  right: '20px'
                                }}/>
                              </div>
                              <div class="description">
                                <p>{popupStore.PopupDesc || ""}</p>
                                <p>
                                  50% of each purchase benefits this fundraiser.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="leaderboard">
                              <div className="title">Leaderboard</div>
                              <div className="items">
                                {stats.currentStoreLeaderBoard.map(
                                  (customer, customerIndex) => (
                                    <div className="item" key={customerIndex}>
                                      <div className="left">
                                        <span className="slno small mr-2">
                                          {customerIndex + 1}
                                        </span>
                                        <div className="image-wrapper">
                                          <img
                                            src={`https://i.pravatar.cc/300/img=${customer.sum}`}
                                            alt=""
                                          />
                                        </div>
                                        <div className="name">
                                          {customer.customerName}
                                        </div>
                                      </div>
                                      <div className="amount">
                                        ${customer.sum}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="supporters">
                              <div className="title">Recent supporters</div>
                              <div className="items">
                                {stats.recentPurchasers.map(
                                  (customer, customerIndex) => (
                                    <div className="item" key={customerIndex}>
                                      <div className="left">
                                        <div className="image-wrapper">
                                          <img
                                            src={`https://i.pravatar.cc/300/img=${customer.sum}`}
                                            alt=""
                                          />
                                        </div>
                                        <div className="name">
                                          {customer.customerName}
                                        </div>
                                      </div>
                                      <div className="amount">
                                        ${customer.sum}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              {/* <span className="seeall">See all</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
              <i className="fas fa-angle-up" />
            </a>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrganizationPage;
