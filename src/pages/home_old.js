import React from "react";
import { LaunchButton } from "../components/Button";
import Metadata from "../components/Metadata";

//assets
// import BuySellIcon from "../images/assets/buysell.svg";
// import CollectHoldIcon from "../images/assets/collecthold.svg";
// import ShareGiftIcon from "../images/assets/sharegift.svg";
// import BudRepresent from "../images/assets/spacebud.svg";
import { navigate } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiDiscord, mdiTelegram, mdiTwitter } from "@mdi/js";
import { Box, SimpleGrid } from "@chakra-ui/layout";

const Landing = (props) => {
  const matches = useBreakpoint();

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      <div>
        {" "}
        <Box h={20} />{" "}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* What is SpaceBudz */}{" "}
          <div
            style={{
              maxWidth: 800,
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src={BudRepresent} width="20%" style={{ minWidth: 100 }} /> */}{" "}
            <div>
              <div
                style={{
                  fontSize: 32,
                  textAlign: "center",
                }}
              >
                What is SpaceBudz ?
              </div>{" "}
              <Box h={4} />{" "}
              <div
                style={{
                  fontWeight: 350,
                  maxWidth: 500,
                  lineHeight: 1.8,
                  fontSize: 17,
                }}
              >
                SpaceBudz is an NFT platform on the Cardano blockchain.10, 000
                SpaceBudz are in existence and each astronaut is unique and only
                owned by you.Animals, robots and other mysterious creatures with
                different features and properties await you!
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Why */} <Box h={20} />{" "}
          <div
            style={{
              fontSize: 32,
            }}
          >
            {" "}
            Why get a SpaceBud ?{" "}
          </div>{" "}
          <Box h={3} />{" "}
          <div
            style={{
              textAlign: "center",
              fontWeight: 350,
              maxWidth: 600,
              width: "90%",
              fontSize: 17,
              lineHeight: 1.8,
            }}
          >
            NFTs fundamentally change how people can collect and trade art.We
            strongly believe that it 's here to stay. Everyone can build up a
            digital collection and share it with others.SpaceBudz leverages this
            experience with the use of the Cardano multi asset ledger.{" "}
          </div>
          {/* Contact */} <Box h={20} />{" "}
          <div
            style={{
              fontSize: 32,
            }}
          >
            {" "}
            Still clueless ?{" "}
          </div>{" "}
          <Box h={3} />{" "}
          <div
            style={{
              fontWeight: "350",
            }}
          >
            {" "}
            Reach out to us on{" "}
          </div>{" "}
          <Box h={4} />{" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777777",
            }}
          >
            <Icon
              style={{
                cursor: "pointer",
              }}
              onClick={() => window.open("https://twitter.com/spacebudzNFT")}
              path={mdiTwitter}
              size={1.2}
            />{" "}
            <Box w={5} />{" "}
            <Icon
              style={{
                cursor: "pointer",
              }}
              onClick={() => window.open("https://t.me/spacebudz")}
              path={mdiTelegram}
              size={1.2}
            />{" "}
            <Box w={5} />
            <Icon
              style={{
                cursor: "pointer",
              }}
              onClick={() => window.open("https://discord.gg/ePJZBVwQNq")}
              path={mdiDiscord}
              size={1.2}
            />{" "}
          </div>{" "}
        </div>{" "}
        <Box h={20} />{" "}
      </div>{" "}
    </>
  );
};

// const BackgroundSection = (props) => {
//   const data = useStaticQuery(
//     graphql`
//       query {

//       }
//     `
//   );
//   // Set ImageData.
//   // const imageData = data.desktop.childImageSharp.fluid;

//   return (
//     <BackgroundImage
//       className={props.className}
//       fluid={imageData}
//       backgroundColor={`#040e18`}
//     >
//       {props.children}{" "}
//     </BackgroundImage>
//   );
// };

// const Background = styled(BackgroundSection)`
//   width: 100%;
//   min-height: 100vh;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;

export default Landing;
