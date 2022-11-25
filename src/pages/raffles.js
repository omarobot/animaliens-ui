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

const raffles2 = [
  {
    _id: "6213f5a3a7361ccf1737be91",
    name: "Chilled Kongs #2618",
    symbol: "monke#2618",
    supply: 1,
    price: 10,
    endDate: "2022-02-25T22:00:00.000Z",
    ended: false,
    image: kongs,
    category: "NFT",
    winners: [
      {
        wallet: "GTuGp7A5vzDGTDnCahv9NWNSDyVnXcNc6HvavWfBUpPQ",
        entries: 3,
        claimed: true,
      },
    ],
    collectionSize: "6000",
    discord: "https://discord.gg/monkerejects",
    twitter: "https://twitter.com/MonkeRejects",
    website: "https://www.solmonkerejects.com/",
  },
  {
    _id: "6213f5a3a7361ccf1737be92",
    name: "Disco Solaris #1454",
    symbol: "monkelabs#1454",
    supply: 1,
    price: 10,
    endDate: "2022-02-23T08:00:00.000Z",
    ended: true,
    image: disco,
    category: "NFT",
    winners: [
      {
        wallet: "CCTKbKm7sf35H5EcVeF5ZqcXH6koqjrQmT8iQmFUmxR3",
        entries: 12,
      },
    ],
    collectionSize: "3000",
    discord: "https://discord.gg/RgdeB4StKM",
    twitter: "https://twitter.com/monkelabs",
  },
  {
    _id: "6213f5a3a7361ccf1737b105",
    name: "Clay Nation #4416",
    symbol: "FFF#4416",
    supply: 1,
    price: 10,
    endDate: "2022-03-06T07:00:00.000Z",
    image: clay,
    category: "NFT",
    winners: [
      {
        wallet: "HjUYMeyM5sS5XHb2Y2pxPwcV2JJVNmJaQkxnnExLSYxV",
        entries: 3,
      },
    ],
    collectionSize: "7777",
    discord: "https://discord.com/invite/famousfoxes",
    twitter: "https://twitter.com/FamousFoxFed",
    website: "https://famousfoxes.com/",
  },
  {
    _id: "6213f5a3a7361ccf1737b104",
    name: "Boss Cat Rocket Club #513",
    symbol: "monkelabs#513",
    supply: 1,
    price: 10,
    endDate: "2022-03-06T07:00:00.000Z",
    ended: true,
    image: rocket,
    category: "NFT",
    winners: [
      {
        wallet: "B3zEaCwHz5rCh7DYjefJtmVVSoPw7bGfbMBkYqMMxQce",
        entries: 64,
      },
    ],
    collectionSize: "3000",
    discord: "https://discord.gg/RgdeB4StKM",
    twitter: "https://twitter.com/monkelabs",
    website: "https://monkelabs.io/",
  },
  {
    _id: "6213f5a3a7361ccf1737b100",
    name: "Goat Tribe",
    symbol: "infinitygirls",
    supply: 30,
    price: 10,
    endDate: "2022-03-06T07:00:00.000Z",
    ended: false,
    image: goats,
    category: "Whitelist spots",
    winners: [
      {
        wallet: "69CrqwR2991ihGcDsPgVg7UPKrqTQGRVu4yn9z8aeefQ",
        entries: 1,
      },
      {
        wallet: "J5cHj88WabPLAF7WgqJH7nxvfTt2QxSvJLxmBERmrTsN",
        entries: 3,
        claimed: true,
      },
      {
        wallet: "4aP8LahHZP9usQ5yNBs2Q5Hdzph94xTKy3VH3vFZ547b",
        entries: 13,
        claimed: true,
      },
      {
        wallet: "8xmUfSLpWJn7TkTwPcrnCsgMgywkeAEctDjM5UfAQ6FH",
        entries: 1,
      },
      {
        wallet: "GehuR33q35zkg5muKHXUG9GjRfsWhHrMUG4hBYwiXNQ7",
        entries: 1,
      },
      {
        wallet: "GsDT3J74Hbfc7jPn82x2p6C8gyRwm94C87GDrTTRh91J",
        entries: 2,
      },
      {
        wallet: "BQ2ErKuvV1FRFnFLudLEmYDfrqTA1Vr9jiwRiQVA4KLk",
        entries: 1,
      },
      {
        wallet: "8mH8NH2NJhCAUrJCG2aEcrU8cmiMwSbUEy4NXgR7b5fD",
        entries: 3,
        claimed: true,
      },
      {
        wallet: "8wfEuLYT12g8Va4U9xvcCnHCG9iKheM9hEhbfDMBbdwP",
        entries: 1,
        claimed: true,
      },
      {
        wallet: "58V5wyKLcq3W3vhzKfdYPD2pM6SNGbXw4iTTtLC5ENhG",
        entries: 1,
      },
      {
        wallet: "BmpPzXh4Ma4iGTPCe1B5XzeRCWcE6FdHd3rH7FMUQv6k",
        entries: 1,
      },
      {
        wallet: "6hx7ZA3pNvbafRmBmmdR4sRyokNz42jHeo1CpCeVE6Kh",
        entries: 1,
        claimed: true,
      },
      {
        wallet: "3JMbyoUwREWRJQs5312WcNU3pqRE1B7TmbPSwpgYss4s",
        entries: 1,
      },
      {
        wallet: "DevZDRd6VUaugAke76Ybbu9be5Yh4QwPt9LbSnQ9YDCT",
        entries: 1,
        claimed: true,
      },
      {
        wallet: "4UVg3pm2Nz1XVbasCKjrWE7sHK8a6f82faRXMzVGktHi",
        entries: 5,
      },
      {
        wallet: "4Dt9sfqfUckUbR5vgYiPzDoGUxbGqYp4T5iKZySnesSC",
        entries: 5,
        claimed: true,
      },
      {
        wallet: "6GhmfotPFjdytjZi6GzxMk4axtpbN78hLmeA8b4rLqrR",
        entries: 1,
        claimed: true,
      },
      {
        wallet: "3cjC2nsbuKqx9ENsLuZjKUSkzB1V7dqY9JTPnTpuF77E",
        entries: 1,
        claimed: true,
      },
      {
        wallet: "5JqENY4tdkRchppRaS8KRc4UcjPdLuLjSrA4Ybz5JDbB",
        entries: 1,
      },
      {
        wallet: "5iAyM54XmqL2BhKhRRrpgNQs5wwixY7DgvneZ22FLLm3",
        entries: 1,
        claimed: true,
      },
      {
        wallet: "14hKF1ctdXkGeYBHooDGdGqFKptP4WSWq56Yux5bhiE6",
        entries: 2,
      },
      {
        wallet: "BcVK7QJ9sdSDVYJy8LJgnbRN4TzsAGnYC1i4yHBpUpom",
        entries: 1,
      },
      {
        wallet: "6MmnUMYXxJGVSD8GP93mvuJ6W3aicUAs1gtzX5ntxV5W",
        entries: 10,
        claimed: true,
      },
      {
        wallet: "73pjLFSaDv8Hg6cfB8fgyayrGsmuPnN5Q7KBH3mt4Lep",
        entries: 5,
        claimed: true,
      },
      {
        wallet: "6WivJpDqUEhuRHKuepJzaBpV3pXG9sittFj7iUsbDEjf",
        entries: 1,
      },
      {
        wallet: "vcwwC1Aq12yc3PuiJvCrQSutSBoqtN6KtmvxrScsSBZ",
        entries: 1,
      },
      {
        wallet: "5pZycMPGMprLwwE4NRAbdMoWDgqJhH4zY8KZVXswy5iy",
        entries: 2,
      },
      {
        wallet: "3S8YCwSA9gEtSQktyiKTNfz1wrmq2CPaZU8MrTCjZsg3",
        entries: 3,
        claimed: true,
      },
      {
        wallet: "qi5CSAYUcyaut3mxYZWQumJZHwWviU3KhMEsuhAJCPH",
        entries: 1,
      },
      {
        wallet: "9xzCrsESV45B8XfiGTCxULMrkLUscJa6imAjESn4MRkk",
        entries: 1,
        claimed: true,
      },
    ],
    collectionSize: "3333",
    twitter: "https://twitter.com/infinity__girls",
    discord: "https://discord.gg/infinitygirlsnft",
    website: "https://infinitygirls.io/",
  },
  {
    _id: "6213f5a3a7361ccf1737b200",
    name: "Yummi Universe #5693",
    symbol: "QuantumTrader#5693",
    supply: 1,
    price: 10,
    endDate: "2022-03-12T10:00:00.000Z",
    image: yummi,
    category: "NFT",
    winners: [
      {
        wallet: "Bhj4oHSMXKNfFYuuuK951rCUFTTjSqCFFoMH3BtXEMD4",
        entries: 1,
      },
    ],
    collectionSize: "8888",
    discord: "https://discord.gg/2qJsRSeGN8",
    twitter: "https://twitter.com/QuantumTraders_",
    website: "https://www.yawww.io/",
  },
  // {
  //   _id: "6213f5aba7361ccf1737be95",
  //   name: "Cats On Crack",
  //   symbol: "catsoncrack",
  //   supply: 10,
  //   price: 10,
  //   endDate: "2022-02-23T08:00:00.000Z",
  //   ended: true,
  //   image: "/catsoncrack.jpeg",
  //   website: "https://catsoncrack.xyz/",
  //   twitter: "https://twitter.com/catsoncrack_",
  //   category: "Whitelist spots",
  //   winners: [
  //     {
  //       wallet: "BUBJ6c7CXLxTeB4RxXCNXLm5iHFGXujmSw9aTTX6z3u",
  //       entries: 5,
  //       claimed: true,
  //     },
  //     {
  //       wallet: "Aet5jqp44n8X8y3gm6bzHXd6BpWTWFJNkG5GdaCAhUv9",
  //       entries: 15,
  //       claimed: true,
  //     },
  //     {
  //       wallet: "2BfHRMiMdYpBn9GVhKZyaMBqpgchyGJNiRhYarAmg8gG",
  //       entries: 20,
  //       claimed: true,
  //     },
  //     {
  //       wallet: "8JKMbMHgF7mPmt8d9QK9NHJFZU2n6TuH8DofykdSBptc",
  //       entries: 3,
  //       claimed: true,
  //     },
  //     {
  //       wallet: "GAMJukrJwUf9fatECxEDV6kz7hvzLA51hfhq3EGeF6WP",
  //       entries: 1,
  //       claimed: true,
  //     },
  //     {
  //       wallet: "FcH1hr2HF6rhpvcjUQ4ggvbJ9y228VSz7QnYdJrfex8G",
  //       entries: 1,
  //       claimed: true,
  //     },
  //     {
  //       wallet: "6fevqx3pzSgwvYquHRBywkH2Sg6NTnZW6tt6CoaCBd9N",
  //       entries: 1,
  //       claimed: true,
  //     },
  //     {
  //       wallet: "Z3mEG89HKsCpSyq5xx2z7srNN2VgHLsp5Dn5TagZwnq",
  //       entries: 3,
  //     },
  //     {
  //       wallet: "BYFdJ4K7LLahu7H9bSafDb1dGcKqqatgR9Zm8W8kYGp3",
  //       entries: 20,
  //       claimed: true,
  //     },
  //     {
  //       wallet: "7nyuePN3uqGYad7sntL1ThLT3VxWzEkFG6iGP4WFbe7S",
  //       entries: 6,
  //       claimed: true,
  //     },
  //   ],
  //   collectionSize: "6969",
  // },
  // {
  //   _id: "6213f5a3a7361ccf1737b106",
  //   name: "Solana Money Boy #3724",
  //   symbol: "SMBoy#3724",
  //   supply: 1,
  //   price: 10,
  //   endDate: "2022-03-06T07:00:00.000Z",
  //   image: "/SolanaMoneyBoy3724.png",
  //   category: "NFT",
  //   winners: [
  //     {
  //       wallet: "8NfL1oNAwGyKX1ESHk1ffaP3nEXkEiHeL5qpXaGrATvh",
  //       entries: 14,
  //     },
  //   ],
  //   collectionSize: "4444",
  //   discord: "https://discord.com/invite/Ju33zkjCGe",
  //   twitter: "https://twitter.com/SolanaMoneyBoys",
  //   website: "https://www.solanamoneyboys.com/",
  // },
  // {
  //   _id: "6213f5a3a7361ccf1737b103",
  //   name: "The Simians #344",
  //   symbol: "thesimians#344",
  //   supply: 1,
  //   price: 10,
  //   endDate: "2022-03-06T07:00:00.000Z",
  //   image: "/TheSimians344.png",
  //   category: "NFT",
  //   winners: [
  //     {
  //       wallet: "4W9mfGkogM3vYxemp1We5sPcCGX3Dyz756k64ei4UZ95",
  //       entries: 1,
  //       claimed: true,
  //     },
  //   ],
  //   collectionSize: "1110",
  //   discord: "https://discord.gg/Simians",
  //   twitter: "https://twitter.com/SimiansNFT",
  //   website: "https://simiansuniverse.com/",
  // },
  {
    _id: "622ef3cfae15062720fddefe",
    symbol: "NukedApe #2280",
    __v: 0,
    category: "NFT",
    collectionSize: "4200",
    discord: "https://discord.gg/stonedapecrew",
    endDate: "2022-03-15T09:00:00.000Z",
    image:
      "https://www.arweave.net/ilCDrHVlAeSb1iotkWRsOueaC8BvLnOFHbhDlw4HOnc?ext=png",
    name: "Nuked Ape #2280",
    price: 10,
    supply: 1,
    twitter: "https://twitter.com/StonedApeCrew",
    winners: [
      {
        wallet: "5yKE32DeWdHvS8Z6UGukBRZaTJX5bhYu5bMh58KyyfeS",
        entries: 18,
      },
    ],
  },
];

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
          <h1 className="raffle_heading">RAFFLES</h1>
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
