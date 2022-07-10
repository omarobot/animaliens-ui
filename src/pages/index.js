import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import React from "react";
import styled from "styled-components";
import Metadata from "../components/Metadata";
import alien from "../images/assets/ezgif.com-gif-maker.gif";
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
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

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
      <main>
        {" "}
        {/* top banner  */}{" "}
        <div className={homeStyles.alien}>
          <img src={alien} alt="" />
        </div>
        {/* project  */}
        <div
          className={homeStyles.project}
          style={{
            marginBottom: 50,
          }}
        >
          <h3 className="title"> THE PROJECT </h3>{" "}
          <p>
            Animaliens is a series of 8, 888 hand drawn Chamaliens, each one of
            them with unique characteristics which makes it a 1 / 1 Animalien
            only you 'll be able to have. The purpose of Animaliens is to help
            children all over the world have the opportunities to learn the
            skills they need to live a meaningful life.Our mission is not to
            change the world, but to actually improve it through educational
            opportunities.{" "}
          </p>{" "}
        </div>{" "}
        {/* Marketplace  */}
        {/* <div
          className={homeStyles.project}
          style={{
            marginBottom: 50,
          }}
        >
          <div>
            <h3 className="title"> THE STORE </h3>{" "}
            <ul className={`${homeStyles.marketList}`}>
              <li>Marketplace (No service fees)</li>
              <li>Buy NFT Raffle Tickets</li>
              <li>Enter NFT Auctions</li>{" "}
            </ul>{" "}
          </div>
          <div>
            <img src={royalties} alt="" />
          </div>{" "}
        </div>{" "} */}
        {/* ROYALTIES & RAFFLES */}{" "}
        <div className={homeStyles.royalitiesRaffles}>
          {" "}
          {/* royalities */}{" "}
          <div
            className={`${homeStyles.royalitiesRafflexBox} ${homeStyles.royalities}`}
          >
            <div
              className={`${homeStyles.marketSection} ${homeStyles.marketList}`}
            >
              <div>
                <h3 className="title"> THE STORE </h3>{" "}
                <div
                  className={homeStyles.royalitiesDes}
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span> Marketplace </span>{" "}
                </div>{" "}
                <div
                  className={homeStyles.royalitiesDes}
                  style={{
                    display: "flex",
                    gap: 24,
                    // alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span> Enter Weekly Raffles </span>{" "}
                </div>{" "}
                <div
                  className={homeStyles.royalitiesDes}
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span> Enter NFT Auctions </span>{" "}
                </div>{" "}
              </div>
            </div>{" "}
            <div
              className={`${homeStyles.marketSection} ${homeStyles.marketImg}`}
            >
              {/* <img src={royalties} alt="" /> */}
            </div>{" "}
          </div>{" "}
          {/* royalities */} {/* Raffles */}{" "}
          <div className={homeStyles.royalitiesRafflexBox}>
            <div>{/* <img src={raffels} alt="" /> */}</div>{" "}
            <div
              className={homeStyles.raffels}
              style={{
                width: "40%",
                margin: "auto",
              }}
            >
              <h3 className="title"> RAFFLES </h3>{" "}
              <p>
                Each one of your NFTs is a ticket to 2 different raffles: -
                Opportunity to get a portion of ADA from the community wallet or
                Blue Chip CNFTs. - If you have a @edu you will be able to
                participate to get your tuition paid for the semester.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Raffles */}
          {/* Lotto */}{" "}
          <div
            className={`${homeStyles.royalitiesRafflexBox} ${homeStyles.royalities} ${homeStyles.lottoSection}`}
          >
            <div
              className={`${homeStyles.marketSection} ${homeStyles.marketList}`}
            >
              <div>
                <div>
                  <h3 className="title"> THE LOTTERY </h3>{" "}
                  <div
                    className={homeStyles.royalitiesDes}
                    style={{
                      display: "flex",
                      gap: 24,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <span>
                      {" "}
                      Each minted NFT will produce a lottery ticket; the more
                      NFTs, the more chances to win. Once all our NFTs have been
                      minted, we will livestream a tuition lottery. The winner
                      of this lottery will decide to use the funds for tuition,
                      student loans, or other. See FAQ for more info.{" "}
                    </span>{" "}
                  </div>{" "}
                </div>
              </div>
            </div>{" "}
            <div
              className={`${homeStyles.marketSection} ${homeStyles.marketImg}`}
            >
              {/* <img src={lotto} alt="" /> */}
            </div>{" "}
          </div>{" "}
          {/* roadmap  */}
          <div
            className={homeStyles.project}
            style={{
              marginBottom: 50,
              marginTop: 50,
            }}
          >
            <h3 className="title"> ROADMAP </h3>{" "}
          </div>{" "}
          <div>
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "rgb(110 48 255)", color: "#fff" }}
                // date="2011 - present"
                iconStyle={{ background: "#30F100", color: "#fff" }}
                icon=""
              >
                <h3 className="vertical-timeline-element-title">
                  Create NFT Collection
                </h3>
                {/* <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4> */}
                <p>8,888 handrawn, programmatically generated NFTs</p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // date="2006 - 2008"
                contentStyle={{ background: "rgb(110 48 255)", color: "#fff" }}
                iconStyle={{ background: "#30F100", color: "#fff" }}
                icon=""
              >
                <h3 className="vertical-timeline-element-title">
                  Secret Traits
                </h3>
                <p>
                  Each Animaliens will be encrypted with a secret trait within
                  the metadata. The secret trait can only be unlocked inside
                  Planet Diablo.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // date="2010 - 2011"
                contentStyle={{ background: "rgb(110 48 255)", color: "#fff" }}
                iconStyle={{ background: "#30F100", color: "#fff" }}
                icon=""
              >
                <h3 className="vertical-timeline-element-title">Marketplace</h3>
                {/* <h4 className="vertical-timeline-element-subtitle">
                San Francisco, CA
              </h4> */}
                <p>
                  Our marketplace will be our project store. Here you will be
                  able to buy raffle tickets, participate in auctions, trade our
                  NFTs without service fees, and much more. Eventually you will
                  be able to make purchases using our project token, $IEN.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // date="2008 - 2010"
                contentStyle={{ background: "rgb(110 48 255)", color: "#fff" }}
                iconStyle={{ background: "#fff", color: "#fff" }}
                icon=""
              >
                <h3 className="vertical-timeline-element-title">
                  Alienlist (Whitelist)
                </h3>
                <p>
                  Join our discord to embark on challenges and earn a whitelist
                  spot.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // date="2006 - 2008"
                contentStyle={{ background: "rgb(110 48 255)", color: "#fff" }}
                iconStyle={{ background: "#fff", color: "#fff" }}
                icon=""
              >
                <h3 className="vertical-timeline-element-title">
                  Planet Urus (Mint)
                </h3>
                <p>
                  Each Animaliens NFT you mint will automatically grant you a
                  raffle ticket to our tuition contest (more info up top). You
                  will also automatically be teleported to Planet Urus to begin
                  your journey.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                // date="April 2013"
                contentStyle={{ background: "rgb(110 48 255)", color: "#fff" }}
                iconStyle={{ background: "#fff", color: "#fff" }}
                icon=""
              >
                <h3 className="vertical-timeline-element-title">Token</h3>
                <p>
                  We will be launching $IEN, our project's native token that
                  will be used to power our ecosystem.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                // date="November 2012"
                contentStyle={{ background: "rgb(110 48 255)", color: "#fff" }}
                iconStyle={{ background: "#fff", color: "#30F100" }}
                icon=""
              >
                <h3 className="vertical-timeline-element-title">Staking</h3>
                {/* <h4 className="vertical-timeline-element-subtitle">
                Certification
              </h4> */}
                <p>
                  You will be able to stake your NFTs to earn $IEN. You will be
                  able to use $IEN to migrate to the other planets, purchase
                  raffle tickets, buy other NFTs, merchandise, and much much
                  more.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                // date="2002 - 2006"
                contentStyle={{ background: "rgb(110 48 255)", color: "#fff" }}
                iconStyle={{ background: "#fff", color: "#fff" }}
                icon=""
              >
                <h3 className="vertical-timeline-element-title">
                  Planet Diablo (Passage)
                </h3>
                <p>
                  Planet Diablo will open up for passage. Only 4,444 Animaliens
                  will be allowed access. You can gain access on our starship by
                  burning 1 Animalien or buying a boarding pass with $IEN.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                // date="2002 - 2006"
                contentStyle={{ background: "#fff", color: "rgb(110 48 255)" }}
              >
                <h3 className="vertical-timeline-element-year">2023</h3>
              </VerticalTimelineElement>
              {/* <VerticalTimelineElement /> */}
            </VerticalTimeline>
          </div>
          {/* road map  start */}{" "}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 60,
              flexDirection: "column",
              padding: "40px 0",
            }}
          >
            <div className={homeStyles.roadmap}>
              <img
                style={{
                  width: "100%",
                  margin: "auto",
                }}
                src={roadMap1}
                alt=""
              />
            </div>{" "}
            <div className={homeStyles.roadmap}>
              <img
                style={{
                  width: "100%",
                  margin: "auto",
                }}
                src={roadMap2}
                alt=""
              />
            </div>{" "}
            <div className={homeStyles.roadmap}>
              <img
                style={{
                  width: "100%",
                  margin: "auto",
                }}
                src={roadMap3}
                alt=""
              />
            </div>{" "}
          </div>{" "} */}
          {/* road map end */}
          {/* THE TEAM start */}{" "}
          {/* <div className={homeStyles.teamSection}>
            <h2
              style={{
                fontSize: 64,
                fontWeight: 700,
                marginTop: 80,
                marginBottom: 80,
                textAlign: "center",
              }}
              className="title"
            >
              THE TEAM{" "}
            </h2>{" "}
            <div className={homeStyles.team}>
              <div className={homeStyles.teamMember}>
                <div className={homeStyles.memberImg}>
                  <img src={boots} alt="" />
                </div>{" "}
                <div>
                  <h3> BOOTS </h3> <h4> The Explorer </h4>{" "}
                </div>{" "}
              </div>
              <div className={homeStyles.teamMember}>
                <div className={homeStyles.memberImg}>
                  <img src={leen} alt="" />
                </div>{" "}
                <div>
                  <h3> LENN </h3> <h4> The Creator </h4>{" "}
                </div>{" "}
              </div>
              <div className={homeStyles.teamMember}>
                <div className={homeStyles.memberImg}>
                  <img src={zame} alt="" />
                </div>{" "}
                <div>
                  <h3> ZAME </h3> <h4> The Hero </h4>{" "}
                </div>{" "}
              </div>
              <div className={homeStyles.teamMember}>
                <div className={homeStyles.memberImg}>
                  <img src={maq} alt="" />
                </div>{" "}
                <div>
                  <h3> MAQ </h3> <h4> The Wise </h4>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "} */}
          {/* the team end  */} {/* PROUDLY SUPPORTING start  */}{" "}
          <div
            className={homeStyles.supporting}
            style={{
              padding: "80px 0",
            }}
          >
            <h3
              style={{
                fontSize: 64,
                fontWeight: 700,
                marginBottom: 60,
                textAlign: "center",
              }}
              className="title"
            >
              PROUDLY SUPPORTING{" "}
            </h3>{" "}
            {/* <div className={homeStyles.supportLogo}>
              <div>
                <img src={learning} alt="" />
              </div>{" "}
              <div>
                <img src={nyaka} alt="" />
              </div>{" "}
              <div>
                <img src={tech2Connect} alt="" />
              </div>{" "}
              <div>
                <img src={cause} alt="" />
              </div>{" "}
              <div>
                <img src={eayikies} alt="" />
              </div>{" "}
            </div>{" "} */}
          </div>{" "}
          {/* PROUDLY SUPPORTING end  */}{" "}
        </div>{" "}
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
