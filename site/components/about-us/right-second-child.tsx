"use client";
import React, { useState } from "react";
import Image from "next/image";

import icon1 from "@/public/images/Graph.svg";
import icon2 from "@/public/images/calendar-tick.svg";
import icon3 from "@/public/images/smartphone 2.svg";

const services = [
  {
    id: 0,
    icon: icon1,
    title: "انجام امور ارزی",
    description:
      "با داشتن شعب ارزی در سایر نقاط جهان (امارات متحده عربی-اتحادیه اروپا-ترکیه-...)",
    bgColor: "bg-[#D33535] bg-opacity-[0.1]",
  },
  {
    id: 1,
    icon: icon2,
    title: "تحویل حواله به صورت دستی",
    description:
      "تحویل حواله به صورت دستی در دفتر ترکیه و امارات متحده و اتحادیه اروپا",
    bgColor: "bg-[#58BD7D] bg-opacity-[0.1]",
  },
  {
    id: 2,
    icon: icon3,
    title: "ارسال حواله جات ارز از ایران",
    description:
      "ارسال حواله جات ارز از ایران به سراسر دنیا در کمترین زمان ممکن",
    bgColor: "bg-[#3772FF] bg-opacity-[0.1]",
  },
];

const RightSecondChild = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <div>
      <div>
        <h1
          className="text-[#2D2D2D] text-5xl font-bold leading-[56px] tracking-[-0.96px] text-right 
          screen1400:text-[40px] screen1350:text-4xl screen900:text-3xl screen550:text-2xl"
        >
          معرفی شرکت فرهاد قادری و شرکاء
        </h1>
        <h5
          style={{ direction: "rtl" }}
          className="text-[#777E90] text-xl text-right leading-7 mt-4 mb-12 screen1350:text-lg screen1350:mb-9 screen900:text-base"
        >
          فعالیت های این مجموعه شامل :
        </h5>

        {services.map((service) => (
          <div
            key={service.id}
            onMouseEnter={() => setHoveredIndex(service.id)}
            onMouseLeave={() => setHoveredIndex(0)}
            className={`p-6 rounded-[12px] flex flex-row-reverse space-x-8 space-x-reverse my-3 transition-all duration-300 screen1350:my-2 screen1350:p-5 screen900:p-4 ${
              hoveredIndex === service.id ? "bg-white" : "bg-transparent"
            } screen1150:space-x-6 screen1150:space-x-reverse`}
          >
            <div
              className={`${service.bgColor} p-[22px] rounded-[12px] w-fit ml-auto my-auto screen1350:p-5`}
            >
              <Image
                src={service.icon}
                width={44}
                height={44}
                alt={service.title}
                className="screen1350:w-10"
              />
            </div>
            <div className="w-full my-auto">
              <h3 className="text-[#2D2D2D] text-right text-2xl font-bold leading-8 screen1350:text-xl screen1350:leading-9 screen900:text-lg">
                {service.title}
              </h3>
              <h5 className="text-[#777E90] text-right leading-6 screen1350:text-sm screen1350:leading-6 screen900:text-xs">
                {service.description}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSecondChild;
