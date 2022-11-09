import React, { useState, useRef, useEffect } from "react";

import Metadata from "../components/Metadata";
import { Box, Link } from "@chakra-ui/layout";
// css
import * as aboutStyles from "../styles/About.module.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2F1Y2lzbSIsImEiOiJjbGE2Z2x3cmcwdDYyM25uOGw1cGIyZGZtIn0.9wMEOwdt-scbkYdOA2PPIw";

const About = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/saucism/cla6lah0k000015lhwerthdmh",
      center: [lng, lat],
      zoom: zoom,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  });

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />{" "}
      {/* main body  */}{" "}
      <main>
        <Box
          style={{
            width: "100%",
            height: "100vh",
          }}
          // p={2}
          // m={20}
        >
          <div
            ref={mapContainer}
            className="map-container"
            style={{
              position: "fixed !important",
              height: "100vh",
            }}
          />{" "}
        </Box>
      </main>{" "}
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
