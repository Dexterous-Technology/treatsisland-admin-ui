import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import PopupUtils from "../../entities/events/utils/popup-utils";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CartUtils from "../../features/cart/cart-utils";
import ManageCartFloatingSection from "../../features/cart/components/manage-cart-floating-section/manage-cart-floating-section";
import { useSelector } from "react-redux";
import "./popup-store-new-page.scss";

const PopupStoreNewPage = () => {
  const [scroll, setScroll] = useState(false);
  const handleScroll = (e) => {
    if(e.target.scrollTop > 100) {
      setScroll(true);
    } else if (e.target.scrollTop == 0) {
      setScroll(false);
    }

      console.log("scrol value >>>>>>>>>>>>>> " + scroll);
  };


  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRecentSupporters, setShowRecentSupporters] = useState(true);

  const MedalGold = () => {
    return (
      <svg width="100px" height="100px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
        <path fill="#55ACEE" d="M18 8l-7-8H0l14 17l11.521-4.75z"></path>
        <path fill="#3B88C3" d="M25 0l-7 8l5.39 7.312l1.227-1.489L36 0z"></path>
        <path fill="#FFAC33" d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307z"></path>
        <path fill="#9E5200" d="M19.404 18.6h-1.721l-2.73 2.132a.528.528 0 0 0-.112.28v1.178c0 .186.15.354.337.354h1.795v8.414c0 .188.15.355.355.355h2.076c.186 0 .336-.168.336-.355V18.954c0-.186-.149-.354-.336-.354z"></path>
      </svg>
    );
  }
  const MedalSilver = () => {
    return (
      <svg width="100px" height="100px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
        <path fill="#55ACEE" d="M18 8l-7-8H0l14 17l11.521-4.75z"></path>
        <path fill="#3B88C3" d="M25 0l-7 8l5.39 7.312l1.227-1.489L36 0z"></path>
        <path fill="#CCD6DD" d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307z"></path>
        <path fill="#627077" d="M22.002 28.921h-3.543c.878-1.234 2.412-3.234 3.01-4.301c.449-.879.729-1.439.729-2.43c0-2.076-1.57-3.777-4.244-3.777c-2.225 0-3.74 1.832-3.74 1.832c-.131.15-.112.374.019.487l1.141 1.159a.36.36 0 0 0 .523 0c.355-.393 1.047-.935 1.813-.935c1.047 0 1.646.635 1.646 1.346c0 .523-.243 1.047-.486 1.421c-1.104 1.682-3.871 5.441-4.955 6.862v.374c0 .188.149.355.355.355h7.732a.368.368 0 0 0 .355-.355v-1.682a.367.367 0 0 0-.355-.356z"></path>
      </svg>
    );
  }
  const MedalBronze = () => {
    return (
      <svg width="100px" height="100px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
        <path fill="#55ACEE" d="M18 8l-7-8H0l14 17l11.521-4.75z"></path>
        <path fill="#3B88C3" d="M25 0l-7 8l5.39 7.312l1.227-1.489L36 0z"></path>
        <path fill="#FF8A3B" d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307z"></path>
        <path fill="#7C4119" d="M14.121 29.35l1.178-1.178a.345.345 0 0 1 .467-.038s1.159.861 2.056.861c.805 0 1.628-.673 1.628-1.496s-.842-1.514-2.225-1.514h-.639a.367.367 0 0 1-.354-.355v-1.552c0-.206.168-.355.354-.355h.639c1.309 0 2-.635 2-1.439c0-.805-.691-1.402-1.496-1.402c-.823 0-1.346.43-1.626.747c-.132.15-.355.15-.504.02l-1.141-1.122c-.151-.132-.132-.355 0-.486c0 0 1.533-1.646 3.57-1.646c2.169 0 4.039 1.328 4.039 3.422c0 1.439-1.085 2.505-1.926 2.897v.057c.879.374 2.262 1.533 2.262 3.141c0 2.038-1.776 3.572-4.357 3.572c-2.354 0-3.552-1.16-3.944-1.664c-.113-.134-.093-.34.019-.47z"></path>
      </svg>
    );
  }


  const [showFullDesc, setShowFullDesc] = useState(false);


  return (
    <div className={"popup-store-new-page-wrapper " + (scroll ? "sticky" : "")}>
      <Header />
      <ManageCartFloatingSection />

      <div className="storeInnerWrapper">
        <div className="storeLeft">
          <div className="storeLeft_top">
            <div className="storeDetails">
              <div className="item">
                <i className="fa-solid fa-hand-holding-heart"></i>
                <span>12 supporters</span>
              </div>
              <div className="item fund-raised">
                <i className="fa-solid fa-bullseye"></i>
                
                <div className="right">
                  <span><b>$200 raised</b> <b>$500 goal</b></span>
                  <div className="fund-track">
                    <span
                      className="fund-track-complete"
                      style={{ "--complete-percent": "50%" }}
                    ></span>
                  </div>
                </div>
              </div>


              <div className="buttons">
                <div className="donateButton">
                  <i className="fa-solid fa-store"></i>
                  <span>Buy candies to DONATE</span>
                </div>
              </div>
            </div>
          </div>


          <div className="storeLeft_bottom">
            <div className="innerWrapper">
              <div className={"leaderboardWrapper " + (showLeaderboard ? "expand" : "")}>
                <div className="sectionTitle" onClick={(e) => {
                  setShowLeaderboard(false);
                  setShowRecentSupporters(true);
                }}>Recent Supporters</div>

                <div className="sectionContent">
                  <div className="title">Leaderboard</div>
                  
                  <div className="inner">
                    <div className="first-three">
                      <div className="person">
                        <div className="image-wrapper">
                          <div className="icon"><MedalGold /></div>
                          <img src="https://i.pravatar.cc/300" alt="" />
                        </div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper">
                          <div className="icon"><MedalSilver /></div>
                          <img src="https://i.pravatar.cc/300" alt="" />
                        </div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper">
                          <div className="icon"><MedalBronze /></div>
                          <img src="https://i.pravatar.cc/300" alt="" />
                        </div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                    </div>

                    <div className="others">
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                      <div className="person">
                        <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                        <div className="name">John Doe</div>
                        <div className="amount">$500</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={"recentSupportersWrapper " + (showRecentSupporters ? "expand" : "") }>
                <div className="sectionTitle" onClick={(e) => {
                  setShowLeaderboard(true);
                  setShowRecentSupporters(false);
                }}>Leaderboard</div>

                <div className="sectionContent">
                  <div className="title">Recent Supporters</div>
                  <div className="supporter">
                    <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                    <div className="name">
                      <span>Marry Anne</span>
                      <div className="timestamp small font-weight-bold font-italic">5h ago</div>
                    </div>
                    <div className="amount">$500</div>
                  </div>
                  <div className="supporter">
                    <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                    <div className="name">
                      <span>Thomas</span>
                      <div className="timestamp small font-weight-bold font-italic">10h ago</div>
                    </div>
                    <div className="amount">$500</div>
                  </div>
                  <div className="supporter">
                    <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                    <div className="name">
                      <span>Marry Anne</span>
                      <div className="timestamp small font-weight-bold font-italic">5h ago</div>
                    </div>
                    <div className="amount">$500</div>
                  </div>
                  <div className="supporter">
                    <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                    <div className="name">
                      <span>Thomas</span>
                      <div className="timestamp small font-weight-bold font-italic">10h ago</div>
                    </div>
                    <div className="amount">$500</div>
                  </div>
                  <div className="supporter">
                    <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                    <div className="name">
                      <span>Marry Anne</span>
                      <div className="timestamp small font-weight-bold font-italic">5h ago</div>
                    </div>
                    <div className="amount">$500</div>
                  </div>
                  <div className="supporter">
                    <div className="image-wrapper"><img src="https://i.pravatar.cc/300" alt="" /></div>
                    <div className="name">
                      <span>Thomas</span>
                      <div className="timestamp small font-weight-bold font-italic">10h ago</div>
                    </div>
                    <div className="amount">$500</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="storeRight" onScroll={ (e) => handleScroll(e) }>
          <div className="storeRight_top">
            <div className="storeName">Raising fund for the Scruggs Family in honor of beloved Hallie</div>
          </div>


          <div className="storeRight_bottom">
            <div className="coverImage">
              <img src={require("../../assets/images/fundCover.jpeg")} alt="" />
            </div>

            
            <div className="fundDetails">
              <div className="smallDetails">
                <div className="item">
                  <i className="fa-solid fa-clock-rotate-left"></i> Created 2 days ago
                </div>
                <div className="item">
                  <i className="fa-regular fa-clock"></i>5 days event
                </div>
                <div className="item">
                  <i className="fa-solid fa-stopwatch"></i>3 days remaining
                </div>
                <div className="item">
                  <i className="fa-solid fa-hand-holding-heart"></i> 12 supporters
                </div>
              </div>

              <div className="fundDesc">
                <div className={"descInnerWrapper " + (showFullDesc ? "expand" : "")}>
                  <p>Hi, we are Misty and Shannon, friends of the Scruggs family, and we are setting up this GoFundMe on behalf of their beloved Hallie. Please know that all donations will be directly deposited to the Scruggs family as they will be added as the direct beneficiaries of the fundraiser. We hope and pray that our community will bless and love them as we all continue to pray and process yesterday's tragedy.</p>

                  <p>Chad and Jada, along with their sweet boys, are grieving the loss of their precious daughter and sister, Hallie, whose beautiful life was taken far too soon in the tragic shooting at The Covenant School. The youngest of the Scruggs kids, Hallie, was her own person. She equally loved unicorns and ninjas. She loved playing soccer and basketball. Her adventurous, spunky spirit was adored by all who knew her. She was the spirited little sister with a bunch of big brothers, and she knew how to hold her own. She loved her entire family, and they all loved her. Above all, she loved Jesus, and we know He is holding her now.</p>

                  <p>As Chad so boldly proclaimed, “We are heartbroken. Through tears we trust that she is in the arms of Jesus who will raise her to life once again.” We, as family, friends and even strangers, stand with the Scruggs family and cry out to God for mercy and grace.</p>

                  <p>We are raising funds for any unexpected expenses that arise. As we all continue to pray for them and the entire Covenant community, we are grateful for your consideration of donating to this dearly loved family.</p>

                  <p>Thank you for showing them love during these unimaginably difficult days.</p>
                </div>

                <div className="readMore" onClick={(e) => setShowFullDesc(!showFullDesc)}>{showFullDesc ? "Read less" : "Read more"}</div>
              </div>
            </div>


            <div className="candyStore">
              <div className="title">
                <span>Buy our delicious candies</span>
                <div className="small">and all the profit will go straight to the fundraiser!</div>
              </div>

              <div className="candies">
                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique voluptate autem hic officiis assumenda, nesciunt cumque soluta consequuntur incidunt culpa cupiditate, harum quibusdam optio ea, molestiae dolor repellat reiciendis eveniet!</div>
                </div>

                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, fugit in facere numquam dolores quasi! Sunt placeat quisquam delectus omnis.</div>
                </div>

                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, ipsam.</div>
                </div>



                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique voluptate autem hic officiis assumenda, nesciunt cumque soluta consequuntur incidunt culpa cupiditate, harum quibusdam optio ea, molestiae dolor repellat reiciendis eveniet!</div>
                </div>

                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, fugit in facere numquam dolores quasi! Sunt placeat quisquam delectus omnis.</div>
                </div>

                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, ipsam.</div>
                </div>



                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique voluptate autem hic officiis assumenda, nesciunt cumque soluta consequuntur incidunt culpa cupiditate, harum quibusdam optio ea, molestiae dolor repellat reiciendis eveniet!</div>
                </div>

                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, fugit in facere numquam dolores quasi! Sunt placeat quisquam delectus omnis.</div>
                </div>

                <div className="candy">
                  <div className="image-wrapper">
                    <img src="https://via.placeholder.com/200x300.jpg?text=candy+image+goes+here" alt="" />
                    <div className="buttons">
                      <div className="addToCartBtn">Add to cart</div>
                    </div>
                  </div>
                  <div className="candyName">Candy name</div>
                  <div className="price">$500</div>

                  <div className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, ipsam.</div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupStoreNewPage;