import React, { useEffect, useState } from "react";

function YourComponent() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= 100; i++) {
      const box = (
        <div className="box bg-gray-900 animate" key={i}>
          {/* Content */}
        </div>
      );
      setBoxes((prevBoxes) => [...prevBoxes, box]);
    }
  }, []);

  function animateBox() {
    const num = Math.floor(Math.random() * boxes.length);
    // Add your animation logic here
  }

  useEffect(() => {
    const interval = setInterval(animateBox, 1000); // Adjust the interval as needed

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [boxes]);

  return (
    <div className="YourComponent">
      <div className="sec bg-black h-screen w-screen overflow-hidden flex flex-wrap gap-4">
        {boxes}
      </div>
      <style>
        {`
          @keyframes animate {
            0% {
              filter: hue-rotate(0deg);
            }
            50% {
              background: #0f0;
            }
            100% {
              filter: hue-rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default YourComponent;
