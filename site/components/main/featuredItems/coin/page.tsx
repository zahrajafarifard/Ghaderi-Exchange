"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import Details from "./details";
import SwiperCoin from "./swiper";
import Spinner from "@/components/shared/spinner/page";

interface FeaturedItemsType {
  Coin: { name: string };
  id: number;
  buyPrice: number;
  pBuyPrice: number;
  sellPrice: number;
  pSellPrice: number;
}
const Coin = () => {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItemsType[]>([]);

  useEffect(() => {
    const _fetchCoins = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/featuredCoins`
      );

      switch (_response.status) {
        case 200:
          const _data = await _response.json();
          setFeaturedItems(_data);
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
      socket.on("getFeaturedCoins", (data) => {
        setFeaturedItems(data);
      });
    });
  }, []);

  return (
    <div>
      {featuredItems?.length === 0 ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div
            style={{ direction: "rtl" }}
            className="flex flex-row justify-between
            screen850:grid screen850:grid-cols-2 
            screen850:gap-x-8 
            screen750:gap-x-6 
            screen660:gap-x-4
            screen550:hidden "
          >
            {featuredItems?.map((item) => {
              return <Details key={item?.id} item={item} />;
            })}
          </div>

          <div className="screen550:flex flex-col w-[100%] mx-auto my-auto hidden">
            <SwiperCoin featuredItems={featuredItems} />
          </div>
        </>
      )}
    </div>
  );
};

export default Coin;
