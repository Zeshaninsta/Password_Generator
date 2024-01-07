import React from "react";
import Main from "./main";
import Sidebar from "./sidebar";
import "./land.css";
import Landing from "./Landing";

function index() {
  return (
    <div className="index">
      <Sidebar />
      <Main />
    </div>
  );
}

export default index;
