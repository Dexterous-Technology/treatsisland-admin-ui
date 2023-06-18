import React, { useCallback, useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import ApiCalls from "../../api";
import { useHistory, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import Standard from "../../const/standards";
import "./invoice-page.scss";

const InvoicePage = () => {
  const [order, setOrder] = useState(null);
  const [total, setTotal] = useState(0);
  const params = useParams();
  useEffect(() => {
    _fetchInvoice();
  }, []);

  const _fetchInvoice = async () => {
    const { data } = await ApiCalls.order.public.getOrder(params?.orderId);
    // console.log("data :>> ", data);
    if (data?.data?.products) {
      let sum = 0;
      data?.data?.products.forEach((product) => {
        sum += product.Price * product.Quantity;
      });
      setTotal(sum);
    }
    setOrder(data?.data);
  };

  const _print = useCallback(() => {
    window.print();
  }, [order]);


  return (
    <>
      {order ? (
        <>
          <div className="invoice-wrapper noPrint">
            <Header />

            <div
              className="invoice-inner"
              style={{ width: "80%", margin: "50px auto" }}
            >
              <div className="invoiceHeader d-flex align-items justify-content-between mb-4 pb-2 border-bottom">
                <div className="left h4 text-dark">
                  Invoice #TS-{order.order.OrderID}
                </div>
                <div className="right">
                  <span
                    className="btn btn-secondary btn-sm px-4 noPrint"
                    onClick={_print}
                  >
                    Print
                  </span>
                </div>
              </div>

              <table style={{ width: "100%" }} className="topDetails">
                <tr>
                  <td>
                    <div style={{ margin: "5px 0" }} className="title">
                      <b>{order.order.Name}</b>
                    </div>
                    <div style={{ margin: "5px 0" }} className="address">
                      {order.order.Street} {order.order.State}{" "}
                      {order.order.Zipcode} US
                    </div>
                    {/* <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Phone number:</span> <b>${}</b>{" "}
                    </div> */}
                    <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Email address:</span> <b>{order.order.Email}</b>{" "}
                    </div>
                  </td>

                  <td>
                    <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Invoice no:</span> <b>#TS-{order.order.OrderID}</b>{" "}
                    </div>
                    <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Issue date:</span>{" "}
                      <b>
                        {moment(parseInt(order.order.CreatedOn)).format(
                          Standard.dateFormat
                        )}
                      </b>{" "}
                    </div>
                    {/* <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Shipping date:</span> <b>7th June, 2022</b>{" "}
                    </div> */}
                    <div style={{ margin: "5px 0" }} className="item">
                      <span>Status:</span>
                      <b className="paid ml-2 badge badge-success">Paid</b>
                      {/* <b className="unpaid ml-2 badge badge-danger">Unpaid</b> */}
                    </div>
                  </td>
                </tr>
              </table>

              <div className="purchaseDetails">
                <table style={{ width: "100%", margin: "20px 0" }} >
                  <col width="10%" />
                  <col width="45%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="15%" />

                  <tr>
                    <th
                      style={{
                        backgroundColor: "#ff69b4",
                        color: "#ffffff",
                        padding: "10px",
                      }}
                    >
                      Sr No.
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ff69b4",
                        color: "#ffffff",
                        padding: "10px",
                      }}
                    >
                      Description
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ff69b4",
                        color: "#ffffff",
                        padding: "10px",
                      }}
                    >
                      Quantity
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ff69b4",
                        color: "#ffffff",
                        padding: "10px",
                      }}
                    >
                      Unit Price
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ff69b4",
                        color: "#ffffff",
                        padding: "10px",
                      }}
                    >
                      Amount
                    </th>
                  </tr>
                  {order.products.map((product, productIndex) => (
                    <tr key={product.OrderProductID}>
                      <td
                        style={{
                          padding: "10px",
                          backgroundColor: "#efefef",
                          color: "#000000",
                          borderBottom: "1px solid #dfdfdf",
                        }}
                      >
                        {productIndex + 1}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          backgroundColor: "#efefef",
                          color: "#000000",
                          borderBottom: "1px solid #dfdfdf",
                        }}
                      >
                        {product.Product}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          backgroundColor: "#efefef",
                          color: "#000000",
                          borderBottom: "1px solid #dfdfdf",
                        }}
                      >
                        {product.Quantity}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          backgroundColor: "#efefef",
                          color: "#000000",
                          borderBottom: "1px solid #dfdfdf",
                        }}
                      >
                        ${product.Price}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          backgroundColor: "#efefef",
                          color: "#000000",
                          borderBottom: "1px solid #dfdfdf",
                        }}
                      >
                        ${product.Quantity * product.Price}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>

              <table style={{ width: "100%", margin: "20px 0" }} className="totalDetails">
                <col width="85%" />
                <col width="15%" />
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    Total
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    ${total}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    Shipping cost
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    ${order.order.DeliveryCost}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    Sub total
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    ${parseFloat(total) + parseFloat(order.order.DeliveryCost)}
                  </td>
                </tr>
                <tr>

                  
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      color: "#000000",
                      fontWeight: "bold",
                      borderTop: "1px solid #dfdfdf",
                      fontSize: "20px",
                    }}
                  >
                    Total paid
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      color: "#000000",
                      fontWeight: "bold",
                      borderTop: "1px solid #dfdfdf",
                      fontSize: "20px",
                    }}
                  >
                    ${parseFloat(total) + parseFloat(order.order.DeliveryCost)}
                  </td>
                </tr>
              </table>

              <div style={{ fontSize: "20px", color: "#000000" }}>
                Thank you for your business
              </div>
            </div>


            <div className="noPrint"> <Footer /> </div>
          </div>





          <div className="invoice-wrapper onlyPrint">
            <Header />

            <div
              className="invoice-inner"
              style={{ width: "80%", margin: "50px auto" }}
            >
              <div className="invoiceHeader d-flex align-items justify-content-between mb-4 pb-2 border-bottom">
                <div className="left h4 text-dark">
                  Invoice #TS-{order.order.OrderID}
                </div>
                <div className="right">
                  <span
                    className="btn btn-secondary btn-sm px-4 noPrint"
                    onClick={_print}
                  >
                    Print
                  </span>
                </div>
              </div>

              <table style={{ width: "100%" }} className="topDetails">
                <tr>
                  <td>
                    <div style={{ margin: "5px 0" }} className="title">
                      <b>{order.order.Name}</b>
                    </div>
                    <div style={{ margin: "5px 0" }} className="address">
                      {order.order.Street} {order.order.State}{" "}
                      {order.order.Zipcode} US
                    </div>
                    {/* <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Phone number:</span> <b>${}</b>{" "}
                    </div> */}
                    <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Email address:</span> <b>{order.order.Email}</b>{" "}
                    </div>
                  </td>

                  <td>
                    <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Invoice no:</span> <b>#TS-{order.order.OrderID}</b>{" "}
                    </div>
                    <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Issue date:</span>{" "}
                      <b>
                        {moment(parseInt(order.order.CreatedOn)).format(
                          Standard.dateFormat
                        )}
                      </b>{" "}
                    </div>
                    {/* <div style={{ margin: "5px 0" }} className="item">
                      {" "}
                      <span>Shipping date:</span> <b>7th June, 2022</b>{" "}
                    </div> */}
                    <div style={{ margin: "5px 0" }} className="item">
                      <span>Status:</span>
                      <b className="paid ml-2 badge badge-success">Paid</b>
                      {/* <b className="unpaid ml-2 badge badge-danger">Unpaid</b> */}
                    </div>
                  </td>
                </tr>
              </table>

              <table style={{ width: "100%", margin: "20px 0" }} className="topDetails">
                <col width="10%" />
                <col width="45%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />

                <tr>
                  <th
                    style={{
                      backgroundColor: "#ff69b4",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    Sr No.
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ff69b4",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ff69b4",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ff69b4",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    Unit Price
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ff69b4",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    Amount
                  </th>
                </tr>
                {order.products.map((product, productIndex) => (
                  <tr key={product.OrderProductID}>
                    <td
                      style={{
                        padding: "10px",
                        backgroundColor: "#efefef",
                        color: "#000000",
                        borderBottom: "1px solid #dfdfdf",
                      }}
                    >
                      {productIndex + 1}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        backgroundColor: "#efefef",
                        color: "#000000",
                        borderBottom: "1px solid #dfdfdf",
                      }}
                    >
                      {product.Product}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        backgroundColor: "#efefef",
                        color: "#000000",
                        borderBottom: "1px solid #dfdfdf",
                      }}
                    >
                      {product.Quantity}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        backgroundColor: "#efefef",
                        color: "#000000",
                        borderBottom: "1px solid #dfdfdf",
                      }}
                    >
                      ${product.Price}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        backgroundColor: "#efefef",
                        color: "#000000",
                        borderBottom: "1px solid #dfdfdf",
                      }}
                    >
                      ${product.Quantity * product.Price}
                    </td>
                  </tr>
                ))}
              </table>

              <table style={{ width: "100%", margin: "20px 0" }}>
                <col width="10%" />
                <col width="15%" />
                <col width="15%" />
                <col width="45%" />
                <col width="15%" />
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    Total
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    ${total}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    Shipping cost
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    ${order.order.DeliveryCost}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    Sub total
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      fontWeight: "500",
                    }}
                  >
                    ${parseFloat(total) + parseFloat(order.order.DeliveryCost)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      color: "#000000",
                      fontWeight: "bold",
                      borderTop: "1px solid #dfdfdf",
                      fontSize: "20px",
                    }}
                  >
                    Total paid
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px 20px",
                      color: "#000000",
                      fontWeight: "bold",
                      borderTop: "1px solid #dfdfdf",
                      fontSize: "20px",
                    }}
                  >
                    ${parseFloat(total) + parseFloat(order.order.DeliveryCost)}
                  </td>
                </tr>
              </table>

              <div style={{ fontSize: "20px", color: "#000000" }}>
                Thank you for your business
              </div>
            </div>


            <div className="noPrint"> <Footer /> </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default InvoicePage;
