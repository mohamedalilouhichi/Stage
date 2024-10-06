
import Menu from "./menu";
import CReport from "./creport";
import ReactDOM from "react";
import Plans from "./plans";
import React, { Fragment } from 'react';
import Services from "./services";
import Home from "./home";
import Calendarr from "./calendarr";
import {useLocation, useParams} from 'react-router-dom';


function Index() {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    if (!token) {
        // Redirect to login page if no token is present
        window.location.href = '/';
    }
    return (
        <Fragment>
            <body>

            <Menu/>
            
                <section className="home py-5 d-flex align-items-center" id="header">
                <Home/>
                    <div className="container text-light py-5" data-aos="fade-right">

                        <h1 className="headline">
                            Best <span className="home_text">Broadband</span>
                            <br />

                            Internet Plans For You
                        </h1>
                        <p className="para para-light py-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus tempore accusamus quis magnam doloremque itaque ad modi, pariatur iste labore similique officiis impedit aspernatur aperiam facere architecto. Eligendi, repellendus inventore!</p>
                        <div className="d-flex align-items-center">
                            <p className="p-2"><i className="fas fa-laptop-house fa-lg"></i></p>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <p className="p-2"><i className="fas fa-wifi fa-lg"></i></p>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="my-3">
                            <a className="btn" href="#plans">View Plans</a>
                        </div>
                    </div>
                </section>





                <section className="about d-flex align-items-center text-light py-5" id="about">
  <div className="container">
    <div className="row d-flex align-items-center">
      <div className="col-lg-7" data-aos="fade-right">
        <p>ABOUT US</p>
        <h1>We are top internet <br />service company</h1>
        <p className="py-2 para-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sed accusantium aut dolores inventore architecto modi cupiditate eligendi corporis, illum illo culpa. Reiciendis, molestias. Illum voluptatum quisquam ad veritatis dolorem.</p>
        <p className="py-2 para-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sed accusantium aut dolores inventore architecto modi cupiditate eligendi corporis, illum illo culpa. Reiciendis, molestias. Illum voluptatum quisquam ad veritatis dolorem.</p>

        <div className="my-3">
          <a className="btn" href="#about">Learn More</a>
        </div>
      </div>
      
    </div>
    <CReport />
  </div>
</section>


                <section class="newsletter text-light py-5">
        <div class="container">
            <div class="row" >
                <div class="col-lg-6 text-center text-lg-start" data-aos="fade-right">
                    <h4 class="py-1">Subscribe to our Newsletter</h4>
                    <p class="para-light">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor deleniti nobis amet accusamus debitis facilis quibusdam officia laborum nesciunt. Nihil.</p>
                </div>
                <div class="col-lg-6 d-flex align-items-center" data-aos="fade-down">
                    <div class="input-group my-3">
                        <input type="text" class="form-control p-2" placeholder="Enter your email address" aria-label="Recipient's email"/>
                        <button class="btn-secondary text-light" type="button">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </section> 
    <section class="newsletter text-light py-5">
        <div class="container">
            <div class="row" >
                <div class="col-lg-6 text-center text-lg-start" data-aos="fade-right">
                    <h4 class="py-1">Subscribe to our Newsletter</h4>
                    <p class="para-light">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor deleniti nobis amet accusamus debitis facilis quibusdam officia laborum nesciunt. Nihil.</p>
                </div>
                <div class="col-lg-6 d-flex align-items-center" data-aos="fade-down">
                    <div class="input-group my-3">
                        <input type="text" class="form-control p-2" placeholder="Enter your email address" aria-label="Recipient's email"/>
                        <button class="btn-secondary text-light" type="button">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </section> 
    
                <section className="services d-flex align-items-center py-5" id="services">
                    <Services/>
                </section>



                <section className="plans d-flex align-items-center py-5" id="plans">
                    
                    <Plans/>
                </section>

                <section className="contact d-flex align-items-center py-5" id="contact">
                <div id="calendar"></div>
                <Calendarr/>
                </section>

                

                <section className="footer text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 py-4 py-md-5">
                                <div className="d-flex align-items-center">
                                    <h4 className=""> Offre n°180NCYQ</h4>
                                </div>
                                <p className="py-3 para-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi repudiandae explicabo esse maxime, impedit rem voluptatibus amet error quas.</p>
                                <div className="d-flex">
                                    <div className="me-3">
                                        <a href="https://www.facebook.com/keystonecyber/?locale=fr_FR">
                                            <i className="fab fa-facebook-f fa-2x py-2"></i>
                                        </a>
                                    </div>
                                    <div className="me-3">
                                        <a href="#your-link">
                                            <i className="fab fa-twitter fa-2x py-2"></i>
                                        </a>
                                    </div>
                                    <div className="me-3">
                                        <a href="#your-link">
                                            <i className="fab fa-instagram fa-2x py-2"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>



                            <div className="col-lg-3 py-4 py-md-5">
                                <div>
                                    <h4 className="py-2">Useful Links</h4>
                                    <div className="d-flex align-items-center py-2">
                                        <i className="fas fa-caret-right"></i>
                                        <a href="privacy.html"><p className="ms-3">Privacy</p></a>

                                    </div>
                                    <div className="d-flex align-items-center py-2">
                                        <i className="fas fa-caret-right"></i>
                                        <a href="terms.html"><p className="ms-3">Terms</p></a>
                                    </div>
                                    <div className="d-flex align-items-center py-2">
                                        <i className="fas fa-caret-right"></i>
                                        <a href="#your-link"><p className="ms-3">Disclaimer</p></a>
                                    </div>
                                    <div className="d-flex align-items-center py-2">
                                        <i className="fas fa-caret-right"></i>
                                        <a href="#your-link"><p className="ms-3">FAQ</p></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 py-4 py-md-5">
                                <div className="d-flex align-items-center">
                                    <h4>Newsletter</h4>
                                </div>
                                <p className="py-3 para-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, ab.</p>
                                <div className="d-flex align-items-center">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control p-2" placeholder="Enter Email" aria-label="Recipient's email" aria-describedby="button-addon2" />
                                        <button className="btn-secondary text-light" id="button-addon2"><i className="fas fa-envelope fa-lg"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <div className="bottom py-2 text-light">
                    <div className="container d-flex justify-content-between">
                        <div>
                            <p>Copyright © Your name</p>
                            <p>Distributed by: <a href="https://themewagon.com/">Themewagon</a></p>
                        </div>
                        <div>
                            <i className="fab fa-cc-visa fa-lg p-1"></i>
                            <i className="fab fa-cc-mastercard fa-lg p-1"></i>
                            <i className="fab fa-cc-paypal fa-lg p-1"></i>
                            <i className="fab fa-cc-amazon-pay fa-lg p-1"></i>
                        </div>
                    </div>
                </div>
                Ensure that you have imported the necessary CSS libraries and font icon files (e.g., Font Awesome) in your React application for the font icons to render correctly.










                



                <script src="./js/bootstrap.min.js"></script>
                <script src="./js/purecounter.min.js"></script>
                <script src="./js/swiper.min.js"></script>
                <script src="./js/aos.js"></script>
                <script src="./js/script.js"></script>
            </body>
        </Fragment>
    )
}
export default Index;