import React from "react";
import "./WildTangz.css";
import Proyect1 from "../../images/assets/proyect1.png";
import Coming2 from "../../images/assets/update/coming2.png";
import Wild from "../../images/assets/update//wild.svg";
import AnimLogo from "../../images/assets/Animaliens Logo.png";
const WildTangz = () => {
  return (
    <div className="section-slide">
      <div className="exlpore-logo">
        <img src={Wild} alt="" />
      </div>
      <div className="explore-flex">
        <div className="indiv-explore exp-2">
          <h1 className="middle-head alter-head">INTRO</h1>
          <img className="abs-img" src={Proyect1} alt="" />
          <p className="num-left">#1</p>
          <p className="right-by">
            by <img style={{ opacity: 0 }} src={AnimLogo} alt="" />
          </p>
        </div>

        <div className="indiv-explore exp-7  ">
          <h1 className="middle-head last-had ">COMING SOON</h1>
          <img className="abs-img" src={Coming2} alt="" />
          <p className="num-left">#2</p>
          <p className="right-by" style={{ alignItems: "center" }}>
            by <img src={AnimLogo} alt="" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default WildTangz;
