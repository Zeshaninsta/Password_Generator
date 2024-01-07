import React, { useState } from "react";
import "./land.css";

function Sidebar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isRotated, setIsRotated] = useState(false);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="side fixed w-full backdrop-blur-lg flex justify-between items-center p-5 shadow-sm">
      <div>
        <h1 className="font-poppins font-bold text-2xl text-white">Pass</h1>
      </div>
      <div className={`lg:flex ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <ul className="flex justify-center items-center gap-5 text-white font-poppins font-medium">
          <li className="cursor-pointer">
            <a>Home</a>
          </li>
          <li className="cursor-pointer">
            <a>About</a>
          </li>
          <li className="cursor-pointer">
            <a>Saved</a>
          </li>
        </ul>
      </div>
      <div
        className="text-4xl text-white cursor-pointer"
        onClick={() => {
          toggleRotation();
          toggleMobileMenu();
        }}
        // onClick={toggleMobileMenu}
      >
        <span className={`rotate-text ${isRotated ? "rotate-90" : ""}`}>
          &#9778;
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
