import React from "react";
import "./trending.css";
import { Link } from "gatsby";
import Card1 from "../../images/assets/Card1.png";
import Card2 from "../../images/assets/Card2.png";
import Card3 from "../../images/assets/Card3.png";
import AnimLog from "../../images/assets/Animaliens Logo.png";
import Heart from "../../images/assets/Heart.png";
import EmptyHeart from "../../images/assets/Emptyheart.png";
import Wild from "../../images/assets/update/Component 1.png";
import Crown from "../../images/assets/update/crown.png";
const Trending = () => {
  return (
    <div className="trending-section">
      <div className="section-heading">
        <h1>TRENDING</h1>
      </div>
      <div className="video-cards">
        <div className="indiv-card non-slip">
          <img className="round-card" src={Card1} alt="" />
          <div className="card-detail">
            <div className="detail-upper">
              <div className="detail-left">
                <h3>Introduction</h3>
              </div>
              <div className="detail-right">
                <img src={Heart} alt="" />
                24
              </div>
            </div>
            <h3 className="animsa">
              <img src={Wild} alt="" />
            </h3>
            <div className="card-btn no-mar">
              <Link to="/courses/1">
                <button>Explore Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="indiv-card">
          <img className="round-card" src={Card2} alt="" />
          <div className="card-detail pos1">
            <div className="detail-upper ">
              <div className="detail-left">
                <h3>Ilustration 101</h3>
              </div>
              <div className="detail-right">
                <img src={Heart} alt="" />6
              </div>
            </div>
            <h3 className="anim">
              <img src={AnimLog} alt="" />
            </h3>
            <div className="card-btn ">
              <Link to="/courses/2">
                <button>Explore Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="indiv-card slip">
          <img className="round-card" src={Card3} alt="" />
          <div className="card-detail pos2">
            <div className="detail-upper ">
              <div className="detail-left">
                <h3>NFT Collections</h3>
              </div>
              <div className="detail-right">
                <img src={EmptyHeart} alt="" />
              </div>
            </div>
            <h3 className="crown">
              <img src={Crown} alt="" />
            </h3>
            <div className="card-btn ">
              <Link to="/courses/3">
                <button>Explore Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
