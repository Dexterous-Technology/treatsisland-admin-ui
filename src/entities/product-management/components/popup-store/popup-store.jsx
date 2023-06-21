import React, { Component, useEffect, useState } from "react";
const PopupStore = ({
  isVisible = true,
  selectedEvent = null,
  onDismiss = () => { },
}) => {
  
  const [modalPopupStore, setModalPopupStore] = useState(false);
  const [modalAllPopupStore, setModalAllPopupStore] = useState(true);
  const [modalPopupStoreDetails, setModalPopupStoreDetails] = useState(false);

  useEffect(() => {
  }, [isVisible])

  return (
    <>
      {/* **************************************** MODALS - POPUP STORE */}
        <div className={"modalPopupStores " + (isVisible ? "show" : "")}>
            {/* ALL POPUP STORES */}
            <div className={"allPopupStores " + (modalAllPopupStore ? "d-block" : "d-none")}>
                <div className="modalTop" onClick={onDismiss}><i className="fa fa-arrow-left"></i> <span>Go back</span></div>

                <div className="modalHeader">List of active popup stores for John Doe's Fundraising Event (5 stores)</div>


                <div className="storeCards">
                    <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                        <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                        <div className="storeDetails">
                            <div className="storeName">Popup store #1</div>
                            <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                            <div className="amountRaised">
                                <div className="amount"> $50 raised of $150 </div>
                                <div className="progressWrapper">
                                    <span className="progressMade" style={{width: "30%"}}></span>
                                </div>
                            </div>
                        </div>
                    </div>


                    
                    <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                        <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                        <div className="storeDetails">
                            <div className="storeName">Popup store #1</div>
                            <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                            <div className="amountRaised">
                                <div className="amount"> $50 raised of $150 </div>
                                <div className="progressWrapper">
                                    <span className="progressMade" style={{width: "30%"}}></span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                        <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                        <div className="storeDetails">
                            <div className="storeName">Popup store #1</div>
                            <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                            <div className="amountRaised">
                                <div className="amount"> $50 raised of $150 </div>
                                <div className="progressWrapper">
                                    <span className="progressMade" style={{width: "30%"}}></span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                        <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                        <div className="storeDetails">
                            <div className="storeName">Popup store #1</div>
                            <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                            <div className="amountRaised">
                                <div className="amount"> $50 raised of $150 </div>
                                <div className="progressWrapper">
                                    <span className="progressMade" style={{width: "30%"}}></span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="storeCard" onClick={(e) => {setModalPopupStoreDetails(true); setModalAllPopupStore(false);}}>
                        <div className="image-wrapper"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>
                        <div className="storeDetails">
                            <div className="storeName">Popup store #1</div>
                            <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                            <div className="amountRaised">
                                <div className="amount"> $50 raised of $150 </div>
                                <div className="progressWrapper">
                                    <span className="progressMade" style={{width: "30%"}}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* SINGLE POPUP STORE DETAILS */}
            <div className={"popupStoreDetails " + (modalPopupStoreDetails ? "d-block" : "d-none")}>
                <div
                    className="modalTop"
                    onClick={(e) => {
                        setModalAllPopupStore(true);
                        setModalPopupStoreDetails(false);
                    }}
                >
                    <i className="fa fa-arrow-left"></i> <span>Go back</span>
                </div>

                <div className="modalHeader">Popup store #1</div>

                <div className="innerWrapper">
                    <div className="image-wrapper cover"><img src="https://picsum.photos/id/33/1200/300" alt="" /></div>

                    <div className="intro">
                        <div className="image-wrapper icon"><img src="https://picsum.photos/id/237/200/300" alt="" /></div>

                        <div className="storeName">Popup store #1</div>
                        <div className="storeDesc">Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna. Lorem ipsum dolor sit, amet consectetur adipiscing elit, aptent urna.</div>

                        <div className="totalSales">Total sales: $50</div>

                        <div className="amountRaised">
                            <div className="amount"> <span>$50 raised</span> <span>of $150</span> </div>
                            <div className="progressWrapper">
                                <span className="progressMade" style={{width: "30%"}}></span>
                            </div>
                        </div>
                    </div>



                    <div className="supporterWrapper">
                        <div className="supporterTitle">All supporters</div>

                        <div className="supporters">
                            <div className="supporter">
                                <div className="left"> <span>1</span> <b>John Doe</b> </div>
                                <div className="right">$15</div>
                            </div>
                            <div className="supporter">
                                <div className="left"> <span>2</span> <b>John Doe</b> </div>
                                <div className="right">$15</div>
                            </div>
                            <div className="supporter">
                                <div className="left"> <span>3</span> <b>John Doe</b> </div>
                                <div className="right">$15</div>
                            </div>
                            <div className="supporter">
                                <div className="left"> <span>4</span> <b>John Doe</b> </div>
                                <div className="right">$15</div>
                            </div>
                            <div className="supporter">
                                <div className="left"> <span>5</span> <b>John Doe</b> </div>
                                <div className="right">$15</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default PopupStore;
