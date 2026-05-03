"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import star from "@/public/images/star.svg";
import star2 from "@/public/images/star-gold.svg";
import Chart from "@/components/shared/chart/page";
import us from "@/public/images/united states.svg";
import eur from "@/public/images/eur.svg";
import ca from "@/public/images/canada.svg";
import aud from "@/public/images/australia.svg";
import uk from "@/public/images/united kingdom.svg";
import sek from "@/public/images/sweden.svg";
import nok from "@/public/images/norway.svg";
import dkk from "@/public/images/denmark.svg";
import tr from "@/public/images/turkey.svg";
import chf from "@/public/images/switzerland.svg";
import jp from "@/public/images/japan.svg";
import myr from "@/public/images/malaysia.svg";
import ch from "@/public/images/china.svg";
import iqd from "@/public/images/iraq.svg";
import az from "@/public/images/azerbaijan.svg";
import ua from "@/public/images/united arab emirates.svg";

interface FeaturedItemsType {
  Currency: { name: string; symbol: string };
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/getCurrencyPricesForChart`,
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
    const currencyName = item.Currency.name;
    if (currencyName.includes("آمریکا")) return us;
    if (currencyName.includes("کانادا")) return ca;
    if (currencyName.includes("یورو")) return eur;
    if (currencyName.includes("دانمارک")) return dkk;
    if (currencyName.includes("استرالیا")) return aud;
    if (currencyName.includes("پوند")) return uk;
    if (currencyName.includes("امارات")) return ua;
    if (currencyName.includes("نروژ")) return nok;
    if (currencyName.includes("ترکیه")) return tr;
    if (currencyName.includes("ژاپن")) return jp;
    if (currencyName.includes("منات")) return az;
    if (currencyName.includes("عراق")) return iqd;
    if (currencyName.includes("مالزی")) return myr;
    if (currencyName.includes("سوییس")) return chf;
    if (currencyName.includes("سوئد")) return sek;
    if (currencyName.includes("چین")) return ch;
    return us;
  };

  return (
    <div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`grid grid-cols-12 py-8 border-b-[1px] border-b-[#e5e5e5]
      hover:bg-[#37FF6C] hover:bg-opacity-[0.1] hover:rounded-[12px]
      ${isHovered || isPreviousHovered ? "border-b-transparent" : ""}
    `}
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

      <div className="col-span-1 text-center text-[#2D2D2D] text-lg my-auto font-bold screen1200:text-base ">
        {index + 1}
      </div>

      <div className="col-span-2 flex items-center w-[110%]">
        <Image
          src={getFlagImage()}
          width={24}
          height={24}
          alt="پرچم"
          className="ml-2"
          style={{ width: "auto", height: "auto" }}
        />
        <span className="text-[#2D2D2D] font-bold text-lg screen1200:text-base">
          {item?.Currency?.name}
        </span>
        <span className="mx-3 text-[#E5E5E5]">|</span>
        <span className="text-[#777E90] text-sm my-auto font-bold screen1200:text-xs">
          {item?.Currency?.symbol}
        </span>
      </div>

      <div className="col-span-2 text-center text-[#2D2D2D] text-lg font-bold my-auto screen1200:text-base">
        {item?.buyPrice?.toLocaleString()}
      </div>

      <div className="col-span-2 text-center text-[#2D2D2D] text-lg font-bold my-auto screen1200:text-base">
        {item?.sellPrice?.toLocaleString()}
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

      <div className="col-span-2 text-center w-fit mx-auto my-auto">
        <Chart items={data} />
      </div>
    </div>
  );
};

export default Details;
