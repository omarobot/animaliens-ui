import React from "react";
import "./ExploreFitness.css";
import Coch from "../../images/assets/update/coch.png";
import C4 from "../../images/assetS/update/c4.png";
import Coming3 from "../../images/assets/update/coming3.png";
import Fitness from "../../images/assets/update/FITNESS.png";
const ExploreFitness = () => {
  return (
    <div className="section-slide">
      <div className="exlpore-logo">
        <img src={Fitness} alt="" />
      </div>
      <div className="explore-flex">
        <div className="indiv-explore exp-4  ">
          <h1 className="middle-head last-had ">INDOOR CYCLING</h1>
          <img className="abs-img" src={C4} alt="" />
          <p className="num-left">#1</p>
          <p className="right-by" style={{ alignItems: "center" }}>
            by <img src={Coch} alt="" />
          </p>
        </div>

        <div className="indiv-explore exp-7  ">
          <h1 className="middle-head last-had ">COMING SOON</h1>
          <img className="abs-img" src={Coming3} alt="" />
          <p className="num-left">#2</p>
          <p className="right-by" style={{ alignItems: "center" }}>
            by <img src={Coch} alt="" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreFitness;
