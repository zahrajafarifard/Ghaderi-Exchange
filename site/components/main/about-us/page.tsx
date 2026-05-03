"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import Img from "@/public/images/IMG.png";

const AboutUS = () => {
  const [aboutUs, setAboutUs] = useState<string>("");

  useEffect(() => {
    const _data = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getConfig`
      );

      switch (response.status) {
        case 200:
          const data = await response.json();

          setAboutUs(data?.aboutUs);

          break;

        default:
          break;
      }
    };
    _data();
  }, []);

  return (
    <div
      className="grid grid-cols-2 my-auto items-center gap-x-14 screen1200:gap-x-10
      screen800:grid-cols-1 "
    >
      <Image
        src={Img}
        className="w-fit h-full mx-auto my-auto object-contain"
        alt="درباره ما"
      />
      <div className="">
        <h2
          className="text-center text-[#2D2D2D] font-bold text-[48px] mb-10
            screen1350:text-[40px]
            screen1200:text-[34px]
            screen1200:mb-6
            screen800:text-[32px]
            screen800:my-9
            screen450:text-3xl "
        >
          دربـــاره صـــرافــی قـــادری
        </h2>
        <div
          className="shadow-[0px_1px_30px_8px_rgba(1,1,1,0.045)] p-12 rounded-[12px]
            screen1200:p-8
            screen850:p-6
            screen800:p-10
            screen450:px-6 "
        >
          <h3
            className="text-right text-[#2D2D2D] text-[24px] font-bold mb-4
              screen1350:text-xl
              screen1200:text-lg
              screen1200:mb-2
              screen800:text-[20px]
              screen800:mb-3
              screen450:text-lg "
          >
            معرفی شرکت فرهاد قادری و شرکاء
          </h3>
          <h4
            style={{ direction: "rtl" }}
            className="text-justify text-[#787879] text-xl tracking-[-0.2px] leading-8
              screen1350:text-lg
              screen1200:text-base"
          >
            {aboutUs}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
