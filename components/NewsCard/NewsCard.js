import React, { useEffect } from "react";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/router";

import VideoPlayer from "../videoPlayer/VideoPlayer";

const NewsCard = (props) => {
  const [video, setVideo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (video) {
      setTimeout(() => {
        setVideo(!video);
      }, 7000);
    }
  }, [video]);

  let Video = props.news.video;

  let Date = props.news.createdAt.slice(0, 10);

  let classValue = `collection-grid-item wow fadeInUpX col-lg-6 col-sm-12 ${props.news.Catagory.catagoryName}`;

  function handleClick() {
    setVideo(!video);
  }

  //Function for plan buying and login check

  const handleDownload = () => {
    if (localStorage.getItem("currentUser")) {
      router.push("/pricing-two");
    } else {
      alert("Please login to download video");
      router.push("/signup");
    }
  };

  return (
    <div className="fugu--blog-filtering row ">
      <div className="col-12">
        <div className="fugu--portfolio-wrap row" id="fugu--two-column">
          <div className={classValue} data-wow-delay="0s">
            <div className="fugu--blog-wrap">
              <div>
                {video ? (
                  <div className="fugu--blog-thumb">
                    <VideoPlayer
                      handleClick={handleClick}
                      Video={Video}
                    ></VideoPlayer>
                  </div>
                ) : (
                  <div className="fugu--blog-thumb">
                    <img
                      src={props.news.newsImage}
                      alt="News Image"
                      onClick={handleClick}
                    />
                    <div className="fugu--blog-badge">
                      {props.news.Catagory.catagoryName}
                    </div>
                  </div>
                )}
              </div>
              <div className="fugu--blog-content">
                <div className="fugu--blog-date">
                  <ul>
                    <li>
                      <Link href="/">
                        <img src="/images/svg2/calendar.svg" alt="" />
                        {Date}
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <img src="/images/svg2/clock.svg" alt="" />5 min read
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="fugu--blog-title">
                  {/* <Link href="single-blog-dark"> */}
                  <h3 style={{ color: "#ffffff" }}>{props.news.newsTitle}</h3>
                  {/* </Link> */}
                </div>
                <p>{props.news.newsShortDescription}</p>
                <div
                  className="fugu--btn fugu--menu-btn1 downloadButton"
                  onClick={handleDownload}
                >
                  Download Video
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
