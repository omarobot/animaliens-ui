import React from "react";
import "./content.css";
const Content = () => {
  return (
    <div className="content-section">
      <div className="section-bg">
        <h3 className="content-head">Course content</h3>
        <div className="content-list">
          <ul>
            <li> Install Python and write your first program</li>
            <li> Describe the basics of the Python programming language</li>
            <li> Use variables to store, retrieve and calculate information</li>
            <li> Utilize core programming tools such as functions and loops</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Content;
