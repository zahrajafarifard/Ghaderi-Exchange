import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Hamrah } from "@/app/layout";
import contactUs from "@/public/images/contact-us.png";

const FirstChild = () => {
  return (
    <div>
      <h1
        className={`text-[#2D2D2D] mt-20 text-center text-[64px] tracking-[0.64px] ${Hamrah.className}
          screen1350:text-[52px] screen660:text-[40px]`}
      >
        تــمــاس بــا مــــا
      </h1>

      <Link href="#contact-us">
        <div
          className="bg-[#33b446] text-white hover:bg-[#258333] active:bg-[#258333] rounded-[90px] py-4 font-bold w-48 text-center mx-auto mt-12 
            screen1350:mt-10 screen1350:py-3 screen1350:w-40
            screen660:mt-7 screen660:py-2 screen660:w-36"
        >
          ادامه بده
        </div>
      </Link>

      <div>
        <Image
          src={contactUs}
          alt="تماس با ما"
          width={800}
          height={800}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default FirstChild;
