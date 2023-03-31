import React from "react";
import Animaliens from "../components/ExploreAnimaliens/Animaliens";
import WildTangz from "../components/ExploreWildTangz/WildTangz";
import ExploreFitness from "../components/ExploreFitness/ExploreFitness";

const Explore = () => {
  return (
    <div className="css-n1ozge ">
      <Animaliens />
      <WildTangz />
      <ExploreFitness />
    </div>
  );
};

export default Explore;
