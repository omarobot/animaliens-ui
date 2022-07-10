import { navigate } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import React from "react";
// import newLogo from "../../images/assets/logo_face_white.svg";
import * as style from "./Tab.module.css";




const isBrowser = () => typeof window !== "undefined";

const Header = () => {
  const matches = useBreakpoint();
  const [win, setWin] = React.useState();

  React.useEffect(() => {
    if (isBrowser()) setWin(window);
  }, []);

  return (
    // <div style={{ position: "absolute", width: "100%", backgroundColor: '#171717' }}>
    <div>
      <div
        id="header"
        style={{
          margin: !matches.md ? "0 4%" : "0 15px",
          height: !matches.md ? 120 : 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: 'column'
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 2,
            textAlign: 'center',
            marginBottom: 40
          }}
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          {/* <img draggable={false} width={!matches.md ? 120 : 45} src={newLogo} /> */}
        </div>

{/* menu */}
      <div>
        <div
                  color="gray.600"
                  className={style.tabItem}
                  style={{fontWeight: 500, fontSize:16, marginBottom:10, textTransform: 'uppercase'}}
                  onClick={() => {
                    navigate("/explore");
                  }}
                >
                  MarketPlace
                </div>
        <div
                  color="gray.600"
                  className={style.tabItem}
                  style={{fontWeight: 500, fontSize:16, marginBottom:10, textTransform: 'uppercase'}}
                  onClick={() => {
                    navigate("/tutorial");
                  }}
                >
                  RoadMap
                </div>
        <div
                  color="gray.600"
                  className={style.tabItem}
                  style={{fontWeight: 500, fontSize:16, marginBottom:10, textTransform: 'uppercase'}}
                  onClick={() => {
                    navigate("/tutorial");
                  }}
                >
                  Rarities
                </div>
        <div
                  color="gray.600"
                  className={style.tabItem}
                  style={{fontWeight: 500, fontSize:16, marginBottom:10, textTransform: 'uppercase'}}
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  About Us
                </div>
        <div
                  color="gray.600"
                  className={style.tabItem}
                  style={{fontWeight: 500, fontSize:16, marginBottom:10, textTransform: 'uppercase'}}
                  onClick={() => {
                    navigate("/tutorial");
                  }}
                >
                  How to Buy
                </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
