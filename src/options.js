// Get the media data from local storage
chrome.storage.local.get(null, (data) => {
    // Get a reference to the container element in the options page
    const container = document.getElementById("media-container");
    container.style.background='orange'
    // Loop through the media data and create HTML elements to display it
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const src = data[key];
        const element = document.createElement("div");
        element.innerHTML = `<img src="${src}">`;
        container.appendChild(element);
      }
    }
  });


  import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./options.css";

const App = () => {
    chrome.storage.local.get(null, (data) => {
        // Get a reference to the container element in the options page
        const container = document.getElementById("root");
        container.style.background='orange'
        // Loop through the media data and create HTML elements to display it
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const src = data[key];
            const element = document.createElement("div");
            element.innerHTML = `<img src="${src}">`;
            container.appendChild(element);
          }
        }
      });
    

  return (
    <>
  <div>all elements</div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

  