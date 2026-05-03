"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import Chart from "@/components/shared/chart/page";
import emamiOld from "@/public/images/emami-old.svg";
import emami from "@/public/images/emami.svg";
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
  percentChangeIn24Hours: { percentChangeIn24Hours: number };
}

const DetailsSmallScreen: React.FC<PropsType> = ({
  item,
  percentChangeIn24Hours,
}) => {
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
  const getFlagImage = () => {
    const CoinName = item.Coin.name;
    if (CoinName.includes("قدیم")) return emamiOld;
    if (CoinName.includes("امامی")) return emami;
    return tamam;
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0px_1px_30px_8px_rgba(1,1,1,0.045)] p-5">
      <div className="border-b border-[#EDEDED] pb-5 grid grid-cols-3">
        <div
          style={{ direction: "rtl" }}
          className="flex items-center col-span-2"
        >
          <Image
            src={getFlagImage()}
            width={24}
            height={24}
            alt="سکه"
            className="ml-2"
          />
          <span className="text-[#2D2D2D] font-bold text-lg screen750:text-base">
            {item?.Coin?.name}
          </span>
        </div>

        <div
          style={{ direction: "ltr" }}
          className={`col-span-1 text-center ${
            percentChangeIn24Hours?.percentChangeIn24Hours >= 0
              ? "text-[#58BD7D]"
              : "text-[#D33535]"
          } my-auto screen1200:text-sm`}
        >
          {percentChangeIn24Hours?.percentChangeIn24Hours !== 0
            ? percentChangeIn24Hours?.percentChangeIn24Hours
            : "_"}
        </div>
      </div>

      <div className="py-1.5 border-b border-[#EDEDED] grid grid-cols-3">
        <span className="text-[#777E90] text-xs text-right">ارزش خرید</span>
        <span className="text-[#777E90] text-xs text-right">ارزش فروش</span>
        <span className="text-[#777E90] text-xs text-center">7 روز گذشته</span>
      </div>
      <div className="py-4  grid grid-cols-3 ">
        <div className="text-right text-[#2D2D2D] text-base font-bold my-auto screen400:text-sm">
          {item?.buyPrice?.toLocaleString()}
        </div>

        <div className="text-right text-[#2D2D2D] text-base font-bold my-auto screen400:text-sm">
          {item?.sellPrice?.toLocaleString()}
        </div>
        <div className="w-fit mx-auto my-auto screen750:mr-auto screen350:-mr-2">
          <Chart items={data} />
        </div>
      </div>
    </div>
  );
};

export default DetailsSmallScreen;
