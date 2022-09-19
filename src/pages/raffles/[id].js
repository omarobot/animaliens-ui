import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Metadata from "../../components/Metadata";
import * as raffleStyles from "../../styles/Raffle.module.css";
// import raffleImg from "../../images/assets/pantha.webp";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { navigate } from "gatsby";
import Countdown from "react-countdown";
import { GiCrown } from "react-icons/gi";
import { HiTicket } from "react-icons/hi";

import spacebudz from "../../../metadata.json";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase-config";

import { useStoreState } from "easy-peasy";
import Loader from "../../cardano/loader";

// const POLICY = "28341001f186ebe3b47f1515add13df3d8d02aafa19b7b9695ed4157";

// const secrets = {
//   PROJECT_ID: "testnet1RD4umD3NGsxuutiWpxzJLjwv0O7j8Tp",
// };

const POLICY = "e25f63ead710e65dfe69fbbb9945df9b2eb06b4694e765743ea71d43";

const secrets = {
  PROJECT_ID: "mainnetUIZaC3VVQqHx52mVjKBfovo16VQuftQ2",
};

function fromHex(hex) {
  var str = "";
  for (var i = 0; i < hex.length && hex.substr(i, 2) !== "00"; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

const RaffleDes = ({ params }) => {
  // states
  const [raffle, setRaffle] = useState({});
  const [nftConnect, setNftConnect] = useState(true);
  const [nfts, setNfts] = useState();
  const [countdown, setCountdown] = useState("");
  const [tickets, setTickets] = useState(1);
  const [walletAddress, setWalletAddress] = useState();
  const [NFTAddress, setNFTAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [entries, setEntries] = useState([]);
  const [ticketSold, setTicketSold] = useState();
  const [entriesByID, setEntriesByID] = useState(0);
  const [getOrderById, setGetOrderById] = useState([]);
  const [nftExists, setNftExists] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [nftsHeld, setNftsHeld] = useState();
  const [nftNames, setNftNames] = useState();

  const [uniqueEntries, setUniqueEntries] = useState();
  const [uniqueWallets, setUniqueWallets] = useState();

  // get single doc from firebase
  // firebase collection
  const raffleCollection = collection(db, "raffles");
  const ticketsCollection = collection(db, "tickets");

  useEffect(() => {
    const docRef = doc(raffleCollection, params.id);
    getDoc(docRef).then((doc) => {
      setRaffle({ ...doc.data(), id: doc.id });
      let raffle = { ...doc.data(), id: doc.id };
    });
  }, [params.id]);

  const Completionist = () => <span> </span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setCountdown("over");
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          Ends in: {days} D: {hours} H: {minutes} M: {seconds} S
        </span>
      );
    }
  };
  const handleOnclick = (id) => {
    navigate(`/raffles/${id}`);
  };

  const handleOnChange = (e) => {
    const newTickets = parseInt(e);
    // setTickets(e);
    if (nfts >= newTickets) {
      setTickets(newTickets);
    } else {
      setTickets(nfts);
    }
  };

  // save to database
  // wallet address, raffle id, tickets or entries

  const handleSubmit = async () => {
    setIsLoading(true);
    if (nfts !== 0) {
      const batch = writeBatch(db);

      nftNames.forEach((name) => {
        const newDoc = {
          walletAddress,
          NFT: name,
          tickets: 1,
          raffleId: raffle.id,
        };
        // const docRef = await addDoc(ticketsCollection, newWallet);
        let ref = doc(collection(db, "tickets"));

        batch.set(ref, newDoc);
      });

      // Commit the batch
      await batch
        .commit()
        .then((data) => {
          setIsLoading(false);
          alert("Entries submitted successfully.");
          window.location.reload();
        })
        .catch((error) => {
          alert("An error occured. Please try again");
        });
    } else {
      alert("You don't have enough NFTs to buy tickets");
    }
  };

  const updateRaffle = async (id, entries) => {
    if (id && entries >= 0) {
      const raffleRef = doc(db, "raffles", id);
      await updateDoc(raffleRef, {
        entries: entriesByID,
      });
    }
  };
  updateRaffle(raffle?.id, raffle?.entries);

  //====== Connect Wallet Code =============

  const [address, setAddress] = React.useState("");
  const [tokens, setTokens] = React.useState({
    owned: [],
    bids: [],
    offers: [],
  });
  const [isLoading2, setIsLoading2] = React.useState(true);
  const connected = useStoreState((state) => state.connection.connected);
  const didMount = React.useRef(false);
  const isFirstConnect = React.useRef(true);
  const fetchAddressBudz = async (address) => {
    setIsLoading2(true);
    setTokens(null);
    const tokens = {
      owned: [],
      bids: [],
      offers: [],
    };
    let amount;

    const connectedAddresses = connected
      ? (await window.cardano.selectedWallet.getUsedAddresses()).map((addr) =>
          Loader.Cardano.Address.from_bytes(
            Buffer.from(addr, "hex")
          ).to_bech32()
        )
      : [];

    const isOwner = (address) =>
      connectedAddresses.length > 0
        ? connectedAddresses.some((addr) => addr === address)
        : false;

    // if (connected === address) {
    //   await Loader.load();
    //   const value = Loader.Cardano.Value.from_bytes(
    //     Buffer.from(await window.cardano.selectedWallet.getBalance(), "hex")
    //   );

    //   amount = valueToAssets(value);
    // } else {
    amount = await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`,
      {
        headers: {
          project_id: secrets.PROJECT_ID,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.amount);
    // }

    let animaliens = {};
    for (let index = 1; index <= 4444; index++) {
      animaliens[index] = {
        name: "Chamalien #" + index,
      };
    }

    const getEntries = async () => {
      const data = await getDocs(ticketsCollection);

      // setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      let totalEntries = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let existingEntries = 0;
      let namesOfUsedNfts = [];

      totalEntries = totalEntries.filter(
        (entry) => entry.raffleId === params.id
      );

      setUniqueEntries(totalEntries.length);

      let uniqueMap = new Map();

      if (totalEntries.length > 0) {
        totalEntries.forEach((element) => {
          if (
            uniqueMap.get(element.walletAddress) &&
            uniqueMap.get(element.walletAddress).length > 0
          ) {
            let values = uniqueMap.get(element.walletAddress);
            values.push(element.NFT);
          } else {
            uniqueMap.set(element.walletAddress, [...element.NFT]);
          }
        });
      }

      let mapKeys = [...uniqueMap.keys()];

      let keyLength = 0;
      mapKeys.forEach(() => {
        keyLength++;
      });

      setUniqueWallets(mapKeys.length);

      try {
        const ownedAmount = amount
          .filter((am) => am.unit.startsWith(POLICY))
          .map((am) =>
            parseInt(fromHex(am.unit.slice(56)).split("Chamalien")[1])
          );

        const owned = ownedAmount.map((id) => {
          return {
            ...animaliens[id],
            bidPrice: undefined,
          };
        });

        tokens.owned = owned;
        setTokens(tokens);
        setNFTAddress(tokens.owned[0].name);
        // setNfts(tokens.owned.length);
        // setNftsOwned(tokens.owned);
        setNftExists(false);
        let totalNftsOwned = tokens.owned;
        let numNfts = tokens.owned.length;
        let allTickets = 0;
        let newEntriesByID = 0;
        let ordersById = [];

        // console.log("raffle id: =====");
        // console.log(params.id);
        let raffId = params.id;

        setNftsHeld(tokens.owned.length);

        // let uniqueMap = new Map();

        for (let i = 0; i < totalEntries.length; i++) {
          const element = totalEntries[i];

          // if (
          //   uniqueMap.get(element.walletAddress) &&
          //   uniqueMap.get(element.walletAddress).length > 0
          // ) {
          //   let values = uniqueMap.get(element.walletAddress);
          //   values.push(element.NFT);
          // } else {
          //   uniqueMap.set(element.walletAddress, [...element.NFT]);
          // }

          // if (element.walletAddress === walletAddress) {
          //   newTickets += element.tickets;
          //   setNfts(nfts - newTickets);
          // }
          if (element.NFT === NFTAddress) {
            setNftExists(true);
          }

          if (element.raffleId === raffId) {
            totalNftsOwned.forEach((n) => {
              if (n.name === element.NFT) {
                numNfts--;
                existingEntries++;
                namesOfUsedNfts.push(n.name);
              }
            });
            // allTickets++;
            // newEntriesByID += 1;
            // ordersById.push(element);
          }
          // setGetOrderById(ordersById);
          // setTicketSold(allTickets);
          // setEntriesByID(newEntriesByID);
        }

        setNfts(numNfts);
        setEntries(existingEntries);

        // let mapKeys = [...uniqueMap.keys()];

        // let keyLength = 0;
        // mapKeys.forEach(() => {
        //   keyLength++;
        // });

        // console.log("unique entries");
        // console.log(totalEntries.length);

        // console.log("unique wallets");
        // console.log(keyLength);
        // console.log(mapKeys);

        // setUniqueWallets(mapKeys.length);

        let tempArr = [];
        totalNftsOwned.forEach((owned) => {
          let exists = false;
          namesOfUsedNfts.forEach((used) => {
            if (owned.name === used) {
              exists = true;
            }
          });
          if (!exists) {
            tempArr.push(owned.name);
          }
        });

        setNftNames(tempArr);

        // console.log(tokens);
        // console.log("all tickets: " + allTickets);
        // console.log("orders: " + ordersById);
        // console.log("entries: " + entriesByID);
      } catch (e) {}
    };
    getEntries();

    // setTokens(tokens);
    // console.log(tokens);

    setIsLoading2(false);
  };
  const update = async () => {
    let address =
      typeof window !== "undefined" &&
      new URL(window.location.href).searchParams.get("address");
    if (!address) {
      address = connected;
    }
    if (address) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
      setNftsHeld(0);
      setEntries(0);
      setNfts(0);
    }

    console.log(address);

    setAddress(address);
    setWalletAddress(address);
    fetchAddressBudz(address);
  };
  React.useEffect(() => {
    if (didMount.current) {
      if (connected && !isFirstConnect.current) console.log("");
      // window.history.pushState({}, null, `/profile?address=${connected}`);
      else isFirstConnect.current = false;
    } else didMount.current = true;
    window.scrollTo(0, 0);
    update();
  }, [connected]);
  React.useEffect(() => {
    let url = window.location.href;
    const urlChange = setInterval(() => {
      const newUrl = window.location.href;
      if (url !== newUrl) {
        url = newUrl;
        update();
      }
    });
    return () => clearInterval(urlChange);
  }, []);

  return (
    <>
      <Metadata
        titleTwitter="Animaliens: The Alien Collective"
        title="Raffle"
        description="Collect your unique Animaliens NFT on the Cardano blockchain."
      />{" "}
      {/* main content  */}{" "}
      <main>
        <Container maxW={"800px"} p={2} my={20}>
          {" "}
          {raffle.date > new Date() ? (
            <Box>
              <Flex
                justifyContent="center"
                gap={20}
                sx={{
                  my: 4,
                }}
              >
                <Text
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <HiTicket color="#30f100" /> Total entries: {uniqueEntries}
                </Text>{" "}
                <Text
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <GiCrown color="#30f100" /> Unique wallets: {uniqueWallets}
                </Text>{" "}
              </Flex>{" "}
            </Box>
          ) : (
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img width={200} src={raffle?.image} alt="" />
              </Box>{" "}
              <Box
                sx={{
                  my: 8,
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
                  {raffle.name}{" "}
                </Heading>{" "}
                {/* <Flex
                  justifyContent="center"
                  gap={2}
                  sx={{
                    my: 4,
                  }}
                >
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FaDiscord color="#30f100" />
                  </a>{" "}
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FaTwitter color="#30f100" />
                  </a>
                </Flex> */}
              </Box>
            </Box>
          )}{" "}
          <Box
            sx={{
              mt: 20,
            }}
            className={raffleStyles.singleRaffleBox}
          >
            {" "}
            {raffle.date > new Date() ? (
              <div>
                <Box
                  sx={{
                    my: 8,
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
                    {raffle.name}{" "}
                  </Heading>{" "}
                  {walletConnected && nftsHeld && nftsHeld > 0 ? (
                    <>
                      <p
                        size={"sm"}
                        style={{
                          textAlign: "center",
                          my: 1,
                          color: "rgb(48, 241, 0)",
                        }}
                      >
                        NFTs Detected: {nftsHeld}{" "}
                      </p>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </Box>{" "}
                <Flex
                  gap={10}
                  sx={{
                    my: 4,
                    alignItems: "end",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <img width={200} src={raffle.image} alt="" />
                  </Box>{" "}
                  <Box>
                    <Box
                      sx={{
                        my: 4,
                      }}
                    >
                      <Heading
                        as="h3"
                        size="md"
                        sx={{
                          my: 2,
                        }}
                      >
                        Winner(s){" "}
                      </Heading>{" "}
                      <Text as="span"> 1 </Text>{" "}
                    </Box>{" "}
                    <Box
                      sx={{
                        mt: 4,
                        mb: 8,
                      }}
                    >
                      <Heading
                        as="h3"
                        size="md"
                        sx={{
                          my: 2,
                        }}
                      >
                        Price{" "}
                      </Heading>
                      <Text as="span"> 1 NFT = 1 Ticket </Text>{" "}
                    </Box>{" "}
                    <Box>
                      {!nftExists && (
                        <>
                          {nfts > 0 && (
                            <NumberInput
                              onChange={handleOnChange}
                              defaultValue={nfts}
                              min={nfts}
                              max={nfts}
                              keepWithinRange={true}
                              clampValueOnBlur={false}
                              style={{ pointerEvents: "none" }}
                            >
                              <NumberInputField
                                className={raffleStyles.inputField}
                              />{" "}
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>{" "}
                            </NumberInput>
                          )}
                        </>
                      )}
                    </Box>{" "}
                  </Box>{" "}
                  <Box>
                    {/* <Box
                      sx={{
                        my: 4,
                      }}
                    >
                      <Heading
                        as="h3"
                        size="md"
                        sx={{
                          my: 2,
                        }}
                      >
                        Collection Size{" "}
                      </Heading>{" "}
                      <Text as="span"> 8888 </Text>{" "}
                    </Box>{" "} */}
                    <Box
                      sx={{
                        mt: 4,
                        mb: 8,
                      }}
                    >
                      <Heading
                        as="h3"
                        size="md"
                        sx={{
                          my: 2,
                        }}
                      >
                        Raffle Ends{" "}
                      </Heading>{" "}
                      <Box>
                        <Countdown date={raffle.date} renderer={renderer} />{" "}
                      </Box>{" "}
                    </Box>{" "}
                    {walletConnected === true ? (
                      <>
                        {nfts === 0 || !nftsHeld || nftsHeld === 0 ? (
                          <>
                            <Box
                              sx={{
                                mt: 4,
                                mb: 8,
                              }}
                            >
                              <Heading
                                as="h3"
                                size="md"
                                sx={{
                                  my: 2,
                                  color: "red",
                                }}
                              >
                                Woah, not so fast.
                              </Heading>{" "}
                              <Box style={{ color: "red" }}>
                                You already have max entries or no NFTs
                              </Box>{" "}
                            </Box>{" "}
                          </>
                        ) : (
                          <>
                            {isLoading ? (
                              <Box>
                                <Heading></Heading>
                                <Button
                                  onClick={handleSubmit}
                                  disabled={nftConnect ? false : true}
                                  colorScheme="green"
                                >
                                  <Spinner />
                                </Button>
                              </Box>
                            ) : (
                              <Button
                                onClick={handleSubmit}
                                disabled={nftConnect ? false : true}
                                colorScheme="green"
                              >
                                {nftConnect
                                  ? `Buy ${nfts} ticket(s)`
                                  : `Connect your wallet`}
                              </Button>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            mt: 4,
                            mb: 8,
                          }}
                        >
                          <Heading
                            as="h3"
                            size="md"
                            sx={{
                              my: 2,
                              color: "red",
                            }}
                          >
                            No wallet detected!{" "}
                          </Heading>{" "}
                          <Box style={{ color: "red" }}>
                            Please connect your wallet.
                          </Box>{" "}
                        </Box>{" "}
                      </>
                    )}
                    {/* {nfts === 0 ? (
                      <Button disabled colorScheme="green">
                        You already have max entries or no NFTs
                      </Button>
                    ) : (
                      <>
                        {isLoading ? (
                          <Button
                            onClick={handleSubmit}
                            disabled={nftConnect ? false : true}
                            colorScheme="green"
                          >
                            <Spinner />
                          </Button>
                        ) : (
                          <Button
                            onClick={handleSubmit}
                            disabled={nftConnect ? false : true}
                            colorScheme="green"
                          >
                            {nftConnect
                              ? `Buy ${tickets} ticket(s)`
                              : `Connect your wallet`}
                          </Button>
                        )}
                      </>
                    )} */}
                  </Box>{" "}
                </Flex>{" "}
                <div>
                  {entries > 0 && walletConnected ? (
                    <div
                      style={{
                        marginTop: "50px",
                        color: "rgb(48, 241, 0)",
                        border: "2px solid rgb(48, 241, 0)",
                        padding: "5px",
                      }}
                    >
                      {" "}
                      <Text sx={{ textAlign: "center" }}>
                        You already have {entries} entrie(s) submitted. Good
                        luck!
                      </Text>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div>
                  {nfts > 0 ||
                    (!nftExists && (
                      <>
                        {nfts <= tickets && (
                          <Text sx={{ textAlign: "center" }}>
                            You have only {nfts} NFTs available
                          </Text>
                        )}
                      </>
                    ))}
                </div> */}
              </div>
            ) : (
              <div>
                <TableContainer>
                  <Table colorScheme="green" variant="unstyled">
                    <Thead>
                      <Tr>
                        <Th> Wallet </Th>{" "}
                      </Tr>{" "}
                    </Thead>{" "}
                    <Tbody>
                      <Tr>
                        <Td style={{ fontSize: "10px" }}>
                          addr1q9d9ua6n90rgvuxlpg7p0quvtzdfz39xjxj0u5u22nyqcxf20hgg7qtd5fzmplqml075mp8dq4saw9f6ndp8xjqyzsgsgwvdp2
                        </Td>
                      </Tr>{" "}
                      {/* {winners.map((winner) => (
                        <Tr key={winner.id}>
                          <Td> {winner.wallet} </Td> <Td> {raffle.entries} </Td>{" "}
                          <Td>
                            {" "}
                            {winner.claim === "yes" ? (
                              <Text color="#30f100"> Claimed </Text>
                            ) : (
                              ""
                            )}{" "}
                          </Td>{" "}
                        </Tr>
                      ))}{" "} */}
                    </Tbody>{" "}
                  </Table>{" "}
                </TableContainer>{" "}
              </div>
            )}{" "}
          </Box>{" "}
        </Container>{" "}
      </main>{" "}
    </>
  );
};

export default RaffleDes;
