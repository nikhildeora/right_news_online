import React from "react";
import Link from "next/link";

import { useState } from "react";

import VideoPlayer from "../videoPlayer/VideoPlayer";

const NewsCard = (props) => {
  const [video, setVideo] = useState(true);
  let videoPlayBackId = props.news.video.playbackId;

  let Date = props.news.createdAt.slice(0, 10);

  function handleClick() {
    if (video) {
      setVideo(false);
    } else {
      setVideo(true);
    }
  }

  return (
    <div className="fugu--blog-filtering row">
      <div className="col-12">
        <div className="fugu--portfolio-wrap row" id="fugu--two-column">
          <div
            className="collection-grid-item analysis wow fadeInUpX col-lg-6 col-sm-12"
            data-wow-delay="0s"
          >
            <div className="fugu--blog-wrap">
              <div>
                {video ? (
                  <div className="fugu--blog-thumb">
                    <img
                      src={props.news.newsImage}
                      alt="News Image"
                      onClick={handleClick}
                    />
                    <div className="fugu--blog-badge">
                      {props.news.newsCategory}
                    </div>
                  </div>
                ) : (
                  <div className="fugu--blog-thumb">
                    <VideoPlayer
                      handleClick={handleClick}
                      videoPlayBackId={videoPlayBackId}
                    ></VideoPlayer>
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
                  <Link href="single-blog-dark">
                    <h3 style={{ color: "#ffffff" }}>{props.news.newsTitle}</h3>
                  </Link>
                </div>
                <p>{props.news.newsShortDescription}</p>
                <div className="">
                  <a
                    href="https://api.mux.com/video/v1/assets/OG6Zq19uOjRkjO3bISLWasE2M01Cx8O3o"
                    className="fugu--btn fugu--menu-btn1"
                  >
                    Download Video
                  </a>
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
