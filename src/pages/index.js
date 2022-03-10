import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import React from "react";
import styled from "styled-components";
import Metadata from "../components/Metadata";
import alien from "../images/assets/alien-with-text.png";
import raffels from "../images/assets/Raffles-1.svg";
import royalties from "../images/assets/Royalties-Animalien-1.svg";
import * as homeStyles from "../styles/Home.module.css";

import roadMap1 from "../images/assets/road-map-1.jpg";
import roadMap2 from "../images/assets/road-map-2.jpg";
import roadMap3 from "../images/assets/road-map-3.jpg";

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
        {/* ROYALTIES & RAFFLES */}
        <div className={homeStyles.royalitiesRaffles}>
          {/* royalities */}
          <div className={homeStyles.royalitiesRafflexBox}>
            <div>
              <h3>ROYALTIES</h3>
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <h4 style={{ fontSize: 30, fontWeight: 700 }}>4%</h4>
                <span>BACK TO THE COMMUNITY</span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <h4 style={{ fontSize: 30, fontWeight: 700 }}>2%</h4>
                <span>PROJECT FUNDING</span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <h4 style={{ fontSize: 30, fontWeight: 700 }}>2%</h4>
                <span>BACK TO THE TEAM</span>
              </div>
            </div>
            <div>
              <img src={royalties} alt="" />
            </div>
          </div>
          {/* royalities */}
          {/* Raffles */}
          <div className={homeStyles.royalitiesRafflexBox}>
            <div>
              <img src={raffels} alt="" />
            </div>
            <div style={{ width: "40%", margin: "auto" }}>
              <h3>RAFFLES</h3>
              <p>
                Each one of your NFTs is a ticket to 2 different raffles: -
                Opportunity to get a portion of ADA from the community wallet or
                Blue Chip CNFTs. - If you have a @edu you’ll be able to
                participate to get your tuition paid for the semester.
              </p>
            </div>
          </div>
          {/* Raffles */}
          {/* road map  */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 60,
              flexDirection: "column",
              padding: "40px 0",
            }}
          >
            <div>
              <img
                style={{ width: "70%", margin: "auto" }}
                src={roadMap1}
                alt=""
              />
            </div>
            <div>
              <img
                style={{ width: "70%", margin: "auto" }}
                src={roadMap2}
                alt=""
              />
            </div>
            <div>
              <img
                style={{ width: "70%", margin: "auto" }}
                src={roadMap3}
                alt=""
              />
            </div>
          </div>
        </div>
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
