import React from "react";
import "./Animaliens.css";
import Proyect2 from "../../images/assets/proyect2.png";
import Coming1 from "../../images/assets/update/coming1.png";
import AnimLog from "../../images/assets/Animaliens Logo.png";
import Exp6 from "../../images/assets/update/exp6.png";
import Golden from "../../images/assets/update/golden.png";
import AnimLogo from "../../images/assets/Animaliens Logo.png";
const Animaliens = () => {
  return (
    <div className="section-slide">
      <div className="section-heading">
        <h1 className="small-txt">EXPLORE</h1>
      </div>
      <div className="exlpore-logo">
        <img src={AnimLog} alt="" />
      </div>
      <div className="explore-flex">
        <div className="indiv-explore exp-5">
          <h1 className="middle-head ">GOLDEN NFT</h1>
          <img className="abs-img" src={Golden} alt="" />
          <p className="num-left">#1</p>
          <p className="right-by">
            by <img src={AnimLogo} alt="" />
          </p>
        </div>
        <div className="indiv-explore exp-1">
          <h1 className="middle-head">ILUSTRATION</h1>
          <img className="abs-img" src={Proyect2} alt="" />
          <p className="num-left">#2</p>
          <p className="right-by">
            by <img src={AnimLogo} alt="" />
          </p>
        </div>
        <div className="indiv-explore exp-6 my-3">
          <h1 className="middle-head  last-had">NFT BRANDING</h1>
          <img className="abs-img" src={Exp6} alt="" />
          <p className="num-left">#3</p>
          <p className="right-by">
            by <img src={AnimLogo} alt="" />
          </p>
        </div>
        <div className="indiv-explore exp-7 my-3">
          <h1 className="middle-head last-had ">COMING SOON</h1>
          <img className="abs-img" src={Coming1} alt="" />
          <p className="num-left">#4</p>
          <p className="right-by" style={{ alignItems: "center" }}>
            by <img src={AnimLogo} alt="" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Animaliens;
