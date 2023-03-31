import React, { useState } from "react";
import "./CourseIntro.css";
import { Link } from "gatsby";
import AnimLogo from "../../images/assets/Animaliens Logo.png";
const CourseIntro = () => {
  const [accessChange, setaccessChange] = useState(false);
  let revertAccess = () => {
    if (accessChange === false) {
      setaccessChange(true);
    } else {
      setaccessChange(false);
    }
  };
  return (
    <>
      {accessChange ? (
        <>
          <div className="section-slide my-8 mb-3">
            <div className="intro-course">
              <h1>Ilustration Course</h1>
              <div className="access-flex">
                <h3>
                  by <img src={AnimLogo} alt="" />
                </h3>
              </div>
            </div>
            <div className="holder-heading">
              <Link to="/knowledge">START COURSE</Link>
            </div>
            <div className="brief-coulmns">
              <div className="indiv-brief holder-bg1">
                <h1>#1 INTRO</h1>
                <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.</p>
              </div>
              <div className="indiv-brief holder-bg2">
                <h1>#2 HOW DOES PS WORK?</h1>
                <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.</p>
              </div>
              <div className="indiv-brief holder-bg3">
                <h1>#3 DIGITALIZING YOUR WORK</h1>
                <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="section-slide my-8 mb-3">
            <div className="intro-course">
              <h1>Ilustration Course</h1>
              <div className="access-flex">
                <h3>
                  by <img src={AnimLogo} alt="" />
                </h3>
                <h4>YOU DON’T HAVE ACCESS</h4>
              </div>
            </div>
            <div className="holder-heading">
              <h3 onClick={revertAccess}>BECOME A HOLDER</h3>
            </div>
            <div className="brief-coulmns">
              <div className="indiv-brief">
                <h1>#1 INTRO</h1>
                <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.</p>
              </div>
              <div className="indiv-brief">
                <h1>#2 HOW DOES PS WORK?</h1>
                <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.</p>
              </div>
              <div className="indiv-brief ">
                <h1>#3 DIGITALIZING YOUR WORK</h1>
                <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseIntro;
