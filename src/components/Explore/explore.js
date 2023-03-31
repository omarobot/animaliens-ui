import React from "react";
import { Link } from "gatsby";
import Proyect1 from "../../images/assets/proyect1.png";
import Proyect2 from "../../images/assets/proyect2.png";
import C3 from "../../images/assets/update/c3.png";
import C4 from "../../images/assetS/update/c4.png";

import Coch from "../../images/assets/update/coch.png";
import AnimLogo from "../../images/assets/Animaliens Logo.png";
import "./explore.css";
const Explore = () => {
  return (
    <div className="proyects my-8">
      <div className="section-heading normal-slow">
        <h1>EXPLORE</h1>
        <Link to="/explore">
          <p>EXPLORE ALL {">"}</p>
        </Link>
      </div>
      <div className="explore-flex">
        <div className="indiv-explore exp-1">
          <h1 className="middle-head">ILUSTRATION</h1>
          <img className="abs-img" src={Proyect2} alt="" />
          <p className="num-left">#2</p>
          <p className="right-by">
            by <img src={AnimLogo} alt="" />
          </p>
        </div>
        <div className="indiv-explore exp-2">
          <h1 className="middle-head alter-head">INTRO</h1>
          <img className="abs-img" src={Proyect1} alt="" />
          <p className="num-left">#1</p>
          <p className="right-by">
            by <img style={{ opacity: 0 }} src={AnimLogo} alt="" />
          </p>
        </div>
        <div className="indiv-explore exp-3 my-3">
          <h1 className="middle-head alter-head">INTRO</h1>
          <img className="abs-img" src={C3} alt="" />
          <p className="num-left">#1</p>
          <p className="right-by">
            by <img style={{ opacity: 0 }} src={AnimLogo} alt="" />
          </p>
        </div>
        <div className="indiv-explore exp-4 my-3">
          <h1 className="middle-head last-had ">INDOOR CYCLING</h1>
          <img className="abs-img" src={C4} alt="" />
          <p className="num-left">#1</p>
          <p className="right-by" style={{ alignItems: "center" }}>
            by <img src={Coch} alt="" />
          </p>
        </div>
      </div>
      <Link to="/explore">
        <h3 className="all-exp">EXPLORE ALL {">"}</h3>
      </Link>
    </div>
  );
};

export default Explore;
