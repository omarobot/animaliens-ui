import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Metadata from "../components/Metadata";
import * as raffleStyles from "../styles/Raffle.module.css";
import { HiTicket } from "react-icons/hi";
import Countdown from "react-countdown";
import { navigate } from "gatsby";
import kongs from "../images/assets/kongs.webp";
import clay from "../images/assets/clay.webp";
import disco from "../images/assets/disco.webp";
import goats from "../images/assets/goats.webp";
import yummi from "../images/assets/yummi.webp";
import rocket from "../images/assets/rocketclub.webp";
import "../styles/custom.css";

import { db, storage } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const raffleImg = "../../images/assets/";

const Raffles = () => {
  const [raffles, setRaffles] = useState([]);

  // load data from firebase
  const raffleCollection = collection(db, "raffles");

  useEffect(() => {
    const q = query(raffleCollection, orderBy("date", "desc"));

    const getRaffles = async () => {
      const data = await getDocs(q);
      setRaffles(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getRaffles();
  }, []);

  const [countdown, setCountdown] = useState("");
  const Completionist = () => <span> Raffle closed! </span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setCountdown("over");
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          Ends in: {days}
          D: {hours}
          H: {minutes}
          M: {seconds}S{" "}
        </span>
      );
    }
  };
  const handleOnclick = (id) => {
    navigate(`/raffles/${id}`);
  };
  return (
    <>
      <Metadata
        titleTwitter="Animaliens: The Alien Collective"
        title="Raffle"
        description="Collect your unique Animaliens NFT on the Cardano blockchain."
      />{" "}
      {/* main content  */}{" "}
      <main>
        <Box p={2} m={20}>
          <h1 className="raffle_heading"></h1>
          <SimpleGrid
            columns={{
              sm: 1,
              md: 2,
              lg: 3,
            }}
            spacing="40px"
          >
            {" "}
            {raffles.map((raffle, i) => (
              <Box key={raffle.id} height="100%">
                <div
                  className={`${
                    raffle.date < new Date()
                      ? `${raffleStyles.raffleBox}`
                      : `${raffleStyles.raffleBox}` + " " + "closedRaffle"
                  }`}
                >
                  <img
                    className={`${
                      raffle.date < new Date()
                        ? `${raffleStyles.closedRaffleImg}`
                        : ""
                    }`}
                    src={raffle.image}
                    alt=""
                  />
                  <Box
                    sx={{
                      p: 2,
                      textAlign: "center",
                    }}
                  >
                    <Heading
                      as="h3"
                      size={"md"}
                      sx={{
                        textAlign: "center",
                        my: 4,
                      }}
                    >
                      {" "}
                      {raffle.name}{" "}
                    </Heading>{" "}
                    <Flex
                      justifyContent="center"
                      gap={20}
                      sx={{
                        my: 4,
                      }}
                    >
                      {/* <Text
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                        }}
                      >
                        <HiTicket
                          className={`${
                            raffle.date < new Date()
                              ? `${raffleStyles.ticketIconGray}`
                              : `${raffleStyles.ticketIcon}`
                          }`}
                        />{" "}
                        {1}{" "}
                      </Text>{" "} */}
                      <span>
                        {" "}
                        {raffle.winners}
                        &nbsp;Winner(s){" "}
                      </span>{" "}
                      <Box>
                        <Countdown date={raffle.date} renderer={renderer} />{" "}
                      </Box>{" "}
                    </Flex>{" "}
                    {/* <Box
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#30f100",
                        }}
                      >
                        {" "}
                        {raffle.description}{" "}
                      </span>{" "}
                    </Box>{" "} */}
                    {/* <Box>
                      <Countdown date={raffle.date} renderer={renderer} />{" "}
                    </Box>{" "} */}
                  </Box>{" "}
                  <Box className="clickBtn">
                    <button
                      onClick={() => handleOnclick(raffle.id)}
                      className={`${
                        raffle.date < new Date()
                          ? `${raffleStyles.raffleBtnGray}`
                          : `${raffleStyles.raffleBtn}`
                      }`}
                    >
                      {raffle.date < new Date()
                        ? "View Winners"
                        : "Join Raffle"}{" "}
                    </button>{" "}
                  </Box>{" "}
                </div>{" "}
              </Box>
            ))}{" "}
          </SimpleGrid>{" "}
        </Box>{" "}
      </main>{" "}
    </>
  );
};

export default Raffles;
