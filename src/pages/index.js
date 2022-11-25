import { graphql, useStaticQuery } from "gatsby";
// import BackgroundImage from "gatsby-background-image";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import React from "react";
import styled from "styled-components";
import Metadata from "../components/Metadata";
import alien from "../images/assets/nebula entrada.gif";
// import raffels from "../images/assets/Raffles-1.svg";
// import roadMap1 from "../images/assets/road-map-1.jpg";
// import roadMap2 from "../images/assets/road-map-2.jpg";
// import roadMap3 from "../images/assets/road-map-3.jpg";
// import royalties from "../images/assets/market.gif";
// import lotto from "../images/assets/lotto.gif";

// css
import * as homeStyles from "../styles/Home.module.css";

// assets
// import boots from "../images/assets/boots.webp";
// import leen from "../images/assets/lenn.webp";
// import zame from "../images/assets/zame.webp";
// import maq from "../images/assets/maq.webp";
// import learning from "../images/assets/learning-equality.png";
// import nyaka from "../images/assets/nyaka.png";
// import tech2Connect from "../images/assets/tech2Connect.png";
// import cause from "../images/assets/cause.png";
// import eayikies from "../images/assets/eayikies.png";
// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
// import "react-vertical-timeline-component/style.min.css";

const Landing = (props) => {
  const matches = useBreakpoint();

  return (
    <>
      <Metadata
        titleTwitter="Animaliens: The Alien Collective"
        title="Animaliens"
        description="Welcome to the allien collective invading the Cardano blockchain."
      />{" "}
      {/* main body  */}{" "}
      <main className="landin">
        {" "}
        {/* top banner  */}{" "}
        <div className={homeStyles.alien}>
          {/* <img src={alien} alt="" /> */}
        </div>
        {/* project  */}
      </main>{" "}
    </>
  );
};

// const BackgroundSection = (props) => {
//   const data = useStaticQuery(
//     graphql`
//       query {
//         desktop: file(relativePath: { eq: "assets/wallpaper.png" }) {
//           childImageSharp {
//             fluid(quality: 100, maxWidth: 10000) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//       }
//     `
//   );
//   // Set ImageData.
//   const imageData = data.desktop.childImageSharp.fluid;

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
