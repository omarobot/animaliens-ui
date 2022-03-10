import React from "react";
import { LaunchButton } from "../components/Button";
import Metadata from "../components/Metadata";

//assets
import BuySellIcon from "../images/assets/buysell.svg";
import CollectHoldIcon from "../images/assets/collecthold.svg";
import ShareGiftIcon from "../images/assets/sharegift.svg";
import BudRepresent from "../images/assets/spacebud.svg";
import { navigate } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiDiscord, mdiTelegram, mdiTwitter } from "@mdi/js";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import * as homeStyles from "../styles/Home.module.css";
import alien from "../images/assets/alien-with-text.png";

const Landing = (props) => {
  const matches = useBreakpoint();

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      {/* main body  */}
      <main>
        {/* top banner  */}
        <div className={homeStyles.alien}>
          <img src={alien} alt="" />
        </div>

        {/* project  */}

        <div className={homeStyles.project}>
          <h3>THE PROJECT</h3>
          <p>
            Animaliens is a series of 8,888 hand drawn Chamaliens, each one of
            them with unique characteristics which makes it a 1/1 Animalien only
            you'll be able to have. The purpose of Animaliens is to help
            children all over the world have the opportunities to learn the
            skills they need to live a meaningful life. Our mission is not to
            change the world, but to actually improve it through educational
            opportunities.
          </p>
        </div>
        {/* ROYALTIES  */}
        <div className={homeStyles.royalities}></div>
      </main>
    </>
  );
};

const BackgroundSection = (props) => {
  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "assets/wallpaper.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 10000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );
  // Set ImageData.
  const imageData = data.desktop.childImageSharp.fluid;

  return (
    <BackgroundImage
      className={props.className}
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      {props.children}
    </BackgroundImage>
  );
};

const Background = styled(BackgroundSection)`
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Landing;
