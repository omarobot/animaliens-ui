import React from "react";
import { Button, LaunchButton } from "../components/Button";
import {
  Grid,
  Loading,
  Spacer,
  Modal,
  Snippet,
  Link,
  useModal,
} from "@geist-ui/react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import Layout from "../templates/layout";
import Metadata from "../components/Metadata";

import BounceLoader from "react-spinners/BounceLoader";
import { Checkmark } from "../components/Checkmark";
import QRCode from "react-qr-code";

//assets
// import QrIcon from "../images/assets/qr.png";
// import Bear from "../images/assets/bear.png";
// import Dino from "../images/assets/dino.png";
// import Alien from "../images/assets/alien.png";
// import Moon from "../images/assets/moon.png";

import { Share2 } from "@geist-ui/react-icons";
import { ShareModal } from "../components/Modal";
import FadeIn from "react-fade-in";

const ADDRESS =
  "addr1q8r5zsxnck2xm30akn8e0uxflmt0zwykjqzas8fm5y4hzn8vrw4hs284y5rlx69fy4upecl5n6ej8w8mflkz86v22vqqvf746p";

const API = "https://us-central1-space-budz.cloudfunctions.net/api";

let priceInternal;

let awaitConfirmation;

const Opening = (props) => {
  const matches = useBreakpoint();
  const [price, setPrice] = React.useState("");
  const [result, setResult] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [showCongrats, setShowCongrats] = React.useState(false);
  const [showUnpack, setShowUnpack] = React.useState(true);
  const { visible, setVisible, bindings } = useModal();
  const animationRef = React.useRef();

  const fetchPrice = async () => {
    const data = await fetch(API + "/reserveId").then((res) => res.json());
    const parsedPrice = data.price && parseInt(data.price);
    if (parsedPrice) {
      setPrice(parsedPrice);
      priceInternal = parsedPrice;
    }
    if (!awaitConfirmation) setAwaitConfirmation();
  };

  const fetchResult = async (p) => {
    const data = await fetch(API + "/result?price=" + p).then((res) =>
      res.json()
    );
    console.log(data);
    setResult(data);
    if (data.txHash) {
      setShowUnpack(false);
      setTimeout(() => {
        setAwaitConfirmation("cancel");
        setOpen(false);
        animationRef.current.start(data.id);
        // setTimeout(() => animationRef.current.start(data.id), 50);
        setTimeout(() => setShowCongrats(true), 3850);
      }, 2000);
    }
  };

  const setAwaitConfirmation = (action) => {
    if (action == "cancel") {
      clearInterval(awaitConfirmation);
      awaitConfirmation = null;
      return;
    }
    awaitConfirmation = setInterval(() => {
      console.log(priceInternal);
      if (priceInternal) {
        fetchResult(priceInternal);
      }
    }, 3000);
  };

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />{" "}
      {/* <div
              style={{
                minHeight: "100vh",
                alignItems: "center",
                display: "flex",
                marginTop: !matches.md ? 110 : 60,
                flexDirection: "column",
                overflow: matches.md && "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -340,
                  bottom: 0,
                }}
              >
                <img src={Bear} width="60%" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: -260,
                  bottom: -100,
                }}
              >
                <img src={Alien} width="60%" />
              </div>
              <div
                style={{
                  position: "absolute",
                  right: -750,
                  bottom: -100,
                }}
              >
                <img src={Dino} width="70%" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "30%",
                  top: "-4%",
                  width: "8%",
                  opacity: 0.2,
                }}
              >
                <img src={Moon} width="70%" />
              </div>
              <div
                style={{
                  width: "100%",
                  maxWidth: 1000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginBottom: !matches.md && -70,
                }}
              >
                <Animation
                  matches={matches}
                  id={showCongrats && result.id}
                  ref={animationRef}
                />
              </div>
              {showCongrats && (
                <FadeIn>
                  <div
                    style={{
                      marginTop: !matches.md ? -170 : -110,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ width: "90%", zIndex: 20 }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 22,
                          color: "#777777",
                          textAlign: "center",
                        }}
                      >
                        Congratulations!
                      </div>
                      <div style={{ height: 15 }} />
                      <div
                        style={{
                          textAlign: "center",
                          maxWidth: 400,
                        }}
                      >
                        <b>SpaceBud #{result.id}</b>
                        <br /> will be soon reflected in your wallet and on the
                        website.
                      </div>
                      <div style={{ height: 5 }} />
                      <div style={{ textAlign: "center" }}>
                        <Link
                          style={{ textDecoration: "underline" }}
                          underline
                          color="success"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              `https://explorer.cardano.org/en/transaction?id=${result.txHash}`
                            );
                          }}
                        >
                          View Transaction
                          <span style={{ fontSize: 11, marginLeft: 4 }}>
                            (may take a while)
                          </span>
                        </Link>
                      </div>
                      <div style={{ height: 40 }} />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: 50,
                          }}
                          bgcolor="#263238"
                          onClick={() => {
                            setVisible(true);
                          }}
                        >
                          <Share2 size={22} />
                        </Button>
                        <Button
                          bgcolor="#263238"
                          onClick={() => {
                            window.open(`/explore/spacebud/${result.id}`);
                          }}
                        >
                          Details
                        </Button>
                        <Button
                          onClick={() => {
                            priceInternal = null;
                            animationRef.current.reset();
                            setShowCongrats(false);
                            setPrice(null);
                            setResult(null);
                            setTimeout(() => {
                              fetchPrice();
                              setOpen(true);
                            });
                          }}
                        >
                          Unpack More
                        </Button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}
              {showUnpack && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    zIndex: 12,
                    marginTop: !matches.md ? -60 : -30,
                  }}
                >
                  <Button
                    style={{ width: 300, opacity: 0.3 }}
                    onClick={() => {
                      // fetchPrice();
                      // setOpen(true);
                    }}
                  >
                    Presale is over
                  </Button>
                </div>
              )}
              <Spacer y={3} />
              <div
                style={{
                  zIndex: 1,
                  textAlign: "center",
                  maxWidth: 500,
                  width: "90%",

                  borderRadius: 16,
                  border: "1px solid #4a148c",
                  backgroundColor: "white",
                }}
              >
                <div style={{ fontSize: 15, padding: "30px 20px" }}>
                  <span style={{ fontWeight: 500, fontSize: 18 }}>
                    Thank you everyone for participating!
                  </span>
                </div>
              </div>
              <Spacer y={3} />
            </div> */}{" "}
      {/* Modal */}{" "}
      {/* <PaymentModal
                result={result}
                price={price}
                open={open}
                setOpen={(b) => setOpen(b)}
                setPrice={(p) => setPrice(p)}
                setShowUnpack={(u) => setShowUnpack(u)}
              /> */}{" "}
      {/* <ShareModal
                id={result && result.txHash && result.id}
                modal={{ visible, setVisible, bindings }}
              />{" "} */}{" "}
    </>
  );
};

