import React, { Component } from 'react';


const Footer = () => {
    return (
        <>
            {/* <div className="site-footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                            <div className="ftrTitle">Our Mission</div>

                            <div className="ftrDesc">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi! Ipsam repellat blanditiis quibusdam asperiores. Lorem ipsum dolor sit amet consectetur.</p>
                                
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi! Ipsam repellat blanditiis quibusdam asperiores. Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>

                        
                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                            <div className="ftrTitle">Categories</div>

                            <div className="ftrMenuWrap">
                                <ul className="ftrMenu">
                                    <li>Creative</li>
                                    <li>Donate</li>
                                    <li>Education</li>
                                    <li>Foundation</li>
                                    <li>Nonprofit</li>
                                </ul>
                            </div>
                        </div>


                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                            <div className="ftrTitle">Recent comments</div>

                            <div className="ftrMenuWrap">
                                <ul className="ftrMenu">
                                    <li><b>Sinan on</b> Blog Post With Gallery</li>
                                    <li><b>Sinan on</b> The Burger Recipe Book</li>
                                </ul>
                            </div>
                        </div>


                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                            <div className="ftrTitle">Tags</div>

                            <div className="tagsWrapper">
                                <div className="tag"><i class="fa-solid fa-tag"></i> build</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> creative</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> donate</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> education</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> events</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> foundation</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> fundraising</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> gallery</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> new</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> nonprofit</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> photography</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> process</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> slider</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> spotlight</div>
                                <div className="tag"><i class="fa-solid fa-tag"></i> WordPress</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}



            <div className="copyright">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 text-center text-md-left"><span className="copyText">Copyright &copy; {(new Date().getFullYear())} Treats Island. All rights reserved.</span></div>

                        <div className="col-md-8 text-center text-md-right mt-4 mt-md-0 d-flex justify-content-end align-items-center">
                            <div className="contact-details small d-flex justify-content-end align-items-center">
                                <div className="item address mr-3">
                                    <span className="fas fa-map-marker-alt"></span> 10808 Foothill Blvd Suite 160-580 Rancho Cucamonga, CA 91730
                                </div>
                                <div className="item address mr-3">
                                    <span className="fa fa-envelope"></span> email
                                </div>
                            </div>

                            <ul className="ftrSocial justify-content-center justify-content-md-end">
                                <li><a href="https://www.instagram.com/treatsislandvf/" className="text-light"><i className="fa-brands fa-instagram"></i></a></li>
                                {/* <li><i className="fa-brands fa-facebook-f"></i></li>
                                <li><i className="fa-brands fa-twitter"></i></li>
                                <li><i className="fa-brands fa-dribbble"></i></li>
                                <li><i className="fa-brands fa-tumblr"></i></li>
                                <li><i className="fa-regular fa-envelope"></i></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;