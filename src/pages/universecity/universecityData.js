import React from "react";
import Carousel from "../../components/Carousel/carousel";
import Explore from "../../components/Explore/explore";
import Proyects from "../../components/Proyects/proyects";
import Trending from "../../components/TrendingCards/trending";
import "../../styles/thehub.css";

const Universecity = () => {
  return (
    <div className="css-n1ozge ">
      <Carousel />
      <Trending />
      <Proyects />
      <Explore />
    </div>
  );
};

export default Universecity;
