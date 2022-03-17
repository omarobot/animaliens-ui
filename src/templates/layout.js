import { Button } from "@chakra-ui/react";
import { StoreProvider } from "easy-peasy";
import React from "react";
import SidebarWithHeader from "../components/Header/Sidebar";
import store from "../store";
import { StartButton } from "../components/Account";
import "./layout.css";

const Layout = (props) => {
  return (
    <StoreProvider store={store}>
      <div
        className="layout"
        style={{
          width: "100%",
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div id="sidebar">
          {" "}
          {/* <Header  /> */} <SidebarWithHeader />
        </div>{" "}
        <div>
          <StartButton id="connect-btn" />{" "}
          {/* <Button
            onClick={() => alert("Please add functionality as needed.")}
            id="connect-btn"
            variant={"solid"}
          >
            Connect
          </Button>{" "} */}
        </div>{" "}
        <div id="bodyContent">
          {" "}
          {props.children} {/* <Footer /> */}{" "}
        </div>{" "}
      </div>{" "}
    </StoreProvider>
  );
};

export default Layout;
