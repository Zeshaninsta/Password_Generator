import React from "react";
import Security from "./Asset/bg.png";
import "./land.css";
import Test from "./Test";

function Landing() {
  return (
    <div>
      <div className="land flex flex-col-reverse lg:flex-row items-center justify-around h-screen p-5 lg:gap-5">
        <div className="text-center flex justify-center items-center flex-col w-full lg:w-1/2 pass ">
          <h1 className="text-white font-bold text-2xl lg:text-6xl uppercase text-center lg:text-left font-poppins mb-5">
            Password Gen
          </h1>
          <div className="p-5 border-2 border-white shadow-lg flex items-center justify-center lg:w-[500px]">
            <q className="font-poppins font-normal text-4xl italic text-white text-center lg:text-left">
              Strength Lies in Security: Empowering You in the Digital Realm.
            </q>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
          <img src={Security} alt="security" className="w-full lg:w-auto" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
