import React from "react";
import Carousel from "../components/Carousel/carousel";
import Proyects from "../components/Proyects/proyects";
import Trending from "../components/TrendingCards/trending";
import Universecity from "../components/Universecity/Universecity";
import "../styles/thehub.css";

const Thehub = () => {
  return (
    <div className="css-n1ozge">
      {/* <Carousel />
      <Trending />
      <Proyects /> */}
      <Universecity />
    </div>
  );
};

export default Thehub;
