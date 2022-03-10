import React from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";

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
        <div
          style={{
            width: "15%",
            backgroundColor: "#171717",
            color: "#fff",
          }}
        >
          <Header />
        </div>
        <div style={{ width: "85%", backgroundColor: "#000", color: "#fff" }}>
          {props.children}
          {/* <Footer /> */}
        </div>
      </div>
    </StoreProvider>
  );
};

export default Layout;
