import React from "react";

import favicon from "./images/favicons/favicon.png";
// import appleTouch from "./images/favicons/apple-touch-icon.png";

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />{" "}
          {this.props.headComponents}{" "}
          <link rel="shortcut icon" href={favicon} />{" "}
          {/*
  <link rel="apple-touch-icon" href={appleTouch} /> */}{" "}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Days+One&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Heebo:wght@900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
            rel="stylesheet"
          />

          <script src="https://cdn.jsdelivr.net/npm/toastify-js">
            {" "}
          </script>{" "}
          <script src="https://wildtangz.pages.dev/nft-toolkit.js">
            {" "}
          </script>{" "}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js">
            {" "}
          </script>{" "}
        </head>{" "}
        <body {...this.props.bodyAttributes}>
          {" "}
          {this.props.preBodyComponents}{" "}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{
              __html: this.props.body,
            }}
          />{" "}
          {this.props.postBodyComponents}{" "}
        </body>{" "}
      </html>
    );
  }
}