const toMinutes = (milliseconds) =>
  parseInt(Math.floor(parseInt(Math.floor(milliseconds / 1000)) / 60));

const PaymentModal = ({
  price,
  open,
  setOpen,
  result,
  setPrice,
  setShowUnpack,
}) => {
  const [showQr, setShowQr] = React.useState(false);

  return (
    <>
      <Modal
        open={open}
        disableBackdropClick={true}
        onClose={() => {
          setOpen(false);
          setPrice("");
        }}
      >
        <Modal.Title> Awaiting Transaction </Modal.Title>{" "}
        <Modal.Subtitle> Unpack one SpaceBud </Modal.Subtitle>{" "}
        <Modal.Content>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
              }}
            >
              Send <b> exactly </b> the following ADA amount to this address!{" "}
              <br /> This payment request expires in{" "}
              <b>
                {" "}
                {result ? 15 - toMinutes(Date.now() - result.time) : "15"}{" "}
                minutes{" "}
              </b>{" "}
              <br />
              <b> Don 't send from an exchange!</b>.{" "}
            </div>{" "}
            <div
              style={{
                height: 30,
              }}
            />{" "}
            <Snippet
              symbol="ADA:"
              text={`${price ? price / 1000000 : "..."}`}
              toastText={`Copied ${price ? price / 1000000 : "..."} ADA`}
            />{" "}
            <div
              style={{
                height: 20,
              }}
            />{" "}
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                }}
              >
                <Snippet
                  symbol="Address:"
                  text={ADDRESS}
                  toastText="Copied payment address"
                />
              </div>{" "}
              <div
                style={{
                  width: 20,
                }}
              />{" "}
              {/* <img
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setShowQr(true)}
                src={''}
                width="34px"
              /> */}
            </div>{" "}
            <div
              style={{
                height: 50,
              }}
            />{" "}
            {result && result.txHash ? (
              <Checkmark size="96px" />
            ) : (
              <BounceLoader loading={true} size={96} color={"#4a148c"} />
            )}{" "}
            <div
              style={{
                height: 30,
              }}
            />{" "}
            <div
              style={{
                fontSize: 12,
              }}
            >
              It takes up to 1 - 2 minutes after payment receipt{" "}
            </div>{" "}
          </div>{" "}
        </Modal.Content>{" "}
        {/* <Modal.Action onClick={() => setOpen(false)}>?</Modal.Action> */}{" "}
        <Modal.Action
          onClick={() => {
            setOpen(false);
            setShowUnpack(true);
          }}
        >
          Cancel{" "}
        </Modal.Action>{" "}
        <Modal.Action
          onClick={() => {
            window.open("https://www.youtube.com/watch?v=qKZ8NJwMGQg");
          }}
        >
          Watch Tutorial{" "}
        </Modal.Action>{" "}
      </Modal>{" "}
      {/* Qr Code */}{" "}
      <Modal open={showQr} onClose={() => setShowQr(false)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <QRCode value={ADDRESS} />{" "}
          <div
            style={{
              height: 20,
            }}
          />{" "}
          <div
            style={{
              wordBreak: "break-all",
              fontSize: 11,
            }}
          >
            {" "}
            {ADDRESS}{" "}
          </div>{" "}
        </div>{" "}
      </Modal>{" "}
    </>
  );
};

// Animation

var converterEngine = function (input) {
  // fn BLOB => Binary => Base64 ?
  var uInt8Array = new Uint8Array(input),
    i = uInt8Array.length;
  var biStr = []; //new Array(i);
  while (i--) {
    biStr[i] = String.fromCharCode(uInt8Array[i]);
  }
  var base64 = window.btoa(biStr.join(""));
  console.log("2. base64 produced >>> " + base64); // print-check conversion result
  return base64;
};

var getImageBase64 = function (url, callback) {
  // 1. Loading file from url:
  var xhr = new XMLHttpRequest(url);
  xhr.open("GET", url, true); // url is the url of a PNG image.
  xhr.responseType = "arraybuffer";
  xhr.callback = callback;
  xhr.onload = function (e) {
    if (this.status == 200) {
      // 2. When loaded, do:
      console.log("1:Loaded response >>> " + this.response); // print-check xhr response
      var imgBase64 = converterEngine(this.response); // convert BLOB to base64
      this.callback(imgBase64); //execute callback function with data
    }
  };
  xhr.send();
};

let tl;

