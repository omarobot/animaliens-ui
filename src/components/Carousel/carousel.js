import React from "react";
import "./carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimLogo from "../../images/assets/Animaliens Logo.png";
import Wild from "../../images/assets/Wild.png";
import Tangs from "../../images/assets/Tangs.png";
import Proyect1 from "../../images/assets/proyect1.png";
import Proyect2 from "../../images/assets/proyect2.png";
import Proyect3 from "../../images/assets/proyect3.png";
import Slider from "react-slick";
const Carousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    autoplay: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="section-slide">
      <div className="section-heading">
        <h1>DISCOVER</h1>
      </div>
      <div className="discover-slider">
        <Slider {...settings}>
          <div>
            <div className="indiv-slide no-margin">
              <div className="slide-left">
                <h1 className="card-head">
                  Plutus101 <br /> Course
                </h1>
                <p className="small-par">
                  by{" "}
                  <div className="small-img">
                    <img src={Wild} alt="" />
                    <img src={Tangs} alt="" />
                  </div>
                </p>
                <div className="card-bttn">
                  <button>Explore Now</button>
                </div>
              </div>
              <div className="slide-right">
                <img src={Proyect1} alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="indiv-slide no-margin">
              <div className="slide-left">
                <h1 className="card-head">
                  Ilustration <br /> Course
                </h1>
                <p className="small-par">
                  by{" "}
                  <div className="small-img anin">
                    <img src={AnimLogo} alt="" />
                  </div>
                </p>
              </div>
              <div className="slide-right">
                <img src={Proyect2} alt="" />
              </div>
            </div>
          </div>

          <div>
            <div className="indiv-slide no-margin">
              <div className="slide-left">
                <h1 className="card-head">
                  Ilustration <br /> Course
                </h1>
                <p className="small-par">
                  by{" "}
                  <div className="small-img anin">
                    <img src={AnimLogo} alt="" />
                  </div>
                </p>
              </div>
              <div className="slide-right">
                <img src={Proyect3} alt="" />
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
