/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PricingSectionTwo(props) {
  const [toggleBilled, setToggleBilled] = useState(false);
  const router = useRouter();

  console.log(props.newsplans);

  const toggleClass = () => {
    setToggleBilled(!toggleBilled);
  };

  //Function for plan buying and login check

  const handlePlanBuy = () => {
    if (localStorage.getItem("currentUser")) {
      alert(localStorage.getItem("currentUser"));
    } else {
      alert("Please login to buy plan");
      router.push("/signup");
    }
  };

  return (
    <div className="section fugu-section-padding3">
      <div className="container">
        <div className="fugu-section-title">
          <h2>Strategy pricing plans that we offer to our clients</h2>
        </div>
        <div className="pricing-btn d-flex align-items-center justify-content-center flex-wrap ">
          <label className="mb-3 mb-lg-0">Billed Annually</label>
          <div
            className="toggle-btn form-check form-switch  mb-2 mb-lg-0"
            onClick={toggleClass}
          >
            <input
              className="form-check-input btn-toggle price-deck-trigger mb-2 mb-lg-0"
              type="checkbox"
            />
          </div>
          <label className="mb-3 mb-lg-0">Billed Monthly</label>
        </div>
        <div
          className="row"
          id="table-price-value"
          data-pricing-dynamic
          data-value-active="monthly"
        >
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div
              className="fugu-pricing-wrap fugu-pricing-wrap3 wow fadeInUpX"
              data-wow-delay="0s"
            >
              <div className="fugu-pricing-header">
                <h5>Silver</h5>
              </div>
              <div className="fugu-pricing-price">
                <span className="fugu-pricing-currency">&#8377;</span>
                <div className="fugu-price">{toggleBilled ? "500" : "500"}</div>
                <p className="bottom_text">
                  {toggleBilled ? "/Yearly" : "/Monthly"}
                </p>
              </div>
              <p>Suitable for small companies and personal use</p>
              <div className="fugu-pricing-body">
                <span>What you get:</span>
                <ul>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />
                    Plan limit 30 days
                  </li>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />5 Downloads / day
                  </li>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />1 Screen at a
                    time
                  </li>
                </ul>
              </div>
              <div onClick={handlePlanBuy}>
                <button className="fugu-pricing-btn">Buy the plan</button>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div
              className="fugu-pricing-wrap fugu-pricing-wrap3 wow fadeInUpX"
              data-wow-delay=".10s"
            >
              <div className="fugu-pricing-header">
                <h5>Platinum</h5>
              </div>
              <div className="fugu-pricing-price">
                <span className="fugu-pricing-currency">&#8377;</span>
                <div className="fugu-price">
                  {toggleBilled ? "2500" : "2500"}
                </div>
                <p className="bottom_text">
                  {toggleBilled ? "/Yearly" : "/Monthly"}
                </p>
              </div>
              <p>Suitable for small companies and personal use</p>
              <div className="fugu-pricing-body">
                <span>What you get:</span>
                <ul>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />
                    Plan limit 30 days
                  </li>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />
                    50 Downloads / day
                  </li>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />2 Screen at a
                    time
                  </li>
                </ul>
              </div>
              <div onClick={handlePlanBuy}>
                <button className="fugu-pricing-btn">Buy the plan</button>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div
              className="fugu-pricing-wrap fugu-pricing-wrap3 wow fadeInUpX"
              data-wow-delay=".20s"
            >
              <div className="fugu-pricing-header">
                <h5>Golden</h5>
              </div>
              <div className="fugu-pricing-price">
                <span className="fugu-pricing-currency">&#8377;</span>
                <div className="fugu-price">
                  {toggleBilled ? "1500" : "1500"}
                </div>
                <p className="bottom_text">
                  {toggleBilled ? "/Yearly" : "/Monthly"}
                </p>
              </div>
              <p>Suitable for small companies and personal use</p>
              <div className="fugu-pricing-body">
                <span>What you get:</span>
                <ul>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />
                    Plan limit 30 days
                  </li>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />
                    10 Downloads / day
                  </li>
                  <li>
                    <img src="/images/svg/check5.svg" alt="" />2 Screen at a
                    time
                  </li>
                </ul>
              </div>
              <div onClick={handlePlanBuy}>
                <button className="fugu-pricing-btn">Buy the plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

