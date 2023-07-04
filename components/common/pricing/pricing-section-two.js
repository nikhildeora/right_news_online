/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function PricingSectionTwo() {
	const [toggleBilled, setToggleBilled] = useState(false);

	const toggleClass = () => {
		setToggleBilled(!toggleBilled);
	};
	const Razorpay = useRazorpay();
	const [curLoggedUser, setCurLoggedUser] = useState(null);
  
	useEffect(() => {
	  let curUserId = localStorage.getItem("currentUser") || null;
	  setCurLoggedUser(curUserId);
	}, []);
  
	const OrderPostInSanity = (status, response, order_data) => {
	  let date = new Date();
	  let formatDate = date.toISOString();
  
	  let Order_obj = {
		_id: uuidv4(),
		_type: "orders",
		user: {
		  _ref: curLoggedUser,
		  _type: "reference",
		},
		news: {
		  _ref: "0cc3a36f-176d-4920-8731-a05d4dfc101a",
		  _type: "reference",
		},
		genre: status,
		orderValue: order_data.amount / 100,
		orderTimeDate: formatDate,
		transcationID: "",
		orderID: "",
	  };
  
	  if (status === "successfull") {
		Order_obj.transcationID = response.razorpay_payment_id;
		Order_obj.orderID = response.razorpay_order_id;
	  } else if (status === "Failed") {
		Order_obj.transcationID = response.error.metadata.payment_id;
		Order_obj.orderID = response.error.metadata.order_id;
	  }
  
	  sanityClient
		.create(Order_obj)
		.then((res) => {
		  console.log("order created successfully", res);
		})
		.catch((err) => console.log("error while posting order in sanity", err));
	};
  
	const handleRazorpayVerify = (order_data) => {
	  if (order_data.status === 400) {
		console.log("error in creating order");
		return;
	  }
	  console.log("first", "hey");
  
	  const options = {
		key: "rzp_test_LWbOWLWKn6A8wz", // Enter the Key ID generated from the Dashboard
		amount: order_data.message.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
		currency: order_data.message.currency,
		name: "Right News Online",
		description: "Test Transaction for RNO",
		order_id: order_data.message.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
		handler: function (response) {
		  // alert(response.razorpay_payment_id); // pay_M9L0aJpux62fGC
		  // alert(response.razorpay_order_id); // order_M9L0POj24pfADr (order id is same as at the time of create order)
		  // alert(response.razorpay_signature); // 8d8da0fdd32db21f1d19af584fa1a3ca7650f38accdddb2bd712551c58211f4a
  
		  OrderPostInSanity("successfull", response, order_data.message);
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
		// alert(response.error.code); // BAD_REQUEST_ERROR
		// alert(response.error.description); // Your payment didn't go through as it was declined by the bank. Try another payment method or contact your bank.
		// alert(response.error.source); // bank
		// alert(response.error.step); // payment_authorization
		// alert(response.error.reason); // payment_failed
		// alert(response.error.metadata.order_id); // order_M9L2qsbZQ8km99
		// alert(response.error.metadata.payment_id); // pay_M9L33oyNsjZuZH
  
		OrderPostInSanity("Failed", response, order_data.message);
	  });
  
	  rzp1.open();
	};
  
	const handlePayment = (order_amount) => {
		if (localStorage.getItem("currentUser")) {
			alert(localStorage.getItem("currentUser"));
		  } else {
			alert("Please login to buy plan");
			router.push("/signup");
		  }
	  console.log("button clicked");
	  let amount_obj = {
		amount: order_amount,
	  };
  
	  axios
		.post(`http://localhost:3000/api/razorpay/order`, amount_obj)
		.then((order) => {
		  console.log(order.data);
		  handleRazorpayVerify(order.data);
		})
		.catch((err) => console.log("error", err));
  
	  // order.data.status if 200 that means order created successfully or if it is 400 then there is a error
	  // we get order id in order.data.message.id
	  // this will be result
	  // {
	  // 	amount : 30000
	  // 	amount_due : 30000
	  // 	amount_paid : 0
	  // 	attempts : 0
	  // 	created_at : 1688385006,
	  // 	currency : "INR",
	  // 	entity : "order",
	  // 	id : "order_M9Jm4JrSUMnyAl",
	  // 	notes : [],
	  // 	offer_id : null,
	  // 	receipt : null,
	  // 	status :"created"
	  // }
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
              <div onClick={toggleBilled?handlePayment(500):handlePayment(500)}>
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
              <div onClick={toggleBilled?handlePayment(2500):handlePayment(2500)}>
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
              <div onClick={toggleBilled?handlePayment(1500):handlePayment(1500)}>
                <button className="fugu-pricing-btn">Buy the plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
