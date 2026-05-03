"use client";

import React, { useState } from "react";
import Link from "next/link";
import Currency from "./currency/page";
import Coin from "./coin/page";

const FeaturedItems = () => {
  const [selectedItem, setSelectedItem] = useState<"currency" | "gold">(
    "currency"
  );

  return (
    <div
      className="shadow-[0px_1px_30px_8px_rgba(1,1,1,0.045)] w-full mx-auto  -mt-20 bg-white rounded-[24px] z-10 relative
      screen660:-mt-24 "
    >
      <div className="flex flex-row justify-between mx-8 mt-4  border-b py-4 border-[#E5E5E5] screen550:justify-end">
        <Link href="#prices" className="screen550:hidden">
          <div className="bg-[#DFF6E3] rounded-full text-[#48934B] py-2 px-5 cursor-pointer screen1200:text-sm">
            مشاهده بیشتر
          </div>
        </Link>

        <div className="flex flex-row-reverse space-x-7 space-x-reverse screen850:space-x-3 screen400:space-x-0">
          <button
            onClick={() => setSelectedItem("currency")}
            className={`rounded-full font-bold text-lg py-2 px-5 transition duration-300 screen850:py-1 ${
              selectedItem === "currency"
                ? "bg-[#33b446] text-white hover:bg-[#258333] active:bg-[#258333]"
                : "text-[#2D2D2D]"
            } screen1200:text-base screen850:text-sm screen400:text-xs whitespace-nowrap`}
          >
            قیمت به روز ارز
          </button>

          <button
            onClick={() => setSelectedItem("gold")}
            className={`rounded-full font-bold text-lg py-2 px-5 transition duration-300 screen850:py-1 ${
              selectedItem === "gold"
                ? "bg-[#33b446] text-white hover:bg-[#258333] active:bg-[#258333]"
                : "text-[#2D2D2D]"
            } screen1200:text-base screen850:text-sm screen400:text-xs whitespace-nowrap`}
          >
            قیمت به روز سکه
          </button>
        </div>
      </div>

      <div className="mt-12 w-full mx-auto px-8 screen450:px-4 screen660:mt-0">
        {selectedItem === "currency" ? <Currency /> : <Coin />}
      </div>
    </div>
  );
};

export default FeaturedItems;
