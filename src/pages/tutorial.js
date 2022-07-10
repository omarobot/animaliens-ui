import React, { useEffect, useRef, useState } from "react";

import Metadata from "../components/Metadata";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { useTransition, animated } from "react-spring";
// import { Box, Link, Grid, GridItem } from "@chakra-ui/layout";
import data from "../data.js";
import shuffle from "lodash/shuffle";
import { Button } from "@chakra-ui/react";
import Confetti from "react-confetti";
// import HeadingImage from './images/heading.svg';
import HeadingImage from "../images/assets/heading.svg";
// import Alien from "../images/assets/drippy.png";

const Tutorial = (props) => {
  const [names, setNames] = useState(data);
  const [initialLoad, setInitialLoad] = useState(false);
  const [windowHeight, setWindowHeight] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wraffling, setWraffling] = useState(false);
  const confettiWrapper = useRef(null);
  const height = 60;

  const matches = useBreakpoint();

  // const openPaymentWindow = async () => {
  //   const paymentUrl =
  //     "https://payment-testnet.nft-maker.io/?p=e83ce1c8b5a64d9b8a5276125e9fe694&c=1";

  //   // Specify the popup width and height
  //   const popupWidth = 500;
  //   const popupHeight = 700;

  //   // Calculate the center of the screen
  //   const left =
  //     window.top.outerWidth / 2 + window.top.screenX - popupWidth / 2;
  //   const top =
  //     window.top.outerHeight / 2 + window.top.screenY - popupHeight / 2;

  //   const popup = window.open(
  //     paymentUrl,
  //     "NFT-MAKER PRO Payment Gateway",
  //     `popup=1, location=1, width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`
  //   );

  //   // Show dim background
  //   document.body.style = "background: rgba(0, 0, 0, 0.5)";

  //   // Continuously check whether the popup has been closed
  //   const backgroundCheck = setInterval(function () {
  //     if (popup.closed) {
  //       clearInterval(backgroundCheck);

  //       console.log("Popup closed");

  //       // Remove dim background
  //       document.body.style = "";
  //     }
  //   }, 1000);
  // };

  //============

  const transitions = useTransition(
    names.map((data, i) => ({ ...data, y: 0.5 * i })),
    (d) => d.wallet,
    {
      from: { position: "initial", opacity: 0 },
      leave: {
        height: height - height * 0.2,
      },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
    }
  );

  function startRaffle() {
    if (names.length <= 1) {
      setWraffling(true);
      setShowConfetti(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    const filterOutNames = names.filter((name) => name !== names[randomIndex]);
    setNames(filterOutNames);
    setInitialLoad(true);
  }

  function restartRaffle() {
    setInitialLoad(false);
    setNames(data);
    setWraffling(false);
    setShowConfetti(false);
  }

  useEffect(() => {
    if (initialLoad) {
      const filteringTimer = setTimeout(() => {
        startRaffle();
      }, 100);
      return () => clearTimeout(filteringTimer);
    }
  }, [names, startRaffle, initialLoad]);

  useEffect(() => {
    setWindowHeight(confettiWrapper.current.clientHeight);
    setWindowWidth(confettiWrapper.current.clientWidth);
  }, []);

  return (
    <div className="container" ref={confettiWrapper}>
      <div className="raffle-header">
        <img className="banner-image" src={HeadingImage} alt="heading logo" />
        {/* <img className="alien" src={Alien} alt="heading logo" /> */}

        {!initialLoad && (
          <div className="raffle-header__buttons">
            <Button
              onClick={startRaffle}
              rounded="3xl"
              size="lg"
              style={{
                backgroundColor: "#30f100",
                color: "black",
              }}
              width="min"
            >
              Start Raffle
            </Button>
            {/* <Button
              onClick={() => setNames(shuffle(names))}
              rounded="3xl"
              size="lg"
              style={{
                backgroundColor: "#30f100",
                color: "black",
              }}
              width="min"
            >
              Shuffle
            </Button> */}
            {/* <button className="button-primary" onClick={startRaffle}>
              Start Raffle
            </button> */}
            {/* <button
              className="button-outline"
              onClick={() => setNames(shuffle(names))}
            >
              Shuffle
            </button> */}
          </div>
        )}
      </div>
      {wraffling && (
        <Confetti
          recycle={showConfetti}
          numberOfPieces={80}
          width={windowWidth}
          height={windowHeight}
        />
      )}
      <div className="raffle-names">
        {transitions.map(({ item, props: { y, ...rest }, index }) => (
          <animated.div
            className="raffle-listnames"
            key={index}
            style={{
              transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
              ...rest,
            }}
          >
            <div className="raffle-namelist">
              <span>{item.wallet}</span>
            </div>
          </animated.div>
        ))}
      </div>
      <div>
        {showConfetti && (
          <div className="raffle-ends">
            <h3>Congratulations! You have won the raffle!</h3>
            {/* <button className="button-outline" onClick={restartRaffle}>
              Replay
            </button> */}
          </div>
        )}
      </div>
    </div>
  );

  //============

  // return (
  //   <>
  //     <Metadata
  //       titleTwitter="SpaceBudz: Collectible Astronauts"
  //       title="SpaceBudz"
  //       description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
  //     />
  //     <img
  //       src="https://pro.nft-maker.io/images/buttons/paybutton_1_1.svg"
  //       onClick={openPaymentWindow}
  //     ></img>
  //     <div
  //       style={{
  //         padding: "100px 0",
  //       }}
  //       className="container" ref={confettiWrapper}
  //     >
  //       <div>
  //         <h2 className="howToBuy title"> COMING SOON </h2>{" "}
  //         <div>
  //           <Button
  //             onClick={startRaffle}
  //             rounded="3xl"
  //             size="md"
  //             style={{
  //               backgroundColor: "#30f100",
  //             }}
  //             // colorScheme="purple"
  //             width="min"
  //           >
  //             Start Raffle
  //           </Button>
  //           <Button
  //             onClick={() => setNames(shuffle(names))}
  //             rounded="3xl"
  //             size="md"
  //             style={{
  //               backgroundColor: "#30f100",
  //             }}
  //             // colorScheme="purple"
  //             width="min"
  //           >
  //             Shuffle
  //           </Button>

  //           {names.map((names, index) => (
  //             <div key={index}>
  //               <ul>
  //                 <li>{names.wallet}</li>
  //               </ul>
  //             </div>
  //           ))}
  //         </div>
  //         <div className="video">
  //           <iframe
  //             // width="560"
  //             // height="315"
  //             src="https://www.youtube.com/embed/inwnVerWbJo"
  //             title="YouTube video player"
  //             frameborder="0"
  //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //             allowfullscreen
  //           ></iframe>{" "}
  //         </div>{" "}
  //       </div>{" "}
  //     </div>{" "}
  //   </>
  // );
};

export default Tutorial;
