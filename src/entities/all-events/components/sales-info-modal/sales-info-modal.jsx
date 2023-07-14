import React, { Component, useEffect, useRef, useState } from "react";
import "./sales-info-modal.scss";
import { EventEmitter } from "../../../../utils/event-emitter";
import moment from "moment";
import Standard from "../../../../const/standards";
import { useReactToPrint } from 'react-to-print';


const SalesModalContent = React.forwardRef(
({ selectedEvent, print, hideSalesInfoModal }, ref) => {
  return (
    <div className="popupSalesWrapper" ref={ref}>
        <div className="popupInner">
          <div className="popupHeader">
            <div className="left">
              All sales for "{selectedEvent?.EventName}" event
            </div>

            <div className="right">
              <i className="fa fa-times" onClick={hideSalesInfoModal} />
            </div>
          </div>

          <div className="buttons text-right">
            <div className="btn btn-primary" onClick={print}>Print list</div>
          </div>

          <div className="tableInnerWrapper">
            <div class="table-responsive">
              <table class="table">
                <col width="40px" />
                <col width="200px" />
                <col width="200px" />
                <col width="40%" />
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
                      <td className="text-left">{order?.customer?.Name}</td>
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
                                <img
                                  src={
                                    orderItem?.product?.imageLink ||
                                    "https://placehold.co/600x400"
                                  }
                                  alt=""
                                />
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
                        <div className="totalAmount">
                          $ {order?._totalOrderValue || 0}
                        </div>
                      </td>
                      <td>{order?.ShipstationOrderId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
});

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

  if (!isModalVisible || !selectedEvent) return null;
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
