import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopBar from './components/TopBar'
import DrawWindow from "./components/DrawWindow";
import "./App.css";

function App() {
  return <div className="App" style={{backgroundColor:"black", color:"white"}}>
    <TopBar />
    <DrawWindow />
  </div>;
}

export default App;
