import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import MiddleEllipsis from "react-middle-ellipsis";
import { navigate } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import Metadata from "../components/Metadata";
import styled from "styled-components";
import {
  ShareModal,
  TradeModal,
  SuccessTransactionToast,
  PendingTransactionToast,
  tradeErrorHandler,
} from "../components/Modal";
import { Share2 } from "@geist-ui/react-icons";
import { Box, Text } from "@chakra-ui/layout";
import {
  Link,
  Tooltip,
  Button,
  ButtonGroup,
  IconButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon, RepeatIcon } from "@chakra-ui/icons";
import { useStoreState } from "easy-peasy";
import Market from "../cardano/market";
// import secrets from "../../secrets";
import { UnitDisplay } from "../components/UnitDisplay";
import Loader from "../cardano/loader";
import Show from "../images/assets/show.svg";
import cardano from "../images/assets/CARDANO-LOGO.svg";
import greenDot from "../images/assets/green-dot.svg";
import redDot from "../images/assets/red-dot.svg";
import blueDot from "../images/assets/blue-dot.svg";
import yellowDot from "../images/assets/yellow-dot.svg";
import indigoDot from "../images/assets/indigo-dot.svg";
import "../styles/spacebud.css";

const secrets = {
  PROJECT_ID: "mainnetFEnBQkYa33cYHGr2w96tA0BvYILBqfXm",
};

//assets

export const toHex = (bytes) => Buffer.from(bytes).toString("hex");

const isBrowser = () => typeof window !== "undefined";

