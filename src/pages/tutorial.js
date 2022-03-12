import React from "react";

import Metadata from "../components/Metadata";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { Box, Link, Grid, GridItem } from "@chakra-ui/layout";

const Tutorial = (props) => {
  const matches = useBreakpoint();

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      <div
        style={{
          padding: "100px 0",
        }}
      >
        <div>
          <h2 className="howToBuy">HOW TO BUY</h2>
          <div className="video">
            <iframe
              // width="560"
              // height="315"
              src="https://www.youtube.com/embed/inwnVerWbJo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutorial;
