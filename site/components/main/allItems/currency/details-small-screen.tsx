"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
            alt="پرچم"
            className="ml-2"
            style={{ width: "auto", height: "auto" }}
          />
          <span className="text-[#2D2D2D] font-bold text-lg screen750:text-base">
            {item?.Currency?.name}
          </span>
          <span className="mx-3 text-[#E5E5E5] screen750:mx-2 screen350:mx-1">
            |
          </span>
          <span className="text-[#777E90] text-sm my-auto font-bold screen750:text-xs">
            {item?.Currency?.symbol}
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
        <div className="text-right text-[#2D2D2D] text-base font-bold my-auto">
          {item?.buyPrice?.toLocaleString()}
        </div>

        <div className="text-right text-[#2D2D2D] text-base font-bold my-auto">
          {item?.sellPrice?.toLocaleString()}
        </div>
        <div className="w-fit mx-auto my-auto screen750:-mr-2 screen660:mr-auto screen350:-mr-2">
          <Chart items={data} />
        </div>
      </div>
    </div>
  );
};

export default DetailsSmallScreen;
