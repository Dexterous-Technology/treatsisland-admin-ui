/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../../Components/Dashboard/Sidebar";
import Topbar from "../../Components/Dashboard/Topbar";
// import PopupStoreEditor from "../../entities/popup-store/components/popup-store-editor/popup-store-editor";
import ApiCalls from "../../api";
import "./event-view-page.scss";
import moment from "moment";
import PopupMedia from "../../entities/popup-store/components/popup-media/popup-media";
import PopupUtils from "../../entities/events/utils/popup-utils";
import EventBankEditor from "../../entities/events/components/event-bank-editor/event-bank-editor";
import Standard from "../../const/standards";
import { useHistory } from "react-router-dom";
import EventPayoutEditor from "../../entities/events/components/event-payout-editor/event-payout-editor";
import ShareButton from "../../core/share-button/share-button";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const EventViewPage = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [event, setEvent] = useState(null);
  const [stores, setStores] = useState([]);
  const [isPayoutModalVisible, setIsPayoutModalVisible] = useState(false);
  const params = useParams();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    _loadEvent();
  }, []);

  const _navigateToPopupStore = (store) => {
    // console.log("store :>> ", store);
    history.push(`/popup-store-admin/${store.popup.EventPopupID}`);
  };

  const _openPublicLink = (store) => {
    history.push(`/popup-store/${store.popup.PopupCode}`);
  };

  const _sumOrders = (store) => {
    let sum = 0;
    store.orders.forEach((order) => {
      sum += order.orderSum;
    });
    return sum;
  };

  const _sortStores = (stores) => {
    const indexOfOwnStore = stores.findIndex(
      (store) => store.popup.PopupCreatedBy == user.UserID
    );
    if (indexOfOwnStore > -1) {
      // const ownStore = stores[indexOfOwnStore];
      stores.unshift(stores.splice(indexOfOwnStore, 1)[0]);
    }
    console.log("stores :>> ", stores);
    return stores;
  };

  const _loadEvent = async () => {
    setIsLoaderActive(true);
    try {
      const { data } = await ApiCalls.event.private.getEventById(
        params.eventId
      );
      console.log("data :>> ", data);
      if (data?.data?.event && data?.data?.event.EventCode?.length) {
        setEvent(data.data.event);
        const stores = data.data.popupStores.map((store) => ({
          ...store,
          images: PopupUtils.generateImages(store.popup),
          totalSale: _sumOrders(store),
        }));
        // Shift own store (If available) to first index
        const sortedStores = _sortStores(stores);
        setStores(sortedStores);
      } else {
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
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
    setIsLoaderActive(false);
  };

  const _updatePayoutDetails = async ({
    bankName,
    bankRoutingNumber,
    bankAccountNumber,
  }) => {
    setIsPayoutModalVisible(false);
    try {
      setIsLoaderActive(true);
      await ApiCalls.event.private.updateBankDetails({
        bankName,
        bankRoutingNumber,
        bankAccountNumber,
        eventId: params.eventId,
      });
      _loadEvent();
    } catch (error) {}
  };

  const _hidePayoutModal = () => {
    setIsPayoutModalVisible(false);
  };

  const _showPayoutModal = () => {
    setIsPayoutModalVisible(true);
  };

  const _calculateTotalEarn = () => {
    let total = 0;
    if (stores?.length) {
      stores.forEach((store) => {
        total += store.totalSale;
      });
    }
    return total;
  };

  const _checkIfHasOwnStore = () => {
    let hasOwnStore = false;
    const createdByMappedStores = {};
    stores.forEach((store) => {
      if (store?.popup?.PopupCreatedBy) {
        createdByMappedStores[store.popup.PopupCreatedBy] = store;
      }
    });
    if (createdByMappedStores[user?.UserID]) {
      hasOwnStore = true;
    }
    return hasOwnStore;
  };

  const totalEarned = _calculateTotalEarn();

  const hasOwnStore = _checkIfHasOwnStore();

  return (
    <>
      {isLoaderActive ? (
        <div className="loaderWrapper pageLoader">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}

      {event ? (
        <div id="page-top" className="event-view-page">
          <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar />

                <div className="container-fluid">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                      <h6 className="m-0 font-weight-bold text-primary">
                        {" "}
                        Event page{" "}
                      </h6>
                      <ShareButton
                        linkPart={`/join-event?je=${event?.EventCode}`}
                        entity="event"
                        event={event}
                        messagePart={`Hello Team - I set up a Treats Island Candy virtual fundraiser! It's 100% contactless. We keep 50% of the profit and the product ships directly to your supporters. Please download the Treats Island Candy app and use the event code to enter our event and open your Candy Pop-up Store. Event link:- `}
                      />
                      {/* <div className="btn btn-primary"><i className="fa fa-edit"></i> Edit event</div> */}
                    </div>

                    <div className="card-body">
                      <div className="row position-relative">
                        <div className="col-lg-6 left">
                          <div className="innerContent">
                            <div className="image-wrapper">
                              <img
                                src={require("../../assets/images/header.jpg")}
                                alt=""
                              />
                            </div>

                            <div className="event-name">
                              {event.EventName}
                              {event.EventMemberTypeID === 1 ? (
                                <EventPayoutEditor event={event} />
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="desc">
                              <div className="item">
                                <span>Start date: </span>{" "}
                                <b>
                                  {moment(parseInt(event.StartDate)).format(
                                    Standard.dateTimeFormat
                                  )}
                                </b>
                              </div>
                              <div className="item">
                                <span>End date: </span>{" "}
                                <b>
                                  {moment(parseInt(event.StartDate))
                                    .add(5, "days")
                                    .format(Standard.dateTimeFormat)}
                                </b>
                              </div>
                              <div className="item">
                                <span>Organization name: </span>{" "}
                                <b>{event.OrganizationName}</b>
                              </div>
                              <div className="item">
                                <span>Type of organization: </span>{" "}
                                <b>{event.OrganizationType}</b>
                              </div>
                              <div className="item">
                                <span>Event coordinator name: </span>{" "}
                                <b>{event.TeamName}</b>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 right">
                          <div className="popupStoreList">
                            <div className="title">
                              <div className="left">
                                Popup Store List ({stores?.length} store
                                {stores?.length > 1 ? "s" : ""})
                              </div>

                              <div className="right">
                                {" "}
                                ${totalEarned} earned{" "}
                              </div>
                            </div>

                            <div className="popupStores">
                              {!hasOwnStore ? (
                                <button
                                  onClick={(e) =>
                                    PopupUtils.createPopupStore({
                                      clickEvent: e,
                                      event,
                                    })
                                  }
                                  className="createStore"
                                >
                                  Create Popup Store
                                </button>
                              ) : (
                                <></>
                              )}
                              {stores?.length ? (
                                <>
                                  {stores?.map((store, storeIndex) => (
                                    <div
                                      className="popupStore"
                                      key={storeIndex}
                                      onClick={(e) => {
                                        if (
                                          store?.popup?.PopupCreatedBy ==
                                            user?.UserID ||
                                          event.EventMemberTypeID === 1
                                        ) {
                                          _navigateToPopupStore(store);
                                        } else {
                                          _openPublicLink(store);
                                        }
                                      }}
                                    >
                                      <div className="coverImage">
                                        <PopupMedia
                                          src={store.images.coverImage}
                                          showControls={true}
                                          position={{
                                            top: "1rem",
                                            right: "20px",
                                          }}
                                          muteByDefault={true}
                                        />
                                      </div>

                                      <div className="details popupListItemDetail">
                                        {store?.popup?.PopupCreatedBy ==
                                        user?.UserID ? (
                                          <div className="ownStoreBadge">
                                            My store
                                          </div>
                                        ) : (
                                          <></>
                                        )}

                                        <div className="image-wrapper">
                                          {/* <img
                                        src="https://picsum.photos/id/237/200/300"
                                        alt=""
                                      /> */}
                                          <PopupMedia
                                            src={store.images.iconImage}
                                          />
                                        </div>

                                        <div className="right">
                                          <div className="store-name">
                                            {store?.popup.PopupName}
                                          </div>

                                          <div className="goalWrapper">
                                            <span className="current">
                                              ${store.totalSale}
                                            </span>
                                            <span className="progressWrap">
                                              <span
                                                className="progressMade"
                                                style={{
                                                  width: `${
                                                    (store.totalSale * 100) /
                                                    store?.popup.PopupGoal
                                                  }%`,
                                                }}
                                              ></span>
                                            </span>
                                            <span className="goal">
                                              ${store?.popup.PopupGoal}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
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
      ) : (
        <></>
      )}
    </>
  );
};

export default EventViewPage;
