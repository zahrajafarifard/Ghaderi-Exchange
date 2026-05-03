import React from "react";
import Banner from "./banner/page";
import FeaturedItems from "./featuredItems/page";
import AllItems from "./allItems/page";
import Functionality from "./functionality/page";
import AboutUS from "./about-us/page";

const Main = () => {
  return (
    <div>
      <Banner />
      <div className="w-[90%] mx-auto">
        <FeaturedItems />
        <AllItems />
      </div>
      <Functionality />
      <div className="w-[90%] mx-auto py-24 screen1100:py-20">
        <AboutUS />
      </div>
    </div>
  );
};

export default Main;
