import React from "react";

import Metadata from "../components/Metadata";
import { Box, Link } from "@chakra-ui/layout";
// css
import * as aboutStyles from "../styles/About.module.css";

//assets
import zeen from "../images/assets/zame.png";

const About = () => {
  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      {/* main body  */}
      <main>
        {/* mission  start */}
        <div className={aboutStyles.mission}>
          <h2
            style={{
              fontSize: 44,
              fontWeight: 500,
              marginBottom: 60,
              textAlign: "center",
            }}
          >
            MISSION
          </h2>
          <p>
            We are four friends who come from humble backgrounds. We have
            nothing in common but being common. Our camaraderie lies in our
            shared experience of how education has shaped our lives for the
            better. As a result, we have become lifelong learners and stewards
            of educational opportunity. We wanted to combine our skills to do
            something cool in the digital art space, while simultaneously
            creating a meaningful mission behind the project. The purpose of
            Animaliens is to help children all over the world have the
            opportunities to learn the skills they need to live a meaningful
            life. Our mission is not to change the world, but to actually
            improve it through educational opportunities. We hope you will join
            us in our quest for a brighter future.
          </p>
        </div>
        {/* mission end  */}

        {/* OUR TEAM start  */}
        <div className={aboutStyles.ourTeam}>
          <h3
            style={{
              fontSize: 44,
              fontWeight: 500,
              marginBottom: 60,
              textAlign: "center",
            }}
          >
            OUR TEAM
          </h3>
          {/* team members  */}
          <div className={aboutStyles.teamMember}>
            <div className={aboutStyles.memberDes}>
              <h3>ZENN THE HERO</h3>
              <p>
                The mastermind behind the purpose of the project. While a ninja
                is not often seen as a hero, Zame has worked behind the scenes
                to improve access to quality education. A first-generation
                college student himself, he uses his story to inspire the
                younger generation to fulfill their potential. Zame is the hero
                of educational equality.{" "}
              </p>
            </div>
            <div>
              <img src={zeen} alt="" />
            </div>
          </div>
        </div>
        {/* OUR TEAM end */}
      </main>
    </>
  );
};

export default About;

/* 

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            marginTop: 150,
            width: "90%",
            maxWidth: 700,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            About Us
          </div>
          <Box h={3} />
          <div>
            Hey there, we are two crypto enthusiast, who found the true
            potential of Cardano.
            <br /> I'm Alessandro, operator of Berry Pool and creator of Nami
            Wallet. And I'm Zieg, NFT-enthusiast since claiming my first
            CryptoPunk in 2017!
          </div>
          <Box h={3} />
          <img src={TeamImage} />
          <Box h={5} />
          <div
            style={{
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            Token Policy
          </div>
          <Box h={3} />
          <div>
            In order to verify the validity of your SpaceBud, check if the
            Policy ID matches: <br />
            <Box mt={2} mb={3}>
              <Link
                href="https://cardanoscan.io/tokenPolicy/d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc"
                target="_blank"
                wordBreak="break-all"
                fontWeight="medium"
              >
                d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc
              </Link>
            </Box>
            <p>
              Find out more about the Policy ID{" "}
              <Link
                style={{ textDecoration: "underline" }}
                href="https://github.com/Berry-Pool/spacebudz"
                target="_blank"
                underline
              >
                here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

*/
