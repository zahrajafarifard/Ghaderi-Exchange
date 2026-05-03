"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { io } from "socket.io-client";

import Details from "./details";
import Spinner from "@/components/shared/spinner/page";
import DetailsSmallScreen from "./details-small-screen";
import searchGif from "@/public/images/search.gif";

interface PropsTypes {
  Currency: { name: string; symbol: string };
  id: number;
  buyPrice: number;
  pBuyPrice: number;
  sellPrice: number;
  pSellPrice: number;
}
interface Props {
  searchItems: PropsTypes[];
  responseStatus: number;
}
interface ItemsType {
  Currency: { name: string; symbol: string };
  id: number;
  buyPrice: number;
  pBuyPrice: number;
  sellPrice: number;
  pSellPrice: number;
}

const Currency: React.FC<Props> = ({ searchItems, responseStatus }) => {
  const [items, setItemes] = useState<ItemsType[]>([]);
  const [percentChangeIn24Hours, setPercentChangeIn24Hours] = useState<
    { percentChangeIn24Hours: number }[]
  >([]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    setItemes(searchItems);
  }, [searchItems]);

  useEffect(() => {
    const _fetchCurrencies = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getallcurrencies`
      );

      if (_response.status === 200) {
        const _data = await _response.json();
        setItemes(_data?.currs);

        if (_data?.percentChangeIn24Hours) {
          setPercentChangeIn24Hours(_data?.percentChangeIn24Hours);
        }
      }
    };

    _fetchCurrencies();

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.on("getCurrencies", (data) => {
        setItemes(data);
      });
    });
  }, []);

  return (
    <div>
      {responseStatus === 404 ? (
        <div className="my-32 screen750:my-20">
          <Image
            src={searchGif}
            alt="Animated GIF"
            width={100}
            height={50}
            className="mx-auto opacity-40 screen750:w-16"
          />

          <div className="text-[#8B8B8B] text-lg font-bold mt-5 text-center screen750:text-base">
            نتیجه‌ای یافت نشد
          </div>
        </div>
      ) : items?.length === 0 ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div style={{ direction: "rtl" }} className="screen1100:hidden">
            {(showAll ? items : items.slice(0, 8)).map((item, index) => (
              <Details
                key={item.id}
                item={item}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                percentChangeIn24Hours={percentChangeIn24Hours[index]}
              />
            ))}
          </div>

          <div
            style={{ direction: "rtl" }}
            className="hidden screen1100:grid grid-cols-2 gap-8 screen660:grid-cols-1"
          >
            {(showAll ? items : items.slice(0, 8)).map((item, index) => (
              <DetailsSmallScreen
                key={item.id}
                item={item}
                percentChangeIn24Hours={percentChangeIn24Hours[index]}
              />
            ))}
          </div>
        </>
      )}

      {responseStatus !== 404 && items.length > 8 && (
        <div
          className="bg-[#DFF6E3] rounded-full text-[#48934B] py-2 px-5 cursor-pointer w-fit mt-8 
          screen660:w-full screen660:text-center screen660:text-sm screen660:font-bold"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "نمایش کمتر" : "مشاهده بیشتر"}
        </div>
      )}
    </div>
  );
};

export default Currency;
