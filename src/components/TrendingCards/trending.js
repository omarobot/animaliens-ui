import React from "react";
import "./trending.css";
import Card1 from "../../images/assets/Card1.png";
import Card2 from "../../images/assets/Card2.png";
import Card3 from "../../images/assets/Card3.png";
import AnimLog from "../../images/assets/Animaliens Logo.png";
import Heart from "../../images/assets/Heart.png";
import EmptyHeart from "../../images/assets/Emptyheart.png";
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
                <h3>Plutus 101</h3>
              </div>
              <div className="detail-right">
                <img src={Heart} alt="" />
                24
              </div>
            </div>
            <div className="card-btn">
              <button>Explore Now</button>
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
            <div className="card-btn no-mar">
              <button>Explore Now</button>
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
            <div className="card-btn">
              <button>Explore Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
