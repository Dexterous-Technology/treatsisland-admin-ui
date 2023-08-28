import React, { Component, useEffect, useRef, useState } from "react";
import "./sales-info-modal.scss";
import { EventEmitter } from "../../../../utils/event-emitter";
import moment from "moment";
import Standard from "../../../../const/standards";
import { useReactToPrint } from "react-to-print";
import CustomerViewer from "./components/customer-viewer/customer-viewer";
import { CSVLink, CSVDownload } from "react-csv";

const SalesModalContent = React.forwardRef(
  ({ selectedEvent, print, hideSalesInfoModal }, ref) => {
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [csvData, setCsvData] = useState([]);

    const _prepareCsvData = () => {
      let csvData = [];
      // Example data structure
      // const csvData = [
      //   ["firstname", "lastname", "email"],
      //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
      //   ["Raed", "Labes", "rl@smthing.co.com"],
      //   ["Yezzi", "Min l3b", "ymin@cocococo.com"]
      // ];
      csvData.push([
        "Supporter name",
        "Purchase date",
        "Items purchased",
        "Candy price",
        "Shipping fee",
        "Stripe fee",
        "Total amount",
        "Ship station order ID",
        "Ship Verified",
        "Due Organizer",
        "Due Treats",
      ]);
      selectedEvent?.orders.forEach((order) => {
        let orderItems = "";
        order?.orderItems.forEach((orderItem) => {
          orderItems += `${orderItem?.product?.Product} x ${orderItem?.Quantity} \n`;
        });
        csvData.push([
          order?.customer?.Name,
          moment(parseInt(order?.customer?.CreatedOn)).format(
            Standard.dateTimeFormat
          ),
          orderItems,
          order?._totalOrderValue || 0,
          order?.DeliveryCost || 0,
          order?.PaymentGatewayCharges || 0,
          // Round off to 2 decimal places
          Math.round(parseFloat(parseFloat(order?.totalSales) || 0) * 100) /
            100,
          order?.OrderID || "N/A",
          "",
          // Round off to 2 decimal places
          Math.round(parseFloat(parseFloat(order?.ownerEarnings) || 0) * 100) /
            100,
          // Round off to 2 decimal places
          Math.round(
            parseFloat(parseFloat(order?.platformEarnings) || 0) * 100
          ) / 100,
        ]);
      });
      setCsvData(csvData);
    };

    useEffect(() => {
      _prepareCsvData();
    }, [selectedEvent]);

    const _onPrint = () => {
      setIsPrinting(true);
      setTimeout(() => {
        print();
      }, 2000);
      setTimeout(() => {
        setIsPrinting(false);
      }, 5000);
    };
    return (
      <div className="popupSalesWrapper">
        <div className="popupInner" ref={ref}>
          <div className="popupHeader">
            <div className="left">
              All sales for "{selectedEvent?.EventName}" event
            </div>

            <div className="right">
              <i className="fa fa-times" onClick={hideSalesInfoModal} />
            </div>
          </div>

          <div className="buttons text-right">
            <div className="btn mr-3">
              <CSVLink
                data={csvData}
                filename={`sales-${selectedEvent?.EventName}-${moment().format(
                  Standard.dateTimeFormat
                )}.csv`}
              >
                Download CSV
              </CSVLink>
            </div>

            <div className="btn btn-primary" onClick={_onPrint}>
              Print list
            </div>
          </div>

          <div className="tableInnerWrapper">
            <div class="table-responsive">
              <table class="table">
                <col width="40px" />
                <col width="350px" />
                <col width="200px" />
                <col width="20%" />
                <col width="200px" />
                <col width="200px" />
                <col width="200px" />
                <col width="200px" />
                <col width="200px" />
                <col width="200px" />

                <col width="300px" />

                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      {" "}
                      #{" "}
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-left"
                    >
                      <div className="innerWrapper d-flex align-center">
                        Supporter name
                        <div className="tableSort ml-1 d-grid">
                          {/* <i className="fa fa-chevron-up"></i>
                          <i className="fa fa-chevron-down"></i> */}
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="small font-weight-bold">
                      <div className="innerWrapper d-flex align-center justify-content-center">
                        Purchase date
                        <div className="tableSort ml-1 d-grid">
                          {/* <i className="fa fa-chevron-up"></i>
                          <i className="fa fa-chevron-down"></i> */}
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      <div className="innerWrapper d-flex align-center justify-content-flex-start">
                        Items purchased
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      <div className="innerWrapper d-flex align-center justify-content-center">
                        Candy price
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      <div className="innerWrapper d-flex align-center justify-content-center">
                        Shipping fee
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      <div className="innerWrapper d-flex align-center justify-content-center">
                        Stripe fee
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      <div className="innerWrapper d-flex align-center justify-content-center">
                        Total amount
                        <div className="tableSort ml-1 d-grid">
                          {/* <i className="fa fa-chevron-up"></i>
                          <i className="fa fa-chevron-down"></i> */}
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      <div className="innerWrapper d-flex align-center justify-content-center">
                        Amount owned to organizer
                        <div className="tableSort ml-1 d-grid">
                          {/* <i className="fa fa-chevron-up"></i>
                          <i className="fa fa-chevron-down"></i> */}
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      <div className="innerWrapper d-flex align-center justify-content-center">
                        To Treats Island
                        <div className="tableSort ml-1 d-grid">
                          {/* <i className="fa fa-chevron-up"></i>
                          <i className="fa fa-chevron-down"></i> */}
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="small font-weight-bold text-center"
                    >
                      <div className="innerWrapper d-flex align-center justify-content-center">
                        Ship station order ID
                        {/* <div className="tableSort ml-1 d-grid">
                          <i className="fa fa-chevron-up"></i>
                          <i className="fa fa-chevron-down"></i>
                        </div> */}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {selectedEvent?.orders.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="text-left customerNameWrapper">
                        <CustomerViewer
                          customerName={order?.customer?.Name}
                          email={order?.customer?.Email}
                          phone={order?.customer?.Phone}
                        />
                      </td>
                      <td>
                        {moment(parseInt(order?.customer?.CreatedOn)).format(
                          Standard.dateTimeFormat
                        )}
                      </td>
                      <td>
                        <div className="itemsPurchased">
                          {order?.orderItems.map((orderItem, index) => (
                            <div className="item" key={index}>
                              <div className="image-wrapper">
                                {isPrinting ? (
                                  <></>
                                ) : (
                                  <img
                                    src={
                                      orderItem?.product?.imageLink ||
                                      "https://placehold.co/600x400"
                                    }
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="productName">
                                {orderItem?.product?.Product}
                              </div>
                              <div className="qty">x {orderItem?.Quantity}</div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="totalAmountSmall">
                          $ {order?._totalOrderValue || 0}
                        </div>
                      </td>
                      <td>
                        <div className="totalAmountSmall">
                          $ {order?.DeliveryCost || 0}
                        </div>
                      </td>
                      <td>
                        <div className="totalAmountSmall">
                          $ {order?.PaymentGatewayCharges || 0}
                        </div>
                      </td>
                      <td>
                        <div className="totalAmount">
                          ${" "}
                          {
                            // Round off to 2 decimal places
                            Math.round(
                              parseFloat(parseFloat(order?.totalSales) || 0) *
                                100
                            ) / 100
                          }
                        </div>
                      </td>

                      <td>
                        <div className="totalAmount">
                          ${" "}
                          {
                            // Round off to 2 decimal places
                            Math.round(
                              parseFloat(
                                parseFloat(order?.ownerEarnings) || 0
                              ) * 100
                            ) / 100
                          }
                        </div>
                      </td>

                      <td>
                        <div className="totalAmount">
                          ${" "}
                          {
                            // Round off to 2 decimal places
                            Math.round(
                              parseFloat(
                                parseFloat(order?.platformEarnings) || 0
                              ) * 100
                            ) / 100
                          }
                        </div>
                      </td>

                      <td>
                        <div className="totalAmount">
                          {order?.OrderID || "N/A"}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* demo row */}
                  {/* <tr>
                    <td>demo</td>
                    <td
                      className="text-left customerNameWrapper"
                      onClick={(e) =>
                        setShowCustomerDetails(!showCustomerDetails)
                      }
                    >
                      <span className="customerName">
                        <i className="fa fa-info iconInfo"></i> John doe
                      </span>

                      <div
                        className={
                          "customerDetails " +
                          (showCustomerDetails ? " d-block " : " d-none ")
                        }
                      >
                        <div className="email">
                          <i className="fa fa-envelope"></i> email@address.com
                        </div>
                        <div className="phno">
                          <i className="fa fa-phone"></i> 99999999
                        </div>
                      </div>
                    </td>
                    <td>demo</td>
                    <td>
                      <div className="itemsPurchased">
                        <div className="item">
                          <div className="image-wrapper">
                            <img src="https://placehold.co/600x400" alt="" />
                          </div>
                          <div className="productName">Product name</div>
                          <div className="qty">x 5</div>
                        </div>
                        <div className="item">
                          <div className="image-wrapper">
                            <img src="https://placehold.co/600x400" alt="" />
                          </div>
                          <div className="productName">Product name</div>
                          <div className="qty">x 5</div>
                        </div>
                      </div>
                    </td>
                    <td>$ 990</td>
                    <td>$ 9</td>
                    <td>
                      <div className="totalAmount"> $ 999 </div>
                    </td>
                    <td>demo</td>
                  </tr> */}
                  {/* /demo row */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

/**
 * Listen to event emitter
 * No connection needed to redux store
 */

const SalesInfoModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const _showSalesInfoModal = (data) => {
    setSelectedEvent(data);
    setIsModalVisible(true);
  };

  const _hideSalesInfoModal = () => {
    setIsModalVisible(false);
  };

  const _subscribeToEvents = () => {
    EventEmitter.subscribe("showSalesInfoModal", _showSalesInfoModal);
  };

  const _unsubscribeToEvents = () => {
    EventEmitter.cancelAll("showSalesInfoModal");
  };

  useEffect(() => {
    _subscribeToEvents();
    return () => {
      _unsubscribeToEvents();
    };
  }, []);

  console.log("selectedEvent :>> ", selectedEvent);

  if (!isModalVisible || !selectedEvent) return null; // remove comment
  return (
    <>
      <SalesModalContent
        selectedEvent={selectedEvent}
        print={handlePrint}
        hideSalesInfoModal={_hideSalesInfoModal}
        ref={componentRef}
      />
    </>
  );
};

export default SalesInfoModal;
