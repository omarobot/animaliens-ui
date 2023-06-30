import React from "react";

import { Box } from "@chakra-ui/react";

import "./TangzConnector.css";

const ANIMALIENS_POLICY = 'e25f63ead710e65dfe69fbbb9945df9b2eb06b4694e765743ea71d43';

async function selectConnectedWallet(cardanoDApp) {
  const wallet = await cardanoDApp.getConnectedWallet();
  /**
    USE LUCID HERE TO GET UTXOS/SELECT WALLETS/ETC.

  const lucid = await NftToolkit.LucidInst.getLucidInstance(NftToolkit.Secrets.BLOCKFROST_PROJ);
  if (lucid === undefined) {
    throw 'You must connect a mainnet wallet';
  }
  lucid.selectWallet(wallet);
  return lucid;
    **/
}

async function animaliensDisplay(cardanoDApp) {
  if (!cardanoDApp.isWalletConnected()) {
    return "No Animaliens found...";
  }
  return `You have ${await cardanoDApp.numPolicyAssets(ANIMALIENS_POLICY)} Animaliens`;
}

async function handleMessages(evt, cardanoDApp, callbackFunc) {
  // We only accept messages from ourselves
  if (evt.source != window || !evt.data.type) {
    return;
  }
  switch (evt.data.type) {
    case "CARDANO_DAPP_JS_CONNECT":
      console.log(cardanoDApp);
      callbackFunc(await animaliensDisplay(cardanoDApp));
      break;
    default:
      // Unknown message, return
      break;
  }
}

export default function TangzConnector() {

  const [animaliensText, setAnimaliensText] = React.useState('No wallet connected yet...');

  React.useEffect(() => {
    window.NftToolkit.then(NftToolkit => {
      try {
        NftToolkit.CardanoDAppJs.getCardanoDAppInstance();
      } catch (err) {
        NftToolkit.CardanoDAppJs.initializeCardanoDApp('wallet-container');
      }
      const cardanoDApp = NftToolkit.CardanoDAppJs.getCardanoDAppInstance();
      window.addEventListener("message", evt => handleMessages(evt, cardanoDApp, setAnimaliensText));
    });

  });

  return (
    <Box style={{
      display: "flex",
      position: "absolute",
      top: "20px",
      right: "3%",
      border: "2px solid #30f100",
      borderRadius: "10px",
      padding: "10px",
      color: "white"
    }} zIndex="1">
      <div id="wallet-container" className="dropdown-parent btn rounded-top rounded-bottom">
        Initializing Wallet...
      </div>
      <div>
        {animaliensText}
      </div>
    </Box>
  )
}
