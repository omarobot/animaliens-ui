import React from "react";
import "./proyects.css";
import Wild from "../../images/assets/Wild.png";
import Tangs from "../../images/assets/Tangs.png";
import AnimLogo from "../../images/assets/Animaliens Logo.png";
import Proyect1 from "../../images/assets/proyect1.png";
import Proyect2 from "../../images/assets/proyect2.png";
import Proyect3 from "../../images/assets/proyect3.png";

const Proyects = () => {
  return (
    <div className="proyects">
      <div className="section-heading">
        <h1> PROJECTS </h1>{" "}
      </div>{" "}
      <div className="proyect-cards">
        <div className="indiv-proyect proyect1">
          <div className="img-logo">
            <img src={Wild} alt="" />
            <img className="trands" src={Tangs} alt="" />
          </div>{" "}
          <div className="proyect-anim">
            <img src={Proyect1} alt="" />
          </div>{" "}
        </div>{" "}
        <div className="indiv-proyect proyect2">
          <div className="img-logo">
            <h3 className="anlogo melogo">
              <img src={AnimLogo} alt="" />
            </h3>{" "}
          </div>{" "}
          <div className="proyect-anim">
            <img src={Proyect2} alt="" />
          </div>{" "}
        </div>{" "}
        <div className="indiv-proyect proyect3">
          <div className="img-logo false">
            <h3> False Idols </h3>{" "}
          </div>{" "}
          <div className="proyect-anim">
            <img src={Proyect3} alt="" />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Proyects;
