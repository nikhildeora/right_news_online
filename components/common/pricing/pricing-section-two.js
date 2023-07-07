/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/auth_context";
import { format } from "date-fns";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { v4 as uuidv4 } from "uuid";
import { sanityClient } from "../../../sanity_client";
import { FaCheck } from "react-icons/fa";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function PricingSectionTwo(props) {
  const [toggleBilled, setToggleBilled] = useState(false);
  const { curUser, setupdationState, updationState, activePlan } =
    useContext(AuthContext);
  const Razorpay = useRazorpay();
  const router = useRouter();

  console.log("curuser", curUser);
  // console.log(props.newsplans);
  console.log("active plan", activePlan);

  useEffect(() => {
    setupdationState(!updationState);
  }, []);

  const toggleClass = () => {
    setToggleBilled(!toggleBilled);
  };

  //Function for plan buying and login check

  const handlePlanBuy = (plan_amount, plan_ref, plan_days) => {
    let CurUserIdNow = localStorage.getItem("currentUser") || null;

    if (CurUserIdNow) {
      handlePayment(CurUserIdNow, plan_amount, plan_ref, plan_days);
    } else {
      Swal.fire({
        title: "Can't find user",
        text: "Please Login/Signup to proceed further",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#26215c",
        cancelButtonColor: "#757575",
        confirmButtonText: "Login / Signup",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/signup");
        }
      });
    }
  };

  const handlePayment = (CurUserIdNow, plan_amount, plan_ref, plan_days) => {
    let amount_obj = {
      amount: plan_amount,
    };

    axios
      .post(`http://localhost:3000/api/razorpay/order`, amount_obj)
      .then((order) => {
        console.log(order.data);
        handleRazorpayVerify(
          order.data,
          CurUserIdNow,
          plan_amount,
          plan_ref,
          plan_days
        );
      })
      .catch((err) => console.log("error", err));
  };

  const handleRazorpayVerify = (
    order_data,
    CurUserIdNow,
    plan_amount,
    plan_ref,
    plan_days
  ) => {
    if (order_data.status === 400) {
      console.log("error in creating order");
      return;
    }
    console.log("first", "hey");

    const options = {
      key: "rzp_test_LWbOWLWKn6A8wz",
      amount: order_data.message.amount,
      currency: order_data.message.currency,
      name: "Right News Online",
      description: "Test Transaction for RNO",
      order_id: order_data.message.id,
      handler: function (response) {
        MemberPostInSanity(CurUserIdNow, plan_amount, plan_ref, plan_days);
      },
      prefill: {
        // here we will give data of user
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      Swal.fire({
        title: "Payment unsuccessfull",
        text: "Due to some reason payment unsuccessful!",
        icon: "error",
        confirmButtonColor: "#26215c",
        confirmButtonText: "Close",
        reverseButtons: true,
      });
    });

    rzp1.open();
  };

  const MemberPostInSanity = (
    CurUserIdNow,
    plan_amount,
    plan_ref,
    plan_days
  ) => {
    let date = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + plan_days);
    let endDateFormat = endDate.toISOString();
    let formatDate = date.toISOString();

    let planObj = {
      _id: uuidv4(),
      _type: "memberships",
      plan: {
        _ref: plan_ref,
        _type: "reference",
      },
      user: {
        _ref: CurUserIdNow,
        _type: "reference",
      },
      startDate: formatDate,
      endtDate: endDateFormat,
    };

    sanityClient
      .create(planObj)
      .then((res) => {
        console.log(res);
        setupdationState(!updationState);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="section fugu-section-padding3">
      <div className="container">
        <div className="fugu-section-title">
          <h2>Strategy pricing plans that we offer to our clients</h2>
        </div>

        <div className="fugu-section-title">
          {activePlan ? (
            <h4>
              Active Plan : {activePlan.planDetail.planTitle} Valid Till{" "}
              {format(new Date(activePlan.endtDate), "dd MMMM yyyy")}{" "}
            </h4>
          ) : null}
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
              id="silverCard"
              className="fugu-pricing-wrap fugu-pricing-wrap3 wow fadeInUpX "
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
                    <FaCheck className="silvergoldenFAicon"></FaCheck>
                    Plan limit 30 days
                  </li>
                  <li>
                    <FaCheck className="silvergoldenFAicon"></FaCheck>5
                    Downloads / day
                  </li>
                  <li>
                    <FaCheck className="silvergoldenFAicon"></FaCheck>1 Screen
                    at a time
                  </li>
                </ul>
              </div>
              <div
                onClick={() =>
                  handlePlanBuy(500, "a5647fad-9ab3-42f6-9116-f9bd12409463", 30)
                }
              >
                <button id="SilverGoldBtn1" className="fugu-pricing-btn Btn">
                  Buy the plan
                </button>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div
              id="platinumCard"
              className="fugu-pricing-wrap fugu-pricing-wrap3 wow fadeInUpX"
              data-wow-delay=".10s"
            >
              <div className="fugu-pricing-header">
                <h5 style={{ color: "#fff" }}>Platinum</h5>
              </div>
              <div className="fugu-pricing-price">
                <span
                  className="fugu-pricing-currency"
                  style={{ color: "#fff" }}
                >
                  &#8377;
                </span>
                <div className="fugu-price" style={{ color: "#fff" }}>
                  {toggleBilled ? "2500" : "2500"}
                </div>
                <p className="bottom_text" style={{ color: "#fff" }}>
                  {toggleBilled ? "/Yearly" : "/Monthly"}
                </p>
              </div>
              <p style={{ color: "#fff" }}>
                Suitable for small companies and personal use
              </p>
              <div className="fugu-pricing-body" style={{ Color: "#fff" }}>
                <span style={{ color: "#fff" }}>What you get:</span>
                <ul>
                  <li style={{ color: "#fff" }}>
                    <FaCheck className="platinumFaicon"></FaCheck>
                    Plan limit 90 days
                  </li>
                  <li style={{ color: "#fff" }}>
                    <FaCheck className="platinumFaicon"></FaCheck>
                    50 Downloads / day
                  </li>
                  <li style={{ color: "#fff" }}>
                    <FaCheck className="platinumFaicon"></FaCheck>2 Screen at a
                    time
                  </li>
                </ul>
                <div className="fugu-pricing-label" style={{ color: "#fff" }}>
                  Popular
                </div>
              </div>
              <div
                onClick={() =>
                  handlePlanBuy(
                    2500,
                    "3b24ec2f-a75b-42a8-8491-1afbd0d8d8ae",
                    90
                  )
                }
              >
                <button className="fugu-pricing-btn Btn" id="platinumBtn">
                  Buy the plan
                </button>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div
              id="goldenCard"
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
                    <FaCheck className="silvergoldenFAicon"></FaCheck>
                    Plan limit 30 days
                  </li>
                  <li>
                    <FaCheck className="silvergoldenFAicon"></FaCheck>
                    10 Downloads / day
                  </li>
                  <li>
                    <FaCheck className="silvergoldenFAicon"></FaCheck>2 Screen
                    at a time
                  </li>
                </ul>
              </div>
              <div
                onClick={() =>
                  handlePlanBuy(
                    1500,
                    "666e5ad1-2a7c-4dab-9ca4-99c1a0ab0183",
                    30
                  )
                }
              >
                <button className="fugu-pricing-btn Btn" id="SilverGoldBtn2">
                  Buy the plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
