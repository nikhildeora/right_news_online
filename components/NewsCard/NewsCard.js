import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { sanityClient } from "../../sanity_client";
import { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "next-sanity";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { AiOutlinePlayCircle } from "react-icons/ai";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import { brightness, opacity } from "@cloudinary/url-gen/actions/adjust";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { text, image } from "@cloudinary/url-gen/qualifiers/source";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { Cloudinary, Transformation } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import axios from "axios";
import { AuthContext } from "../../context/auth_context";

const NewsCard = (props) => {
  // console.log(props);
  const [video, setVideo] = useState(false);
  const [state, setState] = useState(true);
  const router = useRouter();
  const { activePlan } = useContext(AuthContext);
  const [purchasePlan, setPurchasePlan] = useState(true);
  // console.log("active plan on news card", activePlan);

  useEffect(() => {
    if (video && activePlan == null) {
      setTimeout(() => {
        setVideo(!video);
        setPurchasePlan(!purchasePlan);
      }, 7000);
    }
  }, [video]);

  let Video = {
      url: props.news.video?props.news.video:"https://cdn.sanity.io/files/kbgpbmgs/production/4ab319d2c65d53b84ae81fa5d14a3035aba82b6f.mp4",
      mimeType: "video/mp4",
    }
  // console.log(Video);

  let Date = props.news.createdAt.slice(0, 10);

  let classValue = `collection-grid-item wow fadeInUpX col-lg-4 col-sm-6  ${props.news.newsCategory}`;
  //
  //watermark code
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "dmdnkgldu",
      apiKey: "824834376614351",
      apiSecret: "6-p_NhIRezrfvdaVYdul8v_gpn0",
    },
  });

  const checkMembership = async (curUser) => {
    let result = await sanityClient
      .fetch(`*[_type=="memberships" && user._ref=="${curUser}"]`)
      .then((res) => {
        console.log("respo", res);
        if (res.length > 0) {
          return false;
        } else {
          return true;
        }
      })
      .catch((err) => {
        console.log("error while set plan", err);
        return true;
      });

    console.log("result", result);
    return result;
  };

  const ReadyVideoForDownload = async () => {
    let currentLoggedUser = localStorage.getItem("currentUser") || null;

    if (currentLoggedUser) {
      let membershipExist = await checkMembership(currentLoggedUser);
      console.log("men", membershipExist);
      if (membershipExist) {
        Swal.fire({
          title: "🔒 Purchase Plan first to Download🔒",
          text: "To access our extensive collection of videos, we kindly ask you to purchase our plan.  Your privacy matters to us. Thank you for your cooperation!",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#db0303",
          cancelButtonColor: "#757575",
          confirmButtonText: "Purchase Plan",
          reverseButtons: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/pricing-two");
          }
        });
      } else {
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
      }
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
  function handleClick() {
    setVideo(!video);
  }

  return (
    <div className="fugu--blog-filtering row ">
      <div className="col-12">
        <div className="fugu--portfolio-wrap row" id="fugu--two-column">
          <div className={classValue} data-wow-delay="0s">
            <div className="fugu--blog-wrap">
              <div>
                {purchasePlan ? (
                  <div>
                    {video ? (
                      <div className="fugu--blog-thumb">
                        <VideoPlayer
                          handleClick={handleClick}
                          Video={Video}
                        ></VideoPlayer>
                      </div>
                    ) : (
                      <div className="fugu--blog-thumb" onClick={handleClick}>
                        <img src={props.news.newsImage} alt="News Image" />

                        <div className="video-badge">
                          <AiOutlinePlayCircle className="redAura" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="fugu--blog-thumb news-card-purchase-plan-div">
                    <h3 className="purchase-plan_text">
                      Purchase plan to see full length video & access download
                      video
                    </h3>

                    <button
                      onClick={() => {
                        router.push("/pricing-two");
                      }}
                      className="Purchase_plan_button_news_card"
                    >
                      Purchase Plan
                    </button>
                  </div>
                )}
              </div>
              <div className="fugu--blog-content">
                <div className="fugu--blog-date">
                  <ul>
                    <li>
                      <Link href={`/single-blog-dark/${props.news.slug}`}>
                        <img src="/images/svg2/calendar.svg" alt="" />
                        {Date}
                      </Link>
                    </li>

                    <li>
                      <Link href={`/single-blog-dark/${props.news.slug}`}>
                        <img src="/images/svg2/clock.svg" alt="" />5 min read
                      </Link>
                    </li>
                    <li>
                      <Link href={`/single-blog-dark/${props.news.slug}`}>
                        <img src="/images/svg2/clock.svg" alt="" />{" "}
                        {props.news.newsCategory}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="fugu--blog-title"
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  {/* <Link href="single-blog-dark"> */}
                  <Link
                    href={`/single-blog-dark/${props.news.slug}`}
                    className="elipText"
                    style={{
                      color: "#ffffff",
                      textDecoration: "none",
                      transition: "text-decoration 0.3s",
                      cursor: "pointer",
                      fontSize: "18px",
                      webkitLineClamp: 3,
                      fontWeight: "600",
                      marginBottom: "10px",
                      lineHeight: "21px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textDecoration = "none";
                    }}
                  >
                    {props.news.newsTitle}
                  </Link>
                  {/* </Link> */}
                </div>
                <p
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    transition: "text-decoration 0.3s",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "400",
                    marginBottom: "10px",
                  }}
                >
                  {props.news.newsShortDescription}
                </p>
                {/* <div
                  className="fugu--btn fugu--menu-btn1 downloadButton"
                  onClick={handleDownload}
                >
                  Download Video
                </div> */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

//Function for plan buying and login check

// const handleDownload = async () => {
//   if (localStorage.getItem("currentUser")) {
//     const client = createClient({
//       projectId: process.env.SANITY_PROJECT_ID,
//       dataset: process.env.SANITY_DATASET,
//       token: process.env.SANITY_TOKEN,

//       useCdn: false, // set to `false` to bypass the edge cache
//       apiVersion: "1",
//     });
//     const link =
//       await client.fetch(`*[_type == "news" && _id == "${props.news.id}"][0] {
//       title,
//       "link": newsVideo.asset->url
//     }`);
//     window.location.href = `${link.link}?dl=`;
//   } else {
//     Swal.fire({
//       title: "Can't find user",
//       text: "Please Login / Signup to proceed further!",
//       icon: "info",
//       showCancelButton: true,
//       confirmButtonColor: "#26215c",
//       cancelButtonColor: "#757575",
//       confirmButtonText: "Login / Signup",
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         router.push("/signup");
//       }
//     });
//   }
// };
