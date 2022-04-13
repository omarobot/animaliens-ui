import React from "react";

import Metadata from "../components/Metadata";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { Box, Link, Grid, GridItem } from "@chakra-ui/layout";

const Tutorial = (props) => {
  const matches = useBreakpoint();

  const openPaymentWindow = async () => {
    const paymentUrl =
      "https://payment-testnet.nft-maker.io/?p=e83ce1c8b5a64d9b8a5276125e9fe694&c=1";

    // Specify the popup width and height
    const popupWidth = 500;
    const popupHeight = 700;

    // Calculate the center of the screen
    const left =
      window.top.outerWidth / 2 + window.top.screenX - popupWidth / 2;
    const top =
      window.top.outerHeight / 2 + window.top.screenY - popupHeight / 2;

    const popup = window.open(
      paymentUrl,
      "NFT-MAKER PRO Payment Gateway",
      `popup=1, location=1, width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`
    );

    // Show dim background
    document.body.style = "background: rgba(0, 0, 0, 0.5)";

    // Continuously check whether the popup has been closed
    const backgroundCheck = setInterval(function () {
      if (popup.closed) {
        clearInterval(backgroundCheck);

        console.log("Popup closed");

        // Remove dim background
        document.body.style = "";
      }
    }, 1000);
  };

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      <img
        src="https://pro.nft-maker.io/images/buttons/paybutton_1_1.svg"
        onClick={openPaymentWindow}
      ></img>
      <div
        style={{
          padding: "100px 0",
        }}
      >
        <div>
          <h2 className="howToBuy title"> COMING SOON </h2>{" "}
          <div className="video">
            <iframe
              // width="560"
              // height="315"
              src="https://www.youtube.com/embed/inwnVerWbJo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default Tutorial;
