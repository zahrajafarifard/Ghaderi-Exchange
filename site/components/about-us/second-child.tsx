"use client";
import React from "react";
import LeftSecondChild from "./left-second-child";
import LeftSecondChild2 from "./left-small-screen-second-child";
import RightSecondChild from "./right-second-child";

const SecondChild = () => {
  return (
    <div id="about-us" className="bg-[#F6F6F6] py-24 ">
      <div className="w-[85%] mx-auto grid grid-cols-2 gap-x-10 screen1440:gap-x-0 screen1200:w-[90%] screen980:grid-cols-1 ">

        <LeftSecondChild />
        <RightSecondChild />
        <div className="hidden screen980:grid">
          <LeftSecondChild2 />
        </div>
      </div>
    </div>
  );
};

export default SecondChild;