const SpaceBud = ({ pageContext: { spacebud } }) => {
  const matches = useBreakpoint();
  const toast = useToast();
  const [owner, setOwner] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tradeRef = React.useRef();
  const [isLoadingMarket, setIsLoadingMarket] = React.useState(true);
  const [details, setDetails] = React.useState({
    bid: { bidUtxo: null, lovelace: null, usd: null, owner: false },
    offer: { offerUtxo: null, lovelace: null, usd: null, owner: true },
    lastSale: { lovelace: null, usd: null },
  });
  const [loadingButton, setLoadingButton] = React.useState({
    cancelBid: false,
    bid: false,
    buy: false,
    offer: false,
    cancelOffer: false,
    sell: false,
  });
  const connected = useStoreState((state) => state.connection.connected);

  const market = React.useRef();

  const POLICY = "d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc"; // mainnet
  const CONTRACT_ADDRESS =
    "addr1wyzynye0nksztrfzpsulsq7whr3vgh7uvp0gm4p0x42ckkqqq6kxq";

  const connectedAddresses = React.useRef([]);

  const isOwner = (address) =>
    connectedAddresses.current.length > 0
      ? connectedAddresses.current.some((addr) => addr === address)
      : false;

  const firstUpdate = React.useRef(true);
  const init = async () => {
    connectedAddresses.current = connected
      ? (await window.cardano.selectedWallet.getUsedAddresses()).map((addr) =>
          Loader.Cardano.Address.from_bytes(
            Buffer.from(addr, "hex")
          ).to_bech32()
        )
      : [];
    if (firstUpdate.current) {
      await loadMarket();
      await loadSpaceBudData();
      firstUpdate.current = false;
      return;
    }
    await loadSpaceBudData();
  };

  React.useEffect(() => {
    init();
  }, [connected]);

  const checkTransaction = async (txHash, { type, lovelace } = {}) => {
    if (!txHash) return;
    PendingTransactionToast(toast);
    if (type) {
      fetch("https://api.spacebudzbot.com/tweet", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + secrets.TWITTER_BOT_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: spacebud.id.toString(), type, lovelace }),
      })
        .then(console.log)
        .catch(console.log);
    }
    await market.current.awaitConfirmation(txHash);
    toast.closeAll();
    SuccessTransactionToast(toast, txHash);
    await new Promise((res, rej) => setTimeout(() => res(), 1000));
    loadSpaceBudData();
  };

  const loadMarket = async () => {
    market.current = new Market(
      {
        base: "https://cardano-mainnet.blockfrost.io/api/v0",
        projectId: secrets.PROJECT_ID,
      },
      "addr1qxpxm8a0uxe6eu2m6fgdu6wqfclujtzyjdu9jw0qdxfjaz02h5ngjz7fftac5twlxj6jha4meenh6476m5xdwmeyh4hq0zeknx"
    );
    await market.current.load();
  };

  const loadSpaceBudData = async () => {
    await Loader.load();
    setIsLoadingMarket(true);
    setOwner([]);
    const token = POLICY + toHex(`SpaceBud${spacebud.id}`);
    let addresses = await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/assets/${token}/addresses`,
      { headers: { project_id: secrets.PROJECT_ID } }
    ).then((res) => res.json());
    const fiatPrice = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd`
    )
      .then((res) => res.json())
      .then((res) => res.cardano["usd"]);
    const lastSale = await fetch(
      `https://spacebudz.io/api/specificSpaceBud/${spacebud.id}`
    )
      .then((res) => res.json())
      .then((res) => res.lastSale);

    // const bidUtxo = await market.current.getBid(spacebud.id);
    // let offerUtxo = await market.current.getOffer(spacebud.id);

    const bidUtxo = null;
    let offerUtxo = null;

    // check if twin
    if (Array.isArray(offerUtxo)) {
      if (
        offerUtxo.length === 2 &&
        (spacebud.id === 1903 || spacebud.id === 6413)
      ) {
        const ownerUtxo = offerUtxo.find((utxo) =>
          isOwner(utxo.tradeOwnerAddress.to_bech32())
        );

        if (ownerUtxo) {
          offerUtxo = ownerUtxo;
        } else {
          const offerUtxo1 = offerUtxo[0];
          const offerUtxo2 = offerUtxo[1];
          // set correct owner
          addresses = [
            { adddress: offerUtxo1.tradeOwnerAddress.to_bech32() },
            { address: offerUtxo1.tradeOwnerAddress.to_bech32() },
          ];
          if (
            isBrowser() &&
            window.BigInt(offerUtxo1.lovelace) <
              window.BigInt(offerUtxo2.lovelace)
          ) {
            offerUtxo = offerUtxo1;
          } else {
            offerUtxo = offerUtxo2;
          }
        }
      } else throw new Error("Something went wrong");
    }
    const details = {
      bid: { bidUtxo: null, lovelace: null, usd: null, owner: false },
      offer: { offerUtxo: null, lovelace: null, usd: null, owner: false },
      lastSale: { lovelace: null, usd: null },
    };
    details.bid.bidUtxo = bidUtxo;
    details.offer.offerUtxo = offerUtxo;
    console.log(bidUtxo);
    console.log(offerUtxo);
    // ignore if state is StartBid
    if (toHex(bidUtxo.datum.to_bytes()) !== "d866820080") {
      if (isOwner(bidUtxo.tradeOwnerAddress.to_bech32())) {
        details.bid.owner = true;
      }
      details.bid.lovelace = bidUtxo.lovelace;
      details.bid.usd = (bidUtxo.lovelace / 10 ** 6) * fiatPrice * 10 ** 2;
    }
    if (addresses.find((address) => isOwner(address.address)))
      details.offer.owner = true;
    if (offerUtxo) {
      addresses = addresses.map((address) =>
        address.address === CONTRACT_ADDRESS
          ? { address: offerUtxo.tradeOwnerAddress.to_bech32() }
          : address
      );
      if (isOwner(offerUtxo.tradeOwnerAddress.to_bech32())) {
        details.offer.owner = true;
      }
      details.offer.lovelace = offerUtxo.lovelace;
      details.offer.usd = (offerUtxo.lovelace / 10 ** 6) * fiatPrice * 10 ** 2;
    }

    if (lastSale) {
      details.lastSale.lovelace = lastSale;
      details.lastSale.usd = (lastSale / 10 ** 6) * fiatPrice * 10 ** 2;
    }

    //check if same address if there are 2

    if (addresses.length > 1 && addresses[0].address === addresses[1].address) {
      addresses = [addresses[0]];
    }

    setDetails(details);
    setOwner(addresses);
    setIsLoadingMarket(false);
  };

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title={"SpaceBudz | SpaceBud #" + spacebud.id}
        description={`SpaceBud #${spacebud.id}`}
        image={spacebud.image}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 150,
          marginBottom: 100,
        }}
      >
        <div
          className="spacebud-box"
          style={{
            position: "relative",
            // paddingBottom: 35,
            width: "60%",
            borderRadius: 10,
            // backgroundImage: `url(${Show})`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            // flexDirection: "column",
            gap: 20,
            color: "white",
            border: "2px solid #636363",
          }}
        >
          <div
            style={{
              zIndex: 10,
              position: "absolute",
              left: 25,
              top: 25,
              cursor: "pointer",
            }}
            onClick={() => onOpen()}
          >
            <Share2 size={26} />
          </div>
          {/* Modal */}
          <ShareModal
            bud={spacebud}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
          <TradeModal
            budId={spacebud.id}
            ref={tradeRef}
            market={market.current}
            details={details}
            onConfirm={checkTransaction}
          />
          {/* Modal End */}
          <div
            style={{
              width: !matches.md ? 410 : 350,
              height: !matches.md ? 410 : 350,
              borderRadius: "50%",
              // marginTop: -15,
              // marginBottom: -50,
              padding: 20,
            }}
          >
            <div style={{ width: "100%", position: "relative" }}>
              {(spacebud.id === 1903 || spacebud.id === 6413) && (
                <img
                  src={spacebud.image}
                  style={{
                    position: "absolute",
                    left: 20,
                    top: -12,
                    filter: "brightness(0.7)",
                  }}
                  width="100%"
                />
              )}
              <img
                src={spacebud.image}
                style={{ position: "absolute" }}
                width="100%"
              />
            </div>
          </div>
          <Box h={5} />
          <div>
            <div
              className="bud-name"
              style={{ fontWeight: 700, fontSize: 48, marginBottom: 20 }}
            >
              SpaceBud <br /> #{spacebud.id}
            </div>
            <LinkName
              style={{ color: "#636363", fontSize: 18 }}
              onClick={() => navigate(`/explore/?type=${spacebud.type}`)}
            >
              {spacebud.type} Astronaut
            </LinkName>
            <div>
              <button
                style={{
                  border: "1px solid #30F100",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 20,
                  fontWeight: 700,
                  marginTop: 20,
                  padding: "5px 40px",
                  borderRadius: 40,
                  marginBottom: 20,
                }}
              >
                <img
                  style={{ objectFit: "cover", width: "40%" }}
                  src={cardano}
                  alt=""
                />
                4000
              </button>
            </div>
            <div>
              <Button
                size="lg"
                isFullWidth={true}
                style={{ backgroundColor: "#30F100", color: "#000" }}
                variant="solid"
              >
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
        {/* static content */}
        <div
          style={{
            width: "60%",
            marginTop: 50,
            backgroundColor: "#171717",
            padding: 20,
            borderRadius: 5,
          }}
        >
          <ButtonGroup className="buttons" spacing="8">
            <Button
              style={{
                border: "1px solid #30F100",
                borderRadius: 50,
                padding: "5px 30px",
                fontSize: 11,
                fontWeight: 500,
              }}
              colorScheme="none"
              variant={"outline"}
            >
              TRAITS
            </Button>
            <Button
              style={{
                // border: "1px solid #30F100",
                backgroundColor: "#30F100",
                color: "#000",
                borderRadius: 50,
                padding: "2px 15px",
                fontSize: 11,
                fontWeight: 500,
              }}
              colorScheme="none"
              variant={"solid"}
            >
              PRICING HISTORY
            </Button>
            <Button
              style={{
                // border: "1px solid #30F100",
                backgroundColor: "#30F100",
                color: "#000",
                borderRadius: 50,
                padding: "2px 15px",
                fontSize: 11,
                fontWeight: 500,
              }}
              colorScheme="none"
              variant={"solid"}
            >
              TRADING HISTORY
            </Button>
          </ButtonGroup>
          <div
            className="color-indication-box"
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              marginTop: 30,
            }}
          >
            <div style={{ display: "flex", gap: 50 }}>
              {/* left side  */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <h4 style={{ fontSize: 11, fontWeight: 700 }}>
                    SKIN : CLEAN 41.38%{" "}
                  </h4>
                  <img src={greenDot} alt="" />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <h4 style={{ fontSize: 11, fontWeight: 700 }}>
                    MOUTH : OG BLUE 1.08%
                  </h4>
                  <img src={redDot} alt="" />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <h4 style={{ fontSize: 11, fontWeight: 700 }}>
                    EYES : DEAD 14.56%
                  </h4>
                  <img src={blueDot} alt="" />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <h4 style={{ fontSize: 11, fontWeight: 700 }}>
                    EYES COLOR : GREEN 2.07%
                  </h4>
                  <img src={yellowDot} alt="" />
                </div>
              </div>
              {/* right side  */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <h4 style={{ fontSize: 11, fontWeight: 700 }}>
                    HEAD : SOMBRERO 2.17%
                  </h4>
                  <img src={blueDot} alt="" />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <h4 style={{ fontSize: 11, fontWeight: 700 }}>
                    HEAD : SOMBRERO 2.17%
                  </h4>
                  <img src={yellowDot} alt="" />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <h4 style={{ fontSize: 11, fontWeight: 700 }}>
                    CHEST : BLACK ALIEN TSHIRT 4.83%
                  </h4>
                  <img src={greenDot} alt="" />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <h4 style={{ fontSize: 11, fontWeight: 700 }}>
                    CHAINS : ALIEN 7.31%
                  </h4>
                  <img src={greenDot} alt="" />
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <img src={greenDot} alt="" />
                <h4 style={{ fontSize: 9, fontWeight: 700 }}>COMMON</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <img src={yellowDot} alt="" />
                <h4 style={{ fontSize: 9, fontWeight: 700 }}>UNCOMMON</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <img src={redDot} alt="" />
                <h4 style={{ fontSize: 9, fontWeight: 700 }}>RARE</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <img src={blueDot} alt="" />
                <h4 style={{ fontSize: 9, fontWeight: 700 }}>ALIEN</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <img src={indigoDot} alt="" />
                <h4 style={{ fontSize: 9, fontWeight: 700 }}>
                  EXTRATERRESTRIAL
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LinkName = styled.span`
  cursor: pointer;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

const Attribute = (props) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LinkName onClick={() => props.onClick()}>
        <div
          style={{
            display: "table",
            height: 20,
            backgroundColor: "#9575cd",
            padding: "3px 6px",
            borderRadius: 25,
            fontSize: 14,
            color: "white",
            fontWeight: 500,
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          {props.children}
        </div>
      </LinkName>
    </Box>
  );
};

export default SpaceBud;
