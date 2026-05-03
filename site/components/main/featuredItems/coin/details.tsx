"use client";

import React, { useState } from "react";
import Image from "next/image";

import emami from "@/public/images/emami.svg";
import emamiOld from "@/public/images/emami-old.svg";
import tamam from "@/public/images/tamam.png";

interface FeaturedItemsType {
  Coin: { name: string };
  id: number;
  buyPrice: number;
  pBuyPrice: number;
  sellPrice: number;
  pSellPrice: number;
}

interface PropsType {
  item: FeaturedItemsType;
}

const Details: React.FC<PropsType> = ({ item }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(1);

  const calculatePercentageChange = () => {
    if (!item || item.pBuyPrice === 0) return "0.00%";

    const percentageChange =
      ((item.buyPrice - item.pBuyPrice) / item.pBuyPrice) * 100;

    return `${percentageChange > 0 ? "+" : ""}${percentageChange.toFixed(2)} %`; // Add "+" if positive
  };

  return (
    <div
      onMouseEnter={() => setHoveredIndex(item.id)}
      onMouseLeave={() => setHoveredIndex(1)}
      className={`mb-8 py-8 px-10 w-full mr-2 screen850:mr-0
      ${
        hoveredIndex === item.id
          ? "shadow-[0px_1px_30px_8px_rgba(1,1,1,0.045)] rounded-[12px]"
          : "screen850:shadow-[0px_1px_30px_8px_rgba(1,1,1,0.045)] screen850:rounded-[12px]"
      } screen1200:px-8 screen900:py-6 screen850:px-6 screen750:mb-6 screen660:my-4`}
    >
      <div style={{ direction: "rtl" }} className="flex flex-row">
        <Image
          src={
            item?.Coin?.name.includes("قدیم")
              ? emamiOld
              : item?.Coin?.name.includes("اما")
              ? emami
              : tamam
          }
          width={24}
          height={24}
          alt="سکه"
          className="my-auto"
        />
        <span className="text-right mr-2 my-auto font-bold text-[#2D2D2D] text-sm screen900:text-[13px] screen900:mr-1">
          {item?.Coin?.name}
        </span>
      </div>

      <div
        style={{ direction: "rtl" }}
        className="text-[#2D2D2D] text-2xl font-bold mt-2 mb-3 screen1200:text-xl screen900:text-lg"
      >
        <span>{item?.buyPrice.toLocaleString()}</span>
        <span>تومان</span>
      </div>

      <div style={{ direction: "rtl" }} className="flex flex-row">
        <span className="text-[#2D2D2D] text-sm my-auto screen900:text-[13px] ">
          {item?.pBuyPrice.toLocaleString()}
        </span>

        <p
          style={{ direction: "ltr" }}
          className={`mr-2 rounded-[24px] text-white text-xs font-bold py-0.5 px-2 screen900:text-[11px] screen900:mr-1.5
                ${
                  Number(calculatePercentageChange().replace("%", "")) >= 0
                    ? "bg-[#58BD7D]"
                    : "bg-[#D33535]"
                }
            `}
        >
          {calculatePercentageChange()}{" "}
        </p>
      </div>
    </div>
  );
};

export default Details;
