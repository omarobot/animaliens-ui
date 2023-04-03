import React from "react";
import VideoProto from "../../images/assets/video-proto.png";
import "./video.css";
import Wild from "../../images/assets/Wild.png";
import Tangs from "../../images/assets/Tangs.png";
import Smallnft from "../../images/assets/smallnft.png";
import PurpleHeart from "../../images/assets/purpleHeart.png";
import Vimeo from "@u-wave/react-vimeo";

const Video = () => {
  return (
    <div className="video-section">
      {" "}
      {/* <img className="vid-prop" src={VideoProto} alt="" /> */}{" "}
      <Vimeo className="vid-prop" video="383334794" responsive />
      <div className="video-detail">
        <div className="video-title">
          <h3> Plutus 101 Course </h3>{" "}
          <div className="tag-img">
            <p> by </p>{" "}
            <div className="log">
              <img src={Wild} alt="" />
              <img src={Tangs} alt="" />
              <img src={Smallnft} alt="" />
            </div>{" "}
          </div>{" "}
        </div>
        <div className="video-heart">
          <img src={PurpleHeart} alt="" />
          667{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Video;
