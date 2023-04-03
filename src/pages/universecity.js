import React, { useState } from "react";
import Carousel from "../components/Carousel/carousel";
import Proyects from "../components/Proyects/proyects";
import Trending from "../components/TrendingCards/trending";
import "../styles/thehub.css";

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
import { db } from "../firebase-config";

import { useStoreState } from "easy-peasy";
import Loader from "../cardano/loader";

// testnet
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

const Thehub = () => {
  // states
  const [raffle, setRaffle] = useState({});
  const [nftConnect, setNftConnect] = useState(true);
  const [nfts, setNfts] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [NFTAddress, setNFTAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [entriesByID, setEntriesByID] = useState(0);
  const [nftExists, setNftExists] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [nftsHeld, setNftsHeld] = useState();
  const [nftNames, setNftNames] = useState();

  // get single doc from firebase
  // firebase collection
  const raffleCollection = collection(db, "raffles");
  const ticketsCollection = collection(db, "tickets");

  //====== Connect Wallet Code =============

  const [address, setAddress] = React.useState("");
  const [tokens, setTokens] = React.useState({
    owned: [],
    bids: [],
    offers: [],
  });
  const connected = useStoreState((state) => state.connection.connected);
  const didMount = React.useRef(false);
  const isFirstConnect = React.useRef(true);
  const fetchAddressBudz = async (address) => {
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

    let animaliens = {};
    for (let index = 1; index <= 4444; index++) {
      animaliens[index] = {
        name: "Chamalien #" + index,
      };
    }

    const getEntries = async () => {
      const data = await getDocs(ticketsCollection);

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
        console.log("tokens owned: " + tokens.owned);
        console.log(tokens.owned);

        setTokens(tokens);
      } catch (e) {}
    };

    getEntries();
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
    <div className="css-n1ozge">
      <Carousel />
      <Trending />
      <Proyects />
    </div>
  );
};

export default Thehub;
