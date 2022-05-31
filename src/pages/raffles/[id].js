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
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Metadata from "../../components/Metadata";
import * as raffleStyles from "../../styles/Raffle.module.css";
import raffleImg from "../../images/assets/pantha.webp";
import { HiTicket } from "react-icons/hi";
import { AiFillFire } from "react-icons/ai";
import { GiCrown } from "react-icons/gi";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { navigate } from "gatsby";
import Countdown from "react-countdown";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const winners = [
  {
    id: "1",
    wallet: "C9Azhh87saDj884qmcpKhiewN2doby47sKb4hXG3Z9x6	",
    entries: 3,
    claim: "no",
  },
  {
    id: "2",
    wallet: "C9Azhh87saDj884qmcpKhiewN2doby47sKb4hXG3Z9x6	",
    entries: 3,
    claim: "yes",
  },
  {
    id: "3",
    wallet: "C9Azhh87saDj884qmcpKhiewN2doby47sKb4hXG3Z9x6	",
    entries: 3,
    claim: "yes",
  },
  {
    id: "4",
    wallet: "C9Azhh87saDj884qmcpKhiewN2doby47sKb4hXG3Z9x6	",
    entries: 3,
    claim: "no",
  },
];

const RaffleDes = ({ params }) => {
  console.log(params.id);
  const [countdown, setCountdown] = useState("");
  const [tickets, setTickets] = useState(1);
  const Completionist = () => <span></span>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setCountdown("over");
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          Ends in: {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  const handleOnclick = (id) => {
    navigate(`/raffles/${id}`);
  };

  const handleOnChange = (e) => {
    setTickets(e);
  };
  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="Raffle"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      {/* main content  */}
      <main>
        <Container maxW={"800px"} p={2} my={20}>
          {countdown !== "over" ? (
            <Box>
              <Flex justifyContent="center" gap={20} sx={{ my: 4 }}>
                <Text sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <HiTicket color="#30f100" /> Tickets sold: 100
                </Text>
                <Text sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <AiFillFire color="#30f100" /> $DUST spent: 210
                </Text>
                <Text sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <GiCrown color="#30f100" /> Unique wallets: 26
                </Text>
              </Flex>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img width={200} src={raffleImg} alt="" />
              </Box>
              <Box sx={{ my: 8 }}>
                <Heading
                  as="h3"
                  size={"md"}
                  sx={{ textAlign: "center", my: 4 }}
                >
                  Name
                </Heading>
                <Flex justifyContent="center" gap={2} sx={{ my: 4 }}>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FaDiscord color="#30f100" />
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FaTwitter color="#30f100" />
                  </a>
                </Flex>
              </Box>
            </Box>
          )}
          <Box sx={{ mt: 20 }} className={raffleStyles.singleRaffleBox}>
            {countdown !== "over" ? (
              <div>
                <Box sx={{ my: 8 }}>
                  <Heading
                    as="h3"
                    size={"md"}
                    sx={{ textAlign: "center", my: 4 }}
                  >
                    Name
                  </Heading>
                  <Flex justifyContent="center" gap={2} sx={{ my: 4 }}>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <FaDiscord color="#30f100" />
                    </a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <FaTwitter color="#30f100" />
                    </a>
                  </Flex>
                </Box>
                <Flex gap={20} sx={{ my: 4 }}>
                  <Box>
                    <img width={200} src={raffleImg} alt="" />
                  </Box>
                  <Box>
                    <Box sx={{ my: 4 }}>
                      <Heading as="h3" size="md" sx={{ my: 2 }}>
                        Whitelist Spots
                      </Heading>
                      <Text as="span">45</Text>
                    </Box>
                    <Box sx={{ mt: 4, mb: 8 }}>
                      <Heading as="h3" size="md" sx={{ my: 2 }}>
                        Price
                      </Heading>
                      <Text as="span">2 $DUST/ticket</Text>
                    </Box>
                    <Box>
                      {/* <button className={raffleStyles.minusBtn}> - </button>
                    <input
                      className={raffleStyles.inputField}
                      type="number"
                      value={1}
                    />
                    <button className={raffleStyles.plusBtn}>+</button> */}
                      <NumberInput
                        onChange={handleOnChange}
                        defaultValue={1}
                        min={1}
                        max={20}
                      >
                        <NumberInputField className={raffleStyles.inputField} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ my: 4 }}>
                      <Heading as="h3" size="md" sx={{ my: 2 }}>
                        Collection Size
                      </Heading>
                      <Text as="span">6666</Text>
                    </Box>
                    <Box sx={{ mt: 4, mb: 8 }}>
                      <Heading as="h3" size="md" sx={{ my: 2 }}>
                        Raffle Ends
                      </Heading>
                      <Box>
                        <Countdown
                          date={Date.now() + 10000}
                          renderer={renderer}
                        />
                      </Box>
                    </Box>
                    <Button colorScheme="green">
                      Buy {tickets} ticket (s){" "}
                    </Button>
                  </Box>
                </Flex>
              </div>
            ) : (
              <div>
                <TableContainer>
                  <Table colorScheme="green" variant="unstyled">
                    <Thead>
                      <Tr>
                        <Th>Wallet</Th>
                        <Th>Entries</Th>
                        <Th>Claim</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {winners.map((winner) => (
                        <Tr key={winner.id}>
                          <Td>{winner.wallet}</Td>
                          <Td>{winner.entries}</Td>
                          <Td>
                            {winner.claim === "yes" ? (
                              <Text color="#30f100">Claimed</Text>
                            ) : (
                              ""
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </Box>
        </Container>
      </main>
    </>
  );
};

export default RaffleDes;
