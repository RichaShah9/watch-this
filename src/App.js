import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import WatchThis from "./WatchThis";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <WatchThis />
      </Router>
    </div>
  );
}

export default App;
