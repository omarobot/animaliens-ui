import React from "react";
import "./proyects.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "gatsby";

import Wild from "../../images/assets/Wild.png";
import Tangs from "../../images/assets/Tangs.png";
import AnimLogo from "../../images/assets/Animaliens Logo.png";
import Proyect1 from "../../images/assets/proyect1.png";
import Proyect2 from "../../images/assets/proyect2.png";
import Proyect3 from "../../images/assets/proyect3.png";
import Crown from "../../images/assets/update/crown.png";
const Proyects = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="proyects">
      <div className="section-heading normal-slow">
        <h1>Projects</h1>
        <Link to="/">
          <p>EXPLORE ALL PROJECTS {">"}</p>
        </Link>
      </div>

      <div className="proyect-cards">
        <Slider {...settings}>
          <div>
            <div className="indiv-proyect proyect1">
              <div className="img-logo">
                <img src={Wild} alt="" />
                <img className="trands" src={Tangs} alt="" />
              </div>
              <div className="proyect-anim">
                <img src={Proyect1} alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="indiv-proyect proyect2">
              <div className="img-logo">
                <h3 className="anlogo melogo">
                  <img src={AnimLogo} alt="" />
                </h3>
              </div>
              <div className="proyect-anim">
                <img src={Proyect2} alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="indiv-proyect proyect3">
              <div className="img-logo false">
                <h3>
                  <img className="auto-width" src={Crown} alt="" /> False Idols
                </h3>
              </div>
              <div className="proyect-anim">
                <img src={Proyect3} alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="indiv-proyect proyect2">
              <div className="img-logo">
                <h3 className="anlogo melogo">
                  <img src={AnimLogo} alt="" />
                </h3>
              </div>
              <div className="proyect-anim">
                <img src={Proyect2} alt="" />
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Proyects;
