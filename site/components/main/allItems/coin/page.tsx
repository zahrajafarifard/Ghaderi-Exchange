"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { io } from "socket.io-client";

import Details from "./details";
import DetailsSmallScreen from "./details-small-screen";
import searchGif from "@/public/images/search.gif";
import Spinner from "@/components/shared/spinner/page";

interface ItemsType {
  Coin: { name: string };
  id: number;
  buyPrice: number;
  pBuyPrice: number;
  sellPrice: number;
  pSellPrice: number;
}

interface PropsTypes {
  Coin: { name: string; symbol: string };
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
const Coin: React.FC<Props> = ({ searchItems, responseStatus }) => {
  const [itemes, setItemes] = useState<ItemsType[]>([]);
  const [percentChangeIn24Hours, setPercentChangeIn24Hours] = useState<
    { percentChangeIn24Hours: number }[]
  >([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setItemes(searchItems);
  }, [searchItems]);

  useEffect(() => {
    const _fetchCoins = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getallcoins`
      );

      switch (_response.status) {
        case 200:
          const _data = await _response.json();
          setItemes(_data?.coins);

          if (_data?.percentChangeIn24Hours) {
            setPercentChangeIn24Hours(_data?.percentChangeIn24Hours);
          }
          break;

        default:
          break;
      }
    };

    _fetchCoins();

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.on("getCoins", (data) => {
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
      ) : itemes?.length === 0 ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div style={{ direction: "rtl" }} className="screen1100:hidden">
            {itemes?.map((item, index) => {
              return (
                <Details
                  key={item?.id}
                  item={item}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  percentChangeIn24Hours={percentChangeIn24Hours[index]}
                />
              );
            })}
          </div>

          <div
            style={{ direction: "rtl" }}
            className="hidden screen1100:grid grid-cols-2 gap-8 screen800:grid-cols-1"
          >
            {itemes.map((item, index) => (
              <DetailsSmallScreen
                key={item.id}
                item={item}
                percentChangeIn24Hours={percentChangeIn24Hours[index]}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Coin;
