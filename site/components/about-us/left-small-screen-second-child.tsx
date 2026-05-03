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
    <div className="flex my-12 relative">
      <div
        className="bg-[#3772FF] bg-opacity-[0.1]  rounded-[20px] w-[43%] h-[500px] ml-[30%] screen900:w-[45%] screen750:w-[60%] screen550:w-[70%]
      screen550:ml-[20%]
      screen550:h-[470px]
      screen500:h-[450px]
      screen450:w-[81%]
      screen450:ml-[12%]

      "
      />

      <div
        className="absolute left-28 top-6 h-fit bg-white rounded-[12px] p-4 flex flex-row justify-between space-x-10 z-20 
        screen550:left-0 screen400:p-2 "
      >
        <div className="flex flex-row space-x-3 screen400:space-x-2">
          <Image
            src={us}
            width={48}
            height={48}
            alt="دلار امریکا"
            className="screen400:w-10"
          />
          <div className="flex flex-col ">
            <span className="text-[#2D2D2D] text-xl font-bold leading-8 my-auto screen400:text-base screen400:leading-0">
              {usd?.Currency?.symbol}
            </span>

            <div
              style={{ direction: "ltr" }}
              className="text-[#777E90] leading-7 my-auto text-base screen400:text-sm screen400:leading-0"
            >
              {calculatePercentageChange()}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[#2D2D2D] text-xl font-bold leading-8 text-center screen400:text-lg">
            {usd?.sellPrice ? Number(usd?.sellPrice).toLocaleString() : 0}
          </span>
          <span>
            <Chart items={data} />
          </span>
        </div>
      </div>

      <div
        className="bg-white w-[38%] px-6 py-10 rounded-[16px] absolute -bottom-24 right-44 screen900:right-36 screen750:w-1/2 screen750:right-24
        screen660:right-10
        screen600:w-[60%]
        screen600:right-0
        screen550:w-[75%]
        screen400:w-[78%]"
      >
        <Image
          src={avatar}
          width={128}
          height={128}
          alt="عکس"
          className="mx-auto screen850:w-24"
        />
        <h3 className="text-[#2D2D2D] text-lg font-bold text-center leading-6 mt-4 ">
          فرهاد قادری
        </h3>
        <h2 className="text-[#2D2D2D] text-sm text-center leading-6">
          farhadghaderii2020@gmail.com
        </h2>

        <div
          style={{ direction: "rtl" }}
          className="py-6 px-4 text-[15px] leading-7 tracking-[-0.15px] text-justify mt-4 relative right-48 w-[150%] 
          screen900:w-[160%] screen550:w-[140%] screen550:right-1/2 screen500:text-sm screen400:right-[52%] screen400:px-3 screen400:text-[13px]
          bg-gradient-to-bl from-[#83DB7B] to-[#2B5727] rounded-[16px] text-white"
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