const Animation = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    start(id) {
      getImageBase64(`../../../spacebudz/bud${id}.png`, (data) =>
        document
          .getElementById("photo")
          .setAttribute("href", "data:image/png;base64," + data)
      );
      setTimeout(() => tl.play(), 1000);
    },
    reset() {
      tl.time(0);
      tl.pause();
    },
  }));
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      tl = window.gsap
        .timeline({
          paused: true,
        })
        .to("#rocket", {
          duration: 7,
          y: -10000,
          ease: "power1.in",
        })
        .from(
          "#fier",
          {
            duration: 1,
            transformOrigin: "50% 0%",
            scale: 0,
          },
          "<+0.1"
        )
        .from(
          "#cloud1",
          {
            duration: 1,
            transformOrigin: "50% 50%",
            scale: 0,
          },
          "<"
        )
        .from(
          "#clouds1 >*",
          {
            duration: 1,
            transformOrigin: "50% 50%",
            scale: 0,
            stagger: 0.1,
          },
          "<+0.1"
        )
        .from(
          "#cloud2",
          {
            duration: 1,
            transformOrigin: "50% 50%",
            scale: 0,
          },
          "<+0.1"
        )
        .from(
          "#cloud3",
          {
            duration: 1,
            transformOrigin: "50% 50%",
            scale: 0,
          },
          "<+0.1"
        )
        .from(
          "#clouds2 >*",
          {
            duration: 1,
            transformOrigin: "50% 50%",
            scale: 0,
            stagger: 0.1,
          },
          "<+0.5"
        )
        .from(
          "#clouds3 >*",
          {
            duration: 1,
            transformOrigin: "50% 50%",
            scale: 0,
            stagger: 0.1,
          },
          "<+0.5"
        )
        .to(
          "#clouds1 >*, #cloud1, #cloud2, #cloud3",
          {
            duration: 3,
            transformOrigin: "50% 50%",
            scale: 1.5,
            opacity: 0,
          },
          "<=0.1"
        )
        .to(
          "#clouds2 >*",
          {
            duration: 3,
            transformOrigin: "50% 50%",
            scale: 1.5,
            opacity: 0,
          },
          "<+0.1"
        )
        .to(
          "#clouds3 >*",
          {
            duration: 3,
            transformOrigin: "50% 50%",
            scale: 1.5,
            opacity: 0,
          },
          "<+0.1"
        )
        .from(
          "#photo",
          {
            duration: 0.5,
            opacity: 0,
            scale: 0.5,
            transformOrigin: "50% 50%",
          },
          "<+1.3"
        );
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        style={{
          width: !props.matches.md ? "100%" : "200%",
          height: !props.matches.md ? "100%" : "200%",
          zIndex: 11,
          overflow: "visible",
        }}
        version="1.1"
        id="Слой_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="3056.54px"
        height="2106.06px"
        viewBox="0 0 3025.54 2106.06"
        enableBackground="new 0 0 3056.54 2106.06"
        xmlSpace="preserve"
      >
        <g>
          <image
            id="photo"
            overflow="visible"
            width="1500"
            height="1500"
            // href={`../../../spacebudz/bud${props.id}.png`}
            transform="matrix(1 0 0 1 770.1215 50.617)"
          ></image>{" "}
          <g id="cloud1">
            <path
              fill="#FFFFFF"
              d="M1837.21,1638.06c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1865 .29, 1690.33, 1854.83, 1661.34, 1837.21, 1638.06 z "
            />
            <path
              fill="#CBD5EB"
              d="M1344.34,1497.84c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 c - 78.03, 0 - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1352 .36, 1500.41, 1348.4, 1498.99, 1344.34, 1497.84 z M1634 .9, 1672.38 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1644 .12, 1687.73, 1640.5, 1680.12, 1634.9, 1672.38 z M1634 .9, 1672.38 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1559 .28, 1609.8, 1613, 1642.09, 1634.9, 1672.38 z M1716 .07, 1548.51 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1707 .01, 1539.22, 1712.06, 1543.37, 1716.07, 1548.51 z M1837 .21, 1638.06 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1865 .29, 1690.33, 1854.83, 1661.34, 1837.21, 1638.06 z M1262 .74, 1491.62 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1229 .77, 1518.21, 1243.63, 1500.05, 1262.74, 1491.62 z "
            />
          </g>{" "}
          <g id="clouds1">
            <g>
              <path
                fill="#FFFFFF"
                d="M2429.26,1688.58c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2457 .35, 1740.85, 2446.88, 1711.86, 2429.26, 1688.58 z "
              />
              <path
                fill="#CBD5EB"
                d="M1936.39,1548.36c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    c85 .51, 0, 154.83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.33 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1944 .41, 1550.93, 1940.45, 1549.51, 1936.39, 1548.36 z M2226 .96, 1722.9 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C2236 .17, 1738.25, 2232.55, 1730.64, 2226.96, 1722.9 z M2226 .96, 1722.9 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C2151 .34, 1660.32, 2205.05, 1692.61, 2226.96, 1722.9 z M2308 .13, 1599.03 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2299 .06, 1589.74, 2304.12, 1593.9, 2308.13, 1599.03 z M2429 .26, 1688.58 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .83, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2457 .35, 1740.85, 2446.88, 1711.86, 2429.26, 1688.58 z M1854 .79, 1542.14 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1821 .83, 1568.73, 1835.68, 1550.57, 1854.79, 1542.14 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1240.66,1727.97c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1268 .75, 1780.24, 1258.28, 1751.25, 1240.66, 1727.97 z "
              />
              <path
                fill="#CBD5EB"
                d="M747.79,1587.75c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.33 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C755 .81, 1590.33, 751.85, 1588.91, 747.79, 1587.75 z M1038 .36, 1762.3 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1047 .57, 1777.65, 1043.96, 1770.04, 1038.36, 1762.3 z M1038 .36, 1762.3 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C962 .74, 1699.71, 1016.45, 1732, 1038.36, 1762.3 z M1119 .53, 1638.42 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1110 .46, 1629.14, 1115.52, 1633.29, 1119.53, 1638.42 z M1240 .66, 1727.97 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1268 .75, 1780.24, 1258.28, 1751.25, 1240.66, 1727.97 z M666 .2, 1581.53 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C633 .23, 1608.13, 647.09, 1589.96, 666.2, 1581.53 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1297.97,1373.25c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1326 .05, 1425.52, 1315.59, 1396.53, 1297.97, 1373.25 z "
              />
              <path
                fill="#CBD5EB"
                d="M805.1,1233.03c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.76, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C813 .12, 1235.6, 809.16, 1234.18, 805.1, 1233.03 z M1095 .66, 1407.57 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1104 .88, 1422.92, 1101.26, 1415.31, 1095.66, 1407.57 z M1095 .66, 1407.57 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1020 .04, 1344.99, 1073.76, 1377.28, 1095.66, 1407.57 z M1176 .83, 1283.7 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1167 .76, 1274.41, 1172.82, 1278.57, 1176.83, 1283.7 z M1297 .97, 1373.25 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1326 .05, 1425.52, 1315.59, 1396.53, 1297.97, 1373.25 z M723 .5, 1226.81 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C690 .53, 1253.41, 704.39, 1235.24, 723.5, 1226.81 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M903.16,1656.89c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C931 .24, 1709.16, 920.78, 1680.17, 903.16, 1656.89 z "
              />
              <path
                fill="#CBD5EB"
                d="M410.29,1516.67c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    c85 .51, 0, 154.83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.33 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C418 .31, 1519.25, 414.35, 1517.83, 410.29, 1516.67 z M700 .85, 1691.22 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C710 .07, 1706.57, 706.45, 1698.96, 700.85, 1691.22 z M700 .85, 1691.22 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C625 .23, 1628.64, 678.95, 1660.92, 700.85, 1691.22 z M782 .02, 1567.34 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C772 .95, 1558.06, 778.01, 1562.21, 782.02, 1567.34 z M903 .16, 1656.89 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C931 .24, 1709.16, 920.78, 1680.17, 903.16, 1656.89 z M328 .69, 1510.45 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C295 .72, 1537.05, 309.58, 1518.89, 328.69, 1510.45 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1762.08,1231.88c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1790 .17, 1284.15, 1779.7, 1255.16, 1762.08, 1231.88 z "
              />
              <path
                fill="#CBD5EB"
                d="M1269.21,1091.66c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.76, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 c - 78.03, 0 - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1277 .23, 1094.23, 1273.27, 1092.81, 1269.21, 1091.66 z M1559 .78, 1266.2 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1568 .99, 1281.55, 1565.37, 1273.94, 1559.78, 1266.2 z M1559 .78, 1266.2 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1484 .16, 1203.62, 1537.87, 1235.91, 1559.78, 1266.2 z M1640 .95, 1142.33 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1631 .88, 1133.04, 1636.94, 1137.2, 1640.95, 1142.33 z M1762 .08, 1231.88 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1790 .17, 1284.15, 1779.7, 1255.16, 1762.08, 1231.88 z M1187 .62, 1085.44 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1154 .65, 1112.03, 1168.5, 1093.87, 1187.62, 1085.44 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M2660.31,1338.07c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.85, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2688 .4, 1390.34, 2677.94, 1361.34, 2660.31, 1338.07 z "
              />
              <path
                fill="#CBD5EB"
                d="M2167.45,1197.84c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    c85 .51, 0, 154.83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.33 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C2175 .46, 1200.42, 2171.51, 1199, 2167.45, 1197.84 z M2458 .01, 1372.39 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C2467 .23, 1387.74, 2463.61, 1380.13, 2458.01, 1372.39 z M2458 .01, 1372.39 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C2382 .39, 1309.81, 2436.11, 1342.1, 2458.01, 1372.39 z M2539 .18, 1248.51 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2530 .11, 1239.23, 2535.17, 1243.38, 2539.18, 1248.51 z M2660 .32, 1338.06 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .83, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2688 .4, 1390.34, 2677.93, 1361.34, 2660.32, 1338.06 z M2085 .85, 1191.63 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C2052 .88, 1218.22, 2066.74, 1200.06, 2085.85, 1191.63 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M2972.61,1656.89c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.85, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C3000 .7, 1709.16, 2990.23, 1680.17, 2972.61, 1656.89 z "
              />
              <path
                fill="#CBD5EB"
                d="M2479.74,1516.67c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.76, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C2487 .76, 1519.25, 2483.8, 1517.83, 2479.74, 1516.67 z M2770 .3, 1691.22 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C2779 .52, 1706.57, 2775.9, 1698.96, 2770.3, 1691.22 z M2770 .3, 1691.22 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C2694 .69, 1628.64, 2748.4, 1660.93, 2770.3, 1691.22 z M2851 .48, 1567.34 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2842 .41, 1558.06, 2847.47, 1562.21, 2851.48, 1567.34 z M2972 .61, 1656.89 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .83, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C3000 .69, 1709.17, 2990.23, 1680.17, 2972.61, 1656.89 z M2398 .14, 1510.45 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C2365 .17, 1537.05, 2379.03, 1518.89, 2398.14, 1510.45 z "
              />
            </g>{" "}
          </g>{" "}
          <g id="clouds2">
            <g>
              <path
                fill="#FFFFFF"
                d="M2164.42,1056.46c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2192 .51, 1108.73, 2182.04, 1079.74, 2164.42, 1056.46 z "
              />
              <path
                fill="#CBD5EB"
                d="M1671.55,916.24c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 c - 78.03, 0 - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1679 .57, 918.81, 1675.61, 917.39, 1671.55, 916.24 z M1962 .11, 1090.78 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1971 .33, 1106.13, 1967.71, 1098.52, 1962.11, 1090.78 z M1962 .11, 1090.78 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1886 .5, 1028.2, 1940.21, 1060.49, 1962.11, 1090.78 z M2043 .29, 966.91 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2034 .22, 957.62, 2039.28, 961.77, 2043.29, 966.91 z M2164 .42, 1056.46 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2192 .51, 1108.73, 2182.04, 1079.74, 2164.42, 1056.46 z M1589 .95, 910.02 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1556 .98, 936.61, 1570.84, 918.45, 1589.95, 910.02 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1157.05,1226.99c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1185 .14, 1279.26, 1174.67, 1250.27, 1157.05, 1226.99 z "
              />
              <path
                fill="#CBD5EB"
                d="M664.18,1086.77c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.76, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C672 .2, 1089.35, 668.24, 1087.93, 664.18, 1086.77 z M954 .75, 1261.32 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C963 .96, 1276.67, 960.34, 1269.06, 954.75, 1261.32 z M954 .75, 1261.32 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C879 .13, 1198.73, 932.84, 1231.02, 954.75, 1261.32 z M1035 .92, 1137.44 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1026 .85, 1128.16, 1031.91, 1132.31, 1035.92, 1137.44 z M1157 .05, 1226.99 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1185 .14, 1279.26, 1174.67, 1250.27, 1157.05, 1226.99 z M582 .59, 1080.55 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C549 .62, 1107.15, 563.47, 1088.98, 582.59, 1080.55 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1405.08,1005.94c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1433 .17, 1058.21, 1422.7, 1029.21, 1405.08, 1005.94 z "
              />
              <path
                fill="#CBD5EB"
                d="M912.21,865.72c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 c - 78.03, 0 - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C920 .23, 868.29, 916.27, 866.87, 912.21, 865.72 z M1202 .78, 1040.26 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1211 .99, 1055.61, 1208.37, 1048, 1202.78, 1040.26 z M1202 .78, 1040.26 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1127 .16, 977.68, 1180.87, 1009.97, 1202.78, 1040.26 z M1283 .95, 916.39 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1274 .88, 907.1, 1279.94, 911.25, 1283.95, 916.39 z M1405 .08, 1005.94 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1433 .17, 1058.21, 1422.7, 1029.22, 1405.08, 1005.94 z M830 .61, 859.5 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C797 .65, 886.09, 811.5, 867.93, 830.61, 859.5 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M819.54,1155.91c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C847 .63, 1208.18, 837.17, 1179.19, 819.54, 1155.91 z "
              />
              <path
                fill="#CBD5EB"
                d="M326.68,1015.69c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.33 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C334 .69, 1018.27, 330.74, 1016.85, 326.68, 1015.69 z M617 .24, 1190.24 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C626 .46, 1205.59, 622.84, 1197.98, 617.24, 1190.24 z M617 .24, 1190.24 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C541 .62, 1127.66, 595.34, 1159.95, 617.24, 1190.24 z M698 .41, 1066.36 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C689 .34, 1057.08, 694.4, 1061.23, 698.41, 1066.36 z M819 .55, 1155.91 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C847 .63, 1208.19, 837.16, 1179.19, 819.55, 1155.91 z M245 .08, 1009.47 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C212 .11, 1036.07, 225.97, 1017.91, 245.08, 1009.47 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1678.47,730.9c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1706 .56, 783.17, 1696.09, 754.18, 1678.47, 730.9 z "
              />
              <path
                fill="#CBD5EB"
                d="M1185.6,590.68c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1193 .62, 593.25, 1189.66, 591.83, 1185.6, 590.68 z M1476 .17, 765.22 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1485 .38, 780.57, 1481.76, 772.96, 1476.17, 765.22 z M1476 .17, 765.22 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1400 .55, 702.64, 1454.26, 734.93, 1476.17, 765.22 z M1557 .34, 641.35 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1548 .27, 632.06, 1553.33, 636.22, 1557.34, 641.35 z M1678 .47, 730.9 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1706 .56, 783.17, 1696.09, 754.18, 1678.47, 730.9 z M1104, 584.46 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1071 .04, 611.06, 1084.89, 592.89, 1104, 584.46 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M2576.7,837.09c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2604 .79, 889.36, 2594.32, 860.36, 2576.7, 837.09 z "
              />
              <path
                fill="#CBD5EB"
                d="M2083.83,696.87c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C2091 .85, 699.44, 2087.89, 698.02, 2083.83, 696.87 z M2374 .4, 871.41 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C2383 .61, 886.76, 2380, 879.15, 2374.4, 871.41 z M2374 .4, 871.41 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C2298 .78, 808.83, 2352.49, 841.12, 2374.4, 871.41 z M2455 .57, 747.54 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2446 .5, 738.25, 2451.56, 742.4, 2455.57, 747.54 z M2576 .7, 837.09 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2604 .79, 889.36, 2594.32, 860.36, 2576.7, 837.09 z M2002 .24, 690.65 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1969 .27, 717.24, 1983.12, 699.08, 2002.24, 690.65 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M2833.95,1116.48c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.85, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2862 .04, 1168.75, 2851.57, 1139.76, 2833.95, 1116.48 z "
              />
              <path
                fill="#CBD5EB"
                d="M2341.08,976.26c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.33 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C2349 .1, 978.84, 2345.14, 977.42, 2341.08, 976.26 z M2631 .64, 1150.81 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C2640 .86, 1166.16, 2637.24, 1158.55, 2631.64, 1150.81 z M2631 .64, 1150.81 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C2556 .03, 1088.23, 2609.74, 1120.52, 2631.64, 1150.81 z M2712 .82, 1026.93 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2703 .75, 1017.65, 2708.81, 1021.8, 2712.82, 1026.93 z M2833 .95, 1116.48 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .83, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2862 .03, 1168.76, 2851.57, 1139.76, 2833.95, 1116.48 z M2259 .48, 970.04 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C2226 .51, 996.64, 2240.37, 978.48, 2259.48, 970.04 z "
              />
            </g>{" "}
          </g>{" "}
          <g id="clouds3">
            <g>
              <path
                fill="#FFFFFF"
                d="M2093.07,746.18c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2121 .15, 798.45, 2110.69, 769.46, 2093.07, 746.18 z "
              />
              <path
                fill="#CBD5EB"
                d="M1600.2,605.96c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1608 .22, 608.53, 1604.26, 607.11, 1600.2, 605.96 z M1890 .76, 780.5 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1899 .98, 795.85, 1896.36, 788.24, 1890.76, 780.5 z M1890 .76, 780.5 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1815 .14, 717.92, 1868.86, 750.21, 1890.76, 780.5 z M1971 .93, 656.63 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1962 .86, 647.34, 1967.92, 651.5, 1971.93, 656.63 z M2093 .07, 746.18 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2121 .15, 798.45, 2110.69, 769.46, 2093.07, 746.18 z M1518 .6, 599.74 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1485 .63, 626.33, 1499.49, 608.17, 1518.6, 599.74 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1480.93,706.67c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1509 .02, 758.94, 1498.55, 729.95, 1480.93, 706.67 z "
              />
              <path
                fill="#CBD5EB"
                d="M988.06,566.45c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 c - 78.03, 0 - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C996 .08, 569.02, 992.12, 567.6, 988.06, 566.45 z M1278 .63, 740.99 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1287 .84, 756.34, 1284.23, 748.73, 1278.63, 740.99 z M1278 .63, 740.99 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1203 .01, 678.41, 1256.72, 710.7, 1278.63, 740.99 z M1359 .8, 617.12 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1350 .73, 607.83, 1355.79, 611.99, 1359.8, 617.12 z M1480 .93, 706.67 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1509 .02, 758.94, 1498.55, 729.95, 1480.93, 706.67 z M906 .47, 560.23 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C873 .5, 586.83, 887.36, 568.66, 906.47, 560.23 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1226.61,482.85c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1254 .7, 535.12, 1244.23, 506.13, 1226.61, 482.85 z "
              />
              <path
                fill="#CBD5EB"
                d="M733.74,342.63c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C741 .76, 345.21, 737.8, 343.79, 733.74, 342.63 z M1024 .31, 517.18 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1033 .52, 532.53, 1029.9, 524.92, 1024.31, 517.18 z M1024 .31, 517.18 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C948 .69, 454.6, 1002.4, 486.88, 1024.31, 517.18 z M1105 .48, 393.3 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1096 .41, 384.02, 1101.47, 388.17, 1105.48, 393.3 z M1226 .61, 482.85 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1254 .7, 535.12, 1244.23, 506.13, 1226.61, 482.85 z M652 .14, 336.41 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C619 .18, 363.01, 633.03, 344.85, 652.14, 336.41 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M831.8,766.5c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C859 .89, 818.77, 849.42, 789.77, 831.8, 766.5 z "
              />
              <path
                fill="#CBD5EB"
                d="M338.93,626.28c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C346 .95, 628.85, 342.99, 627.43, 338.93, 626.28 z M629 .5, 800.82 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C638 .71, 816.17, 635.09, 808.56, 629.5, 800.82 z M629 .5, 800.82 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C553 .88, 738.24, 607.59, 770.53, 629.5, 800.82 z M710 .67, 676.94 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C701 .6, 667.66, 706.66, 671.81, 710.67, 676.94 z M831 .8, 766.5 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 C113 .88, 698.28, 70.27, 752.27, 70.27, 816.5 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C859 .89, 818.77, 849.42, 789.77, 831.8, 766.5 z M257 .33, 620.06 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C224 .37, 646.65, 238.22, 628.49, 257.33, 620.06 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M1790.15,395.96c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1818 .24, 448.23, 1807.77, 419.24, 1790.15, 395.96 z "
              />
              <path
                fill="#CBD5EB"
                d="M1297.28,255.74c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 c - 78.03, 0 - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1305 .3, 258.31, 1301.34, 256.89, 1297.28, 255.74 z M1587 .84, 430.28 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1597 .06, 445.63, 1593.44, 438.02, 1587.84, 430.28 z M1587 .84, 430.28 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1512 .23, 367.7, 1565.94, 399.99, 1587.84, 430.28 z M1669 .02, 306.41 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1659 .95, 297.12, 1665.01, 301.28, 1669.02, 306.41 z M1790 .15, 395.96 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1818 .23, 448.23, 1807.77, 419.24, 1790.15, 395.96 z M1215 .68, 249.52 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1182 .71, 276.12, 1196.57, 257.95, 1215.68, 249.52 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M2519.28,495.24c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2547 .37, 547.51, 2536.9, 518.52, 2519.28, 495.24 z "
              />
              <path
                fill="#CBD5EB"
                d="M2026.41,355.02c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C2034 .43, 357.59, 2030.47, 356.17, 2026.41, 355.02 z M2316 .98, 529.56 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C2326 .19, 544.91, 2322.57, 537.3, 2316.98, 529.56 z M2316 .98, 529.56 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C2241 .36, 466.98, 2295.07, 499.27, 2316.98, 529.56 z M2398 .15, 405.69 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2389 .08, 396.4, 2394.14, 400.55, 2398.15, 405.69 z M2519 .28, 495.24 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2547 .37, 547.51, 2536.9, 518.52, 2519.28, 495.24 z M1944 .82, 348.8 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1911 .85, 375.39, 1925.7, 357.23, 1944.82, 348.8 z "
              />
            </g>{" "}
            <g>
              <path
                fill="#FFFFFF"
                d="M2901.25,766.5c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2929 .34, 818.77, 2918.88, 789.77, 2901.25, 766.5 z "
              />
              <path
                fill="#CBD5EB"
                d="M2408.39,626.28c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C2416 .4, 628.85, 2412.45, 627.43, 2408.39, 626.28 z M2698 .95, 800.82 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C2708 .17, 816.17, 2704.55, 808.56, 2698.95, 800.82 z M2698 .95, 800.82 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C2623 .33, 738.24, 2677.05, 770.53, 2698.95, 800.82 z M2780 .12, 676.95 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2771 .05, 667.66, 2776.11, 671.81, 2780.12, 676.95 z M2901 .26, 766.5 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2929 .34, 818.77, 2918.87, 789.78, 2901.26, 766.5 z M2326 .79, 620.06 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C2293 .82, 646.65, 2307.68, 628.49, 2326.79, 620.06 z "
              />
            </g>{" "}
          </g>{" "}
          <clipPath id="SVGID_2_">
            <use xlinkHref="#SVGID_1_" overflow="visible" />
          </clipPath>{" "}
          <g transform="matrix(1.3 0 0 1.3 -60 -1170)" id="rocket">
            <g>
              <g id="rocket-back"> </g>{" "}
            </g>{" "}
            <g>
              <g>
                <path
                  fill="#FF3351"
                  d="M1285.58,1363.83h-79.24v660.64h83.51c13.09-98.39,43.57-342.5,44.64-458.23
    C1335 .05, 1504.56, 1312.24, 1429.81, 1285.58, 1363.83 z "
                />
                <path
                  fill="#D62E40"
                  d="M1314.91,1363.83h-29.33c26.65,65.97,49.47,140.73,48.91,202.41
    c - 1.06, 115.73 - 31.55, 359.83 - 44.64, 458.23 h44 .64 l39 .47 - 312.31 C1389 .14, 1592.05, 1368, 1471.36, 1314.91, 1363.83 z "
                />
                <path
                  fill="#FF3351"
                  d="M1206.34,1205.11v123h64.11c-22.37-50.57-44.88-92.56-56.91-114.13L1206.34,1205.11z"
                />
                <path
                  fill="#D62E40"
                  d="M1239.53,1246.01l-26-32.04c12.03,21.57,34.54,63.56,56.91,114.13h25.46
    C1279 .42, 1299.56, 1260.67, 1272.07, 1239.53, 1246.01 z "
                />
              </g>{" "}
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#FF475A"
                        d="M1096.02,1363.83c-53.08,107.53-74.21,228.22-59.03,348.33l39.47,312.31h128.15l1.73-660.64H1096.02
    z "
                      />
                    </g>{" "}
                  </g>{" "}
                  <g>
                    <g>
                      <polygon
                        fill="#FF475A"
                        points="1206.34,1363.83 1204.6,2024.47 1206.34,2024.47 1206.34,1363.83 								"
                      />
                    </g>{" "}
                  </g>{" "}
                  <g>
                    <g>
                      <path
                        fill="#C90B26"
                        d="M1206.34,1328.1v35.73h108.58c-5.96-12.07-12.24-24.01-19-35.73H1206.34z"
                      />
                    </g>{" "}
                  </g>{" "}
                  <g>
                    <g>
                      <path
                        fill="#D62E40"
                        d="M1206.34,1328.1h-91.31c-6.76,11.72-13.05,23.66-19.01,35.73h110.32V1328.1z"
                      />
                    </g>{" "}
                  </g>{" "}
                  <g>
                    <g>
                      <rect
                        x="1206.34"
                        y="1328.1"
                        fill="#C90B26"
                        width="0"
                        height="35.73"
                      />
                    </g>{" "}
                  </g>{" "}
                  <g>
                    <g>
                      <path
                        fill="#FF4A65"
                        d="M1171.42,1246.01c-21.14,26.05-39.9,53.54-56.38,82.09h91.31v-123L1171.42,1246.01z"
                      />
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  <g>
                    <g>
                      <g>
                        <path
                          fill="#FFB93B"
                          d="M1204.6,2109.41h42.82c48.09,0,87.07-37.65,87.07-84.09v-0.85H1204.6V2109.41z"
                        />
                      </g>{" "}
                    </g>{" "}
                    <g>
                      <g>
                        <path
                          fill="#FF475A"
                          d="M1317.19,1794.75l122.1,91.25c20.47,15.3,34.99,36.82,41.21,61.07l43.64,170.06
    c4 .78, 18.65, 1.11, 47.52 - 18.78, 47.76 l - 11.37 - 10.78 c - 11.81, 0.15 - 22.69 - 6.23 - 27.99 - 16.44 l - 58.85 - 113.21 h - 117.3 L1317 .19, 1794.75 z "
                        />
                      </g>{" "}
                    </g>{" "}
                    <g>
                      <g>
                        <path
                          fill="#C90B26"
                          d="M1314.61,1820.96l124.68,83.01c20.47,15.29,34.99,36.82,41.21,61.07l43.64,170.06
    c4 .78, 18.65 - 9.67, 36.74 - 29.56, 36.98 l - 0.58, 0.01 c - 11.81, 0.15 - 22.69 - 6.23 - 27.99 - 16.44 l - 58.85 - 113.21 l - 117.3 - 17.97 L1314 .61, 1820.96 z "
                        />
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    <g>
                      <g>
                        <path
                          fill="#FFCE76"
                          d="M1206.34,2109.41h-42.82c-48.08,0-87.07-37.65-87.07-84.09v-0.85h129.89V2109.41z"
                        />
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
              <path
                fill="#D62E40"
                d="M1210.86,1455.29c-0.29,0-0.57-0.04-0.86-0.04c-47.67,0-86.31,37.32-86.31,83.36
    c0, 46.03, 38.64, 83.36, 86.31, 83.36 c0 .29, 0, 0.57 - 0.04, 0.86 - 0.04 c47 .26 - 0.45, 85.44 - 37.56, 85.44 - 83.32 C1296 .3, 1492.85, 1258.12, 1455.74, 1210.86, 1455.29 z "
              />
              <g>
                <path
                  fill="#B70404"
                  d="M1204.6,1594.01c-34.76,0-62.94-27.21-62.94-60.79c0-33.58,28.18-60.79,62.94-60.79
    c0 .29, 0, 0.57, 0.04, 0.86, 0.04 v - 22.57 c - 0.29, 0 - 0.57 - 0.04 - 0.86 - 0.04 c - 47.67, 0 - 86.31, 37.32 - 86.31, 83.36 c0, 46.03, 38.64, 83.36, 86.31, 83.36 c0 .29, 0, 0.57 - 0.04, 0.86 - 0.04 v - 22.57 C1205 .18, 1593.97, 1204.9, 1594.01, 1204.6, 1594.01 z "
                />
                <path
                  fill="#C90B26"
                  d="M1290.91,1533.21c0-45.75-38.18-82.86-85.44-83.31v22.57c34.36,0.45,62.08,27.45,62.08,60.75
    c0, 33.3 - 27.72, 60.3 - 62.08, 60.75 v22 .57 C1252 .73, 1616.08, 1290.91, 1578.97, 1290.91, 1533.21 z "
                />
                <path
                  fill="#001142"
                  d="M1141.66,1533.21c0,33.58,28.18,60.79,62.94,60.79c0.29,0,0.57-0.04,0.86-0.04v-121.5
    c - 0.29, 0 - 0.57 - 0.04 - 0.86 - 0.04 C1169 .84, 1472.42, 1141.66, 1499.64, 1141.66, 1533.21 z "
                />
                <path
                  fill="#092159"
                  d="M1267.55,1533.21c0-33.29-27.72-60.3-62.08-60.75v121.5
    C1239 .82, 1593.51, 1267.55, 1566.51, 1267.55, 1533.21 z "
                />
              </g>{" "}
              <path
                fill="#F1F2F2"
                d="M1184.31,1510.99c0,4.44-3.6,8.04-8.04,8.04c-4.44,0-8.04-3.6-8.04-8.04s3.6-8.04,8.04-8.04
    C1180 .71, 1502.96, 1184.31, 1506.55, 1184.31, 1510.99 z "
              />
              <g opacity="0.55">
                <path
                  fill="#FF6178"
                  d="M1091.01,2032.8c0,0-5.2-49.46-11.69-123.67c-3.25-37.11-6.84-80.42-10.08-126.9
    c - 1.6 - 23.24 - 3.2 - 47.25 - 4.52 - 71.69 c - 1.36 - 24.43 - 2.55 - 49.26 - 3.27 - 74.14 c - 0.85 - 24.86 - 1.02 - 49.79 - 0.59 - 74.37 c0 .3 - 6.43, 0.47 - 12.16, 1.1 - 18.44 c0 .57 - 6.2, 1.22 - 12.34, 2.18 - 18.32 c1 .69 - 12.04, 4.18 - 23.77, 6.97 - 35.19 c11 .46 - 45.68, 29.38 - 85.79, 46.58 - 118.85 c17 .31 - 33.08, 34.24 - 59.18, 46.52 - 77.09 c12 .32 - 17.89, 20.11 - 27.56, 20.11 - 27.56 s - 7.43, 9.94 - 19.08, 28.24 c - 11.61, 18.3 - 27.54, 44.93 - 43.55, 78.4 c - 15.91, 33.43 - 32.18, 73.82 - 41.76, 118.88 c - 2.32, 11.26 - 4.33, 22.76 - 5.55, 34.48 c - 0.73, 5.87 - 1.12, 11.73 - 1.46, 17.59 c - 0.4, 5.78 - 0.36, 12.22 - 0.43, 17.98 c0 .37, 24.25, 1.33, 48.92, 2.98, 73.6 c1 .51, 24.67, 3.5, 49.35, 5.65, 73.61 c2 .1, 24.27, 4.48, 48.15, 6.83, 71.24 c4 .74, 46.19, 9.73, 89.25, 14.17, 126.15 c8 .89, 73.8, 15.66, 122.82, 15.66, 122.82 L1091 .01, 2032.8 z "
                />
              </g>{" "}
              <g>
                <g>
                  <path
                    fill="#FF3351"
                    d="M1093.76,1794.75l-122.11,91.25c-20.46,15.3-34.99,36.82-41.21,61.07l-43.64,170.06
    c - 4.78, 18.65 - 6.49, 47.52, 13.39, 47.76 l16 .76 - 10.78 c11 .82, 0.15, 22.69 - 6.23, 27.99 - 16.44 l58 .84 - 113.21 l115 .46 - 0.23 L1093 .76, 1794.75 z "
                  />
                </g>{" "}
              </g>{" "}
              <g>
                <g>
                  <path
                    fill="#D62E40"
                    d="M1096.23,1817l-124.58,91.25c-20.46,15.3-34.99,36.82-41.21,61.07l-43.64,170.06
    c - 4.78, 18.65, 9.68, 36.73, 29.56, 36.98 l0 .59, 0.01 c11 .82, 0.15, 22.69 - 6.23, 27.99 - 16.44 l58 .84 - 113.21 l115 .46 - 22.48 L1096 .23, 1817 z "
                  />
                </g>{" "}
              </g>{" "}
              <polygon
                opacity="0.15"
                fill="#D62E40"
                points="1096.23,1817 1293.1,2013.88 1289.85,2024.47 1119.25,2024.24 				"
              />
            </g>{" "}
            <g id="fier">
              <g>
                <g>
                  <path
                    fill="#FF3636"
                    d="M1206.34,2393.42v-253.61h-0.71c-38.42,0-69.94,43.15-69.45,101.02
    C1136 .71, 2302.75, 1206.34, 2393.42, 1206.34, 2393.42 z "
                  />
                </g>{" "}
              </g>{" "}
              <g>
                <g>
                  <path
                    fill="#FF2929"
                    d="M1206.34,2393.42v-253.61h0.7c38.42,0,69.94,43.15,69.45,101.02
    C1275 .96, 2302.75, 1206.34, 2393.42, 1206.34, 2393.42 z "
                  />
                </g>{" "}
              </g>{" "}
              <g>
                <g>
                  <path
                    fill="#FFCF7B"
                    d="M1204.42,2318.6l1.92,1.88v-173.11h-0.48c-26.22,0-47.48,30.59-47.48,68.31l0.08,0.65
    C1163 .55, 2257.96, 1180.13, 2294.84, 1204.42, 2318.6 z "
                  />
                </g>{" "}
              </g>{" "}
              <g>
                <g>
                  <path
                    fill="#FFC95C"
                    d="M1208.25,2318.6l-1.91,1.88v-58.16v-114.95h0.48c26.22,0,47.48,30.59,47.48,68.31l-0.08,0.65
    C1249 .13, 2257.96, 1232.55, 2294.84, 1208.25, 2318.6 z "
                  />
                </g>{" "}
              </g>{" "}
              <path
                fill="#FFC95C"
                d="M1184.26,2177.65l0.09-2.14c0.57-12.87,9.05-24.04,21.3-28.06l0.21-0.07v108.89l-0.23-0.36
    C1190 .49, 2232.69, 1183.02, 2205.32, 1184.26, 2177.65 z "
              />
              <path
                fill="#FFC95C"
                d="M1227.45,2177.65l-0.09-2.14c-0.57-12.87-9.05-24.04-21.3-28.06l-0.21-0.07v108.89l0.23-0.36
    C1221 .22, 2232.69, 1228.69, 2205.32, 1227.45, 2177.65 z "
              />
            </g>{" "}
          </g>{" "}
          <g id="cloud2">
            <path
              fill="#FFFFFF"
              d="M1635.47,1295.27c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1663 .56, 1347.54, 1653.09, 1318.55, 1635.47, 1295.27 z "
            />
            <path
              fill="#CBD5EB"
              d="M1142.6,1155.05c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.76, 16.02 - 65.34 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 s - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1150 .62, 1157.62, 1146.66, 1156.2, 1142.6, 1155.05 z M1433 .17, 1329.59 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C1442 .38, 1344.94, 1438.77, 1337.33, 1433.17, 1329.59 z M1433 .17, 1329.59 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1357 .55, 1267.01, 1411.26, 1299.3, 1433.17, 1329.59 z M1514 .34, 1205.72 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C1505 .27, 1196.43, 1510.33, 1200.59, 1514.34, 1205.72 z M1635 .47, 1295.27 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.4 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C1663 .56, 1347.54, 1653.09, 1318.55, 1635.47, 1295.27 z M1061 .01, 1148.83 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1028 .04, 1175.42, 1041.9, 1157.26, 1061.01, 1148.83 z "
            />
          </g>{" "}
          <g id="cloud3">
            <path
              fill="#FFFFFF"
              d="M2198.21,1413.34c4.08-8.47,6.37-17.97,6.37-28c0-35.64-28.89-64.53-64.53-64.53
    c - 14.86, 0 - 28.53, 5.03 - 39.43, 13.47 c - 11.81 - 15.11 - 30.19 - 24.84 - 50.86 - 24.84 c - 21.29, 0 - 40.17, 10.32 - 51.92, 26.22 c - 0.34 - 0.09 - 0.68 - 0.15 - 1.02 - 0.23 c11 .19 - 21.42, 17.56 - 45.76, 17.56 - 71.59 c0 - 85.51 - 69.32 - 154.83 - 154.83 - 154.83 c - 85.51, 0 - 154.83, 69.32 - 154.83, 154.83 c0, 6.74, 0.48, 13.37, 1.31, 19.89 c - 9.05 - 4.84 - 19.39 - 7.59 - 30.37 - 7.59 c - 3.55, 0 - 7.03, 0.3 - 10.42, 0.85 c - 10.18 - 6.72 - 22.38 - 10.65 - 35.5 - 10.65 c - 33.62, 0 - 61.23, 25.72 - 64.24, 58.55 c - 72, 5.14 - 128.83, 65.15 - 128.83, 138.46 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .47, 50.6, 77.84, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.5 c28 .38, 35.26, 71.86, 57.84, 120.65, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.36, 44.61, 7.36 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2226 .29, 1465.61, 2215.83, 1436.61, 2198.21, 1413.34 z "
            />
            <path
              fill="#CBD5EB"
              d="M1705.34,1273.12c-0.2-3.1-0.61-6.14-0.61-9.29c0-85.51,69.31-154.83,154.82-154.83
    s154 .83, 69.32, 154.83, 154.83 c0, 14.62 - 2.24, 28.67 - 6.03, 42.07 c - 9.97, 4.13 - 18.73, 10.58 - 25.06, 19.14 c - 0.31 - 0.08 - 0.62 - 0.14 - 0.93 - 0.21 c10 .21 - 19.54, 16.02 - 41.75, 16.02 - 65.33 c0 - 78.03 - 63.26 - 141.28 - 141.28 - 141.28 c - 78.03, 0 - 141.28, 63.25 - 141.28, 141.28 c0, 6.15, 0.44, 12.2, 1.2, 18.15 C1713 .36, 1275.69, 1709.4, 1274.27, 1705.34, 1273.12 z M1995 .9, 1447.66 c6 .02, 12.99, 9.22, 22.25, 9.22, 22.25 C2005 .12, 1463.01, 2001.5, 1455.4, 1995.9, 1447.66 z M1995 .9, 1447.66 c - 8.27 - 17.85 - 22.04 - 42.94 - 41.68 - 62.58 c0, 0, 0 - 84.83 - 33.93 - 101.8 c0, 0, 33.93, 67.87, 0, 101.8 C1920 .28, 1385.08, 1974, 1417.37, 1995.9, 1447.66 z M2077 .07, 1323.79 c2 .06 - 1.59, 4.29 - 2.96, 6.55 - 4.28 c - 6.41 - 4.01 - 13.42 - 7.02 - 21.09 - 8.58 C2068 .01, 1314.5, 2073.06, 1318.65, 2077.07, 1323.79 z M2198 .21, 1413.34 c4 .08 - 8.47, 6.38 - 17.97, 6.38 - 28 c0 - 33.71 - 25.96 - 61.08 - 58.93 - 63.96 c15 .84, 10.56, 26.29, 28.54, 26.29, 49 c0, 9.15 - 2.09, 17.82 - 5.82, 25.55 c16 .08, 21.24, 25.63, 47.7, 25.63, 76.39 c0, 69.98 - 56.73, 126.71 - 126.71, 126.71 c - 14.25, 0 - 27.93 - 2.39 - 40.71 - 6.72 c - 24.22, 43.01 - 70.28, 72.07 - 123.16, 72.07 c - 44.51, 0 - 84.2 - 20.6 - 110.09 - 52.78 c - 24.45, 20.23 - 55.81, 32.39 - 90.02, 32.39 c - 55.22, 0 - 103.01 - 31.7 - 126.25 - 77.87 c - 58.94 - 10.87 - 103.61 - 62.49 - 103.61 - 124.57 c0 - 48.88, 27.75 - 91.18, 68.29 - 112.3 c - 59.21, 15.87 - 102.83, 69.86 - 102.83, 134.09 c0, 68.04, 48.95, 124.61, 113.54, 136.52 c25 .46, 50.6, 77.83, 85.34, 138.35, 85.34 c37 .49, 0, 71.86 - 13.33, 98.65 - 35.49 c28 .38, 35.26, 71.86, 57.84, 120.64, 57.84 c57 .95, 0, 108.42 - 31.85, 134.97 - 78.99 c14 .01, 4.75, 29, 7.37, 44.61, 7.37 c76 .69, 0, 138.86 - 62.17, 138.86 - 138.86 C2226 .29, 1465.61, 2215.83, 1436.61, 2198.21, 1413.34 z M1623 .74, 1266.9 c - 28.74, 2.7 - 51.8, 24.05 - 57.1, 51.95 c7 .16 - 1.82, 14.54 - 3.1, 22.13 - 3.64 C1590 .77, 1293.49, 1604.63, 1275.33, 1623.74, 1266.9 z "
            />
          </g>{" "}
        </g>{" "}
      </svg>{" "}
    </div>
  );
});

export default Opening;
