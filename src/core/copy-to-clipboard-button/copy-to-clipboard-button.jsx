import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./copy-to-clipboard-button.scss";

const CopyToClipboard = ({ linkPart }) => {
  const _copy = () => {
    navigator.clipboard.writeText(`${window.location.origin}${linkPart}`);
    toast("Copied to clipboard!");
  };
  return (
    <>
      <button onClick={_copy} className="copyToClipboardBtn">
      <i className="fa-sharp fa-regular fa-copy"></i> Copy link
      </button>
      {/* <ToastContainer /> */}
    </>
  );
};

export default CopyToClipboard;
