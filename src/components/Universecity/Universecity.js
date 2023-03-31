import React, { useState } from "react";
import "./Universecity.css";
import { Link } from "gatsby";
import RecLogo from "../../images/assets/update/Rectangle.png";
const Universecity = () => {
  const [walletConnected, setwalletConnected] = useState(false);
  const [AnimFound, setAnimFound] = useState(false);
  let walletToggle = () => {
    if (walletConnected === false) {
      setwalletConnected(true);
    } else {
      setwalletConnected(false);
    }
  };

  let AnimBuy = () => {
    setAnimFound(true);
  };
  return (
    <div className="universe-bg">
      <div className="ui-content">
        <h3>WELCOME TO</h3>
        <div className="logo-img">
          <img src={RecLogo} alt="" />
        </div>

        {walletConnected ? (
          <>
            <h3 className={AnimFound ? "hidden" : "btn-txet red-clr  "}>
              NO ANIMALIENS FOUND ON WALLET
            </h3>
            <h3 className={AnimFound ? "hidden" : "btn-txet"} onClick={AnimBuy}>
              BUY ANIMALIENS
            </h3>
          </>
        ) : (
          <h3 className="btn-txet" onClick={walletToggle}>
            CONNECT YOUR WALLET
          </h3>
        )}
        <Link to="/universecity/universecityData">
          <h3 className={AnimFound ? "btn-txet" : "hidden"}>START LEARNING</h3>
        </Link>
      </div>
    </div>
  );
};

export default Universecity;
