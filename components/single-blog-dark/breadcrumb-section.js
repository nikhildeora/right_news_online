/* eslint-disable @next/next/no-img-element */
import { sanityClient } from "../../sanity_client";
import Link from "next/link";
import { format } from "date-fns";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth_context";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { RiDownloadCloud2Line } from "react-icons/ri";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Cloudinary, Transformation } from "@cloudinary/url-gen";
export default function BreadcrumbSection(props) {  
const { orders, setOrders, setupdationState, updationState,} =
useContext(AuthContext);

  const Razorpay = useRazorpay();
  const [isPurchased, setisPurchased] = useState(false)
  const [curLoggedUser, setCurLoggedUser] = useState(null);
  const [state, setState] = useState(true);
  const router = useRouter();
  useEffect(() => {
    let curUserId = localStorage.getItem("currentUser") || null;
    setCurLoggedUser(curUserId);
    if(curUserId&&props.news&&orders&&orders.filter((order)=>order.news._ref==props.news.id).length>0){
      setisPurchased(true)
    }
  }, [props,orders]);

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
        _ref: props.news.id,
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
        setisPurchased(true)
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

  const handlePlanBuy = (plan_amount) => {
    let CurUserIdNow = localStorage.getItem("currentUser") || null;

    if (CurUserIdNow) {
      handlePayment(plan_amount);
    } else {
      Swal.fire({
        title: "Can't find user",
        text: "Please Login / Signup to proceed further",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#26215c",
        cancelButtonColor: "#757575",
        confirmButtonText: "LOGIN / SIGNUP",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/signup");
        }
      });
    }
  };

  const handlePayment = (order_amount) => {
    console.log("button clicked");
    let amount_obj = {
      amount: order_amount,
    };

    axios
      .post(
        `https://right-news-online.vercel.app/api/razorpay/order`,
        amount_obj
      )
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
  let Video = {
    url: props.news.video?props.news.video:"https://cdn.sanity.io/files/kbgpbmgs/production/4ab319d2c65d53b84ae81fa5d14a3035aba82b6f.mp4",
    mimeType: "video/mp4",
  }

let Date2 = props.news&&props.news.createdAt?.slice(0, 10);

const ReadyVideoForDownload = async () => {
  let currentLoggedUser = localStorage.getItem("currentUser") || null;

  if (currentLoggedUser) {
      setState(!state)
      let myVideoURL=Video.url
    myVideoURL=myVideoURL.slice(0, myVideoURL.indexOf('upload')) + 'upload/fl_attachment' + myVideoURL.slice(myVideoURL.indexOf('upload') + 6);
      fetch(myVideoURL)
      .then(async (res) => await res.blob())
      .then((file) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = url.replace(/^.*[\\\/]/, "");
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setState(true);
      })
  } else {
    Swal.fire({
      title: "🔒 LOGIN REQUIRED🔒",
      text: "To access our extensive collection of videos, we kindly ask you to log in. Logging in ensures a seamless and secure downloading experience. Your privacy matters to us, and by logging in, you can enjoy our content while keeping your data safe. Thank you for your cooperation!",
      icon: "info",
      showCancelButton: false,
      confirmButtonColor: "#db0303",
      cancelButtonColor: "#757575",
      confirmButtonText: "LOGIN / SIGNUP",
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/signup");
      }
    });
  }
};
  const handleNavigate = (amount) => {
    router.push("/pricing-two");
  };
  return (
    <>
      {props.news && (
        <div
          className="fugu--breadcrumbs-section imageBG"
          style={{
            backgroundImage: `url(${props.news.newsImage})`,
          }}
        >
          <div className="fugu--breadcrumbs-data">
            <div className="row">
              <div className="col-md-8">
                <h1 className="video-title">{props.news.newsTitle}</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p>{props.news.newsShortDescription}</p>
                    <div className="fugu--blog-meta">
                      <ul>
                        <li>
                          <Link href={"#"}>
                            <img src="assets/images/svg2/calendar.svg" alt="" />{" "}
                            {props.news.newsCategory}
                          </Link>
                        </li>
                        <li>
                          <Link href={"#"}>
                            <img src="assets/images/svg2/clock.svg" alt="" />{" "}
                            {props.news.createdAt &&
                              format(
                                new Date(props.news.createdAt),
                                "dd MMMM yyyy"
                              )}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div></div>
                </div>
              </div>
              <div className="col-md-4 bcgrayTabs">
                <Tabs defaultActiveKey="general" className="fugu-tab-menu">
                  {isPurchased ?
                  <Tab eventKey="general" title="Download">
                  <p className="small-text">
                    Starting from July 1st, 2023, single video download
                    purchases will be available for a limited period of 30
                    days.please refer to our updated terms and policies.
                  </p>
                  {state ? (
                      <button
                        className="fugu--btn fugu--menu-btn1 downloadButton"
                        onClick={ReadyVideoForDownload}
                      >
                        <RiDownloadCloud2Line className="download-icon" />
                        Download Video
                      </button>
                    ) : (
                      <button
                        className="fugu--btn fugu--menu-btn1 downloadButton"
                        style={{ width: "192px", height: "45px" }}
                      >
                        <img
                          className="loading_icon"
                          src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
                          alt="Loading..."
                          style={{
                            width: "32px",
                            height: "32px",
                            marginTop: "-4px",
                          }}
                        />
                      </button>
                    )}
                </Tab>
                  :<Tab eventKey="general" title="Buy Now & Download">
                    <p className="small-text">
                      Starting from July 1st, 2023, single video download
                      purchases will be available for a limited period of 30
                      days.please refer to our updated terms and policies.
                    </p>
                    <button
                      onClick={() => handlePlanBuy(300)}
                      style={{
                        color: "white",
                        padding: "12px 28px",
                        backgroundColor: "red",
                        cursor: "pointer",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        fontSize: "16px",
                        width: "100%",
                        textTransform: "uppercase",
                      }}
                    >
                      PAY &#8377; 300 & DOWNLOAD
                    </button>
                  </Tab>}
                  <Tab eventKey="general2" title="Subscribe & Save">
                    <p className="small-text">
                      Save big with our membership plans starting from just
                      Rs.199! Unlock a world of benefits and exclusive content.
                      Upgrade today and enjoy unlimited access. Don't miss out!
                    </p>
                    <button
                      onClick={() => handleNavigate(300)}
                      style={{
                        color: "white",
                        padding: "12px 28px",
                        backgroundColor: "red",
                        cursor: "pointer",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        fontSize: "16px",
                        width: "100%",
                        textTransform: "uppercase",
                      }}
                    >
                      BUY Membership Plans
                    </button>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
