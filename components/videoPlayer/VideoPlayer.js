import React from "react";
import MuxPlayer from "@mux/mux-player-react";
import { ImCross } from "react-icons/im";

const VideoPlayer = (props) => {
  let VideoUrl = props.Video
    ? props.Video.url
    : "https://cdn.sanity.io/files/kbgpbmgs/production/4ab319d2c65d53b84ae81fa5d14a3035aba82b6f.mp4";

  let VideoType = props.Video ? props.Video.mimeType : "video/mp4";

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 90000) + 10000; // Generates a random 5-digit number
  };

  function handleWatchLiveClick() {
    const click = props.handleClick;
    click();
  }

  // const generateRandomPosition = () => {
  //   const position = {
  //     bottom: Math.floor(Math.random() * 20) + 10,
  //     right: Math.floor(Math.random() * 20) + 10,
  //   };
  //   return position;
  // };

  // const cutButton = {
  //   position: "absolute",
  //   top: "7px",
  //   left: "2px",
  //   fontWeight: "500",
  //   paddingBlock: "5px",
  //   paddingInline: "10px",
  //   color: "white",
  // };

  const watchLive = {
    position: "absolute",
    top: "12px",
    right: "10px",
    paddingBlock: "5px",
    paddingInline: "10px",
    fontWeight: "600",
    fontSize: "15px",
    letterSpacing: "0.4p",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
  };

  const watermarkStyle = {
    position: "absolute",
    bottom: "70px",
    right: "30px",
    pointerEvents: "none",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#ffffff",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    zIndex: "9999",
  };

  const watermarkText = generateRandomNumber(); // Generate a random 5-digit number

  // const watermarkPosition = generateRandomPosition(); // Generate random position for the watermark

  // const handleWatchLiveClick = (event) => {
  //   event.stopPropagation();
  //   Handle the button click event here
  //   You can redirect to the desired URL or perform any other action
  // };

  return (
    <div style={{ position: "relative" }}>
      {/* <MuxPlayer
        streamType="on-demand"
        playbackId={props.videoPlayBackId}
        metadata={{
          video_id: "video-id-54321",
          video_title: "Test video title",
          viewer_user_id: "user-id-007",
        }}
      /> */}
      {/* <div style={watermarkStyle}>{watermarkText}</div> */}
      <video width="100%" controls controlsList="nodownload" autoPlay loop>
        <source src={VideoUrl} type={VideoType}></source>
      </video>

      <button style={watchLive} onClick={handleWatchLiveClick}>
        Close Video
      </button>
    </div>
  );
};

export default VideoPlayer;
