import React from 'react'
import './plans.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
function Plans() {
  return  (
    <section className="section-plans" id="section-plans">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">
          Hosting Plans
        </h2>
      </div>

      <div className="row">
        <div className="col-1-of-3">
          <div className="card">
            <div className="card__side card__side--front-1">
              <div className="card__title card__title--1">
                <i className="fas fa-paper-plane"></i>
                <h4 className="card__heading">Basic</h4>
              </div>

              <div className="card__details">
                <ul>
                  <li>1 Website</li>
                  <li>50 GB SSD Storage</li>
                  <li>Unmetered Bandwidth</li>
                  <li>Free SSL Certificate</li>
                  <li>1 Included Domain</li>
                  
                </ul>
              </div>
            </div>
            <div className="card__side card__side--back card__side--back-1">
              <div className="card__cta">
                <div className="card__price-box">
                  <p className="card__price-only">Only</p>
                  <p className="card__price-value">$2.95/mo*</p>
                </div>
                <a href="#popup" className="btn btn--white">Select</a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-1-of-3">
          <div className="card">
            <div className="card__side card__side--front-2">
              <div className="card__title card__title--2">
                <i className="fas fa-plane"></i>
                <h4 className="card__heading">Plus</h4>
              </div>

              <div className="card__details">
                <ul>
                  <li>Includes Basic Package Features</li>
                  <li>Unlimited Websites</li>
                  <li>Unlimited SSD Storage</li>
                  <li>Unlimited Domains</li>
                  <li>Unlimited Parked Domains</li>
                 
                </ul>
              </div>
            </div>
            <div className="card__side card__side--back card__side--back-2">
              <div className="card__cta">
                <div className="card__price-box">
                  <p className="card__price-only">Only</p>
                  <p className="card__price-value">$5.45/mo*</p>
                </div>
                <a href="#popup" className="btn btn--white">Select</a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-1-of-3">
          <div className="card">
            <div className="card__side card__side--front-3">
              <div className="card__title card__title--3">
                <i className="fas fa-rocket"></i>
                <h4 className="card__heading">Pro</h4>
              </div>

              <div className="card__details">
                <ul>
                  <li>Includes Plus Plan Features</li>
                  <li>High Performance</li>
                  <li>2 Spam Experts</li>
                  <li>Free SSL Certificate</li>
                  <li>Domain Privacy</li>
                  <li>Site Backup </li>
                </ul>
              </div>
            </div>
            <div className="card__side card__side--back card__side--back-3">
              <div className="card__cta">
                <div className="card__price-box">
                  <p className="card__price-only">Only</p>
                  <p className="card__price-value">$13.95/mo</p>
                </div>
                <a href="#popup" className="btn btn--white">Select</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}

export default Plans;