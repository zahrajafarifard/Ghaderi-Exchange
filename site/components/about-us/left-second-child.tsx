"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import avatar from "@/public/images/Avatar.svg";
import us from "@/public/images/united states.svg";
import Chart from "@/components/shared/chart/page";

const LeftSecondChild = () => {
  const [usd, setUsd] = useState<{
    sellPrice: number;
    pSellPrice: number;
    Currency: { symbol: string };
  }>();

  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const _fetchCurrencies = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getCurrencyPricesForChart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: 1 }),
        }
      );

      if (_response.status === 200) {
        const _data = await _response.json();
        setData(_data?.data);
      }
    };

    _fetchCurrencies();
  }, []);

  const calculatePercentageChange = () => {
    if (!usd?.pSellPrice) return "0.00%";
    const percentageChange =
      ((usd.sellPrice - usd.pSellPrice) / usd.pSellPrice) * 100;
    return `${percentageChange >= 0 ? "+" : ""}${percentageChange.toFixed(2)}%`;
  };

  useEffect(() => {
    const _fetchCurrencies = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getUSD`
      );

      if (_response.status === 200) {
        const _data = await _response.json();
        setUsd(_data);
      }
    };

    _fetchCurrencies();
  }, []);
  return (
    <div className="flex relative screen980:hidden">
      <div
        className="bg-[#3772FF] bg-opacity-[0.1] absolute left-36 rounded-[20px] w-[55%] h-3/4 mx-auto 
        screen1600:left-28 screen1350:w-[62%] screen1150:left-20"
      />

      <div
        className="absolute left-16 top-3 h-fit bg-white rounded-[12px] p-6 flex flex-row justify-between space-x-10 z-20 
        screen1350:p-4 screen1350:left-10"
      >
        <div className="flex flex-row space-x-3">
          <Image
            src={us}
            width={58}
            height={58}
            alt="دلار امریکا"
            className="screen1350:w-12"
          />
          <div className="flex flex-col ">
            <span className="text-[#2D2D2D] text-2xl font-bold leading-8 my-auto screen1350:text-xl">
              {usd?.Currency?.symbol}
            </span>

            <div
              style={{ direction: "ltr" }}
              className="text-[#777E90] text-lg leading-7 my-auto screen1350:text-base"
            >
              {calculatePercentageChange()}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[#2D2D2D] text-2xl font-bold leading-8 text-center screen1350:text-xl">
            {usd?.sellPrice ? Number(usd?.sellPrice).toLocaleString() : 0}
          </span>
          <span className="">
            <Chart items={data} />
          </span>
        </div>
      </div>

      <div
        className="bg-white w-[55%] p-6 rounded-[16px] absolute bottom-0 right-10 
          screen1600:w-[60%] screen1350:p-4 screen1150:w-[66%] screen1350:right-8"
      >
        <Image
          src={avatar}
          width={128}
          height={128}
          alt="عکس"
          className="mx-auto screen1350:w-24"
        />
        <h3 className="text-[#2D2D2D] text-lg font-bold text-center leading-6 mt-4 screen1350:text-base">
          فرهاد قادری
        </h3>
        <h2 className="text-[#2D2D2D] text-sm text-center leading-6 screen1350:text-[13px]">
          farhadghaderii2020@gmail.com
        </h2>

        <div
          style={{ direction: "rtl" }}
          className="py-6 px-4 text-[15px] leading-7 tracking-[-0.15px] text-justify mt-4
          bg-gradient-to-bl from-[#83DB7B] to-[#2B5727] rounded-[16px] text-white 
          screen1440:px-2 screen1350:text-sm screen1350:leading-6"
        >
          فعالیتهای ارزی این صرافی در چهار چوب قوانین بانک مرکزی می باشد و این
          وب سایت صرفا جهت اطلاع رسانی است و هیچ گونه خرید و فروشی در آن انجام
          نمی پذیرد، مشتریان محترم برای انجام خرید و فروش می توانند به صرافی
          مراجعه نمایند .
        </div>
      </div>
    </div>
  );
};

export default LeftSecondChild;
