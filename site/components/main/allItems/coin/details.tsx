"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import star from "@/public/images/star.svg";
import star2 from "@/public/images/star-gold.svg";
import emami from "@/public/images/emami.svg";
import emamiOld from "@/public/images/emami-old.svg";
import tamam from "@/public/images/tamam.png";
import Chart from "@/components/shared/chart/page";

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
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  percentChangeIn24Hours: { percentChangeIn24Hours: number };
}

const Details: React.FC<PropsType> = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex,
  percentChangeIn24Hours,
}) => {
  const isHovered = hoveredIndex === index;
  const isPreviousHovered = hoveredIndex === index + 1;

  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const _fetchCurrencies = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getCoinPricesForChart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id }),
        }
      );

      if (_response.status === 200) {
        const _data = await _response.json();
        setData(_data?.data);
      }
    };

    if (item.id) _fetchCurrencies();
  }, [item.id]);

  const getCoinImage = () => {
    const coinName = item.Coin.name;
    if (coinName.includes("امامی")) return emami;
    if (coinName.includes("قدیم")) return emamiOld;
    return tamam;
  };

  return (
    <div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`grid grid-cols-12 py-8 border-b-[1px] border-b-[#e5e5e5]
    hover:bg-[#37FF6C] hover:bg-opacity-[0.1] hover:rounded-[12px]
    ${isHovered || isPreviousHovered ? "border-b-transparent" : ""}`}
    >
      <div className="col-span-1 text-center">
        <Image
          src={isHovered ? star2 : star}
          width={16}
          height={16}
          alt="ستاره"
          className="mx-auto cursor-pointer"
        />
      </div>
      <div className="col-span-1 text-center text-[#2D2D2D] text-lg my-auto font-bold screen1200:text-base">
        {index + 1}
      </div>

      <div className="col-span-2 flex items-center">
        <Image
          src={getCoinImage()}
          width={24}
          height={24}
          alt="سکه"
          className="ml-2"
        />
        <span className="text-[#2D2D2D] font-bold text-lg screen1200:text-base">
          {item.Coin.name}
        </span>
      </div>

      <div className="col-span-2 text-center text-[#2D2D2D] text-lg font-bold my-auto screen1200:text-base">
        {item.buyPrice.toLocaleString()}
      </div>
      <div className="col-span-2 text-center text-[#2D2D2D] text-lg font-bold my-auto screen1200:text-base">
        {item.sellPrice.toLocaleString()}
      </div>
      <div
        style={{ direction: "ltr" }}
        className={`col-span-2 text-center ${
          percentChangeIn24Hours?.percentChangeIn24Hours >= 0
            ? "text-[#58BD7D]"
            : "text-[#D33535]"
        } my-auto screen1200:text-sm`}
      >
        {percentChangeIn24Hours?.percentChangeIn24Hours !== 0
          ? percentChangeIn24Hours?.percentChangeIn24Hours
          : "_"}
      </div>

      <div className="col-span-2 text-center w-fit mx-auto">
        <Chart items={data} />
      </div>
    </div>
  );
};

export default Details;
