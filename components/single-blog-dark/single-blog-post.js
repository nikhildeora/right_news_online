/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import PortableText from "react-portable-text";
import BlockquoteSection from "./blockquote-section";
import CommentRespondSection from "./comment-respond-section";
import CommentSection from "./comment-section";
import PostNavigation from "./post-navigation";
import TagSection from "./tag-section";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth_context";

export default function SingleBlogPost(props) {
  const [video, setVideo] = useState(true);
  const { activePlan } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (video && activePlan == null) {
      setTimeout(() => {
        setVideo(false);
      }, 8000);
    }
  }, []);

  return (
    <>
      {props.news && (
        <div className="fugu--single-blog-section">
          {/* <img className="fugu--single-thumb" src={props.news.newsImage} alt="" /> */}
          {video ? (
            <div className="fugu--single-thumb single-news-video-container">
              <video width="100%" autoPlay controls controlsList="nodownload">
                <source src={props.news.video.url} type={"video/mp4"}></source>
              </video>
            </div>
          ) : (
            <div className="fugu--blog-thumb single-news-purchase-plan-div">
              <h3 style={{ color: "black" }}>
                Purchase plan to see full length video & access download feature
              </h3>

              <button
                onClick={() => {
                  router.push("/pricing-two");
                }}
                className="Purchase_plan_button_Single_news"
              >
                Purchase Plan
              </button>
            </div>
          )}

          {props.news.newsLongDescription && (
            <PortableText content={props.news.newsLongDescription} />
          )}
          <TagSection />
          <PostNavigation />
        </div>
      )}
    </>
  );
}