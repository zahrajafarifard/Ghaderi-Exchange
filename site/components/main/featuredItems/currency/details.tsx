"use client";
import React, { useState } from "react";
import Image from "next/image";

import us from "@/public/images/united states.svg";
import eur from "@/public/images/eur.svg";
import ca from "@/public/images/canada.svg";
import aud from "@/public/images/australia.svg";

interface FeaturedItemsType {
  Currency: { name: string };
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

  const getFlagImage = () => {
    const currencyName = item.Currency.name;
    if (currencyName.includes("آمریکا")) return us;
    if (currencyName.includes("کانادا")) return ca;
    if (currencyName.includes("یورو")) return eur;
    if (currencyName.includes("استرالیا")) return aud;

    return us;
  };

  const calculatePercentageChange = () => {
    if (!item || item.pBuyPrice === 0) return "0.00%";

    const percentageChange =
      ((item.buyPrice - item.pBuyPrice) / item.pBuyPrice) * 100;

    return `${percentageChange > 0 ? "+" : ""}${percentageChange.toFixed(2)} %`;
  };

  return (
    <div
      onMouseEnter={() => setHoveredIndex(item.id)}
      onMouseLeave={() => setHoveredIndex(1)}
      className={`mb-8  py-8 px-10 w-full mr-2 screen850:mr-0
        ${
          hoveredIndex === item.id
            ? "shadow-[0px_1px_30px_8px_rgba(1,1,1,0.045)] rounded-[12px]"
            : "screen850:shadow-[0px_1px_30px_8px_rgba(1,1,1,0.045)] screen850:rounded-[12px]"
        }
      screen1200:px-8 screen900:py-6 screen850:px-6 screen750:mb-6 screen660:my-4`}
    >
      <div style={{ direction: "rtl" }} className="flex flex-row">
        <Image
          src={getFlagImage()}
          width={24}
          height={24}
          alt="ارز"
          className="my-auto"
        />
        <span className="text-right mr-2 my-auto font-bold text-[#2D2D2D] text-sm screen900:text-[13px] screen900:mr-1">
          {item?.Currency?.name}
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
          {calculatePercentageChange()}
        </p>
      </div>
    </div>
  );
};

export default Details;
