import React from "react";
import Image from "next/image";
import Link from "next/link";

import {Hamrah} from "../../app/fonts";
import abouUs from "@/public/images/about-us.png";
import FirstChildAboutUs from "./first-child-aboutUs";

const FirstChild = () => {
  return (
    <div>
      <h1
        className={`text-[#2D2D2D] mt-20 text-center text-[64px] tracking-[0.64px] ${Hamrah.className}
          screen1350:text-[52px] screen660:text-[40px]
        `}
      >
        دربـــاره مــــا
      </h1>
      <h5
        style={{ direction: "rtl" }}
        className="text-[#777E90] text-xl tracking-[0.2px] w-1/3 mx-auto text-center leading-7 mt-6 mb-12 
        screen1600:w-[42%] screen1350:w-[50%] screen1350:text-lg screen1100:w-[60%] screen850:w-[75%] 
        screen660:text-base screen660:w-[90%] screen660:leading-8"
      >
        <FirstChildAboutUs />
      </h5>
      <Link href="#about-us">
        <div
          className="bg-[#33b446] text-white hover:bg-[#258333] active:bg-[#258333] rounded-[90px] py-4  font-bold w-48 text-center mx-auto 
          screen1350:py-3 screen1350:w-40
          screen660:py-2 screen660:w-36
        "
        >
          ادامه بده
        </div>
      </Link>

      <div>
        <Image
          src={abouUs}
          alt="درباره ما"
          width={800}
          height={800}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default FirstChild;
