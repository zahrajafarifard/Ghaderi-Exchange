"use client";
import React from "react";
import Image from "next/image";
import Details from "./details";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Scrollbar } from "swiper/modules";

import PrevButton from "@/public/images/arrow-left.svg";
import NextButton from "@/public/images/arrow-right.svg";

interface FeaturedItemsType {
  Coin: { name: string };
  id: number;
  buyPrice: number;
  pBuyPrice: number;
  sellPrice: number;
  pSellPrice: number;
}

interface PropsType {
  featuredItems: FeaturedItemsType[];
}

const SwiperCoin: React.FC<PropsType> = ({ featuredItems }) => {
  const one = featuredItems.slice(0, 1);
  const two = featuredItems.slice(1, 2);
  const three = featuredItems.slice(2, 3);
  const four = featuredItems.slice(3, 4);
  return (
    <div>
      <div className="w-[100%] mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          slidesPerGroup={1}
          speed={600}
          dir="rtl"
          loop={true}
          modules={[Navigation, Pagination, Scrollbar]}
          navigation={{
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
        >
          <SwiperSlide>
            <div className="mx-auto w-[90%] mt-6">
              {one.map((item) => {
                return <Details key={item?.id} item={item} />;
              })}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="mx-auto w-[90%] mt-6">
              {two.map((item) => {
                return <Details key={item?.id} item={item} />;
              })}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="mx-auto w-[90%] mt-6">
              {three.map((item) => {
                return <Details key={item?.id} item={item} />;
              })}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="mx-auto w-[90%] mt-6">
              {four.map((item) => {
                return <Details key={item?.id} item={item} />;
              })}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex flex-row justify-center mt-2 mb-4">
        <div className="swiper-prev  my-auto mr-4 border border-[#E5E5E5] rounded-full p-2">
          <Image width={20} height={20} alt="قبلی" src={PrevButton} />
        </div>
        <div className="swiper-next  my-auto ml-4 border border-[#E5E5E5] rounded-full p-2">
          <Image width={20} height={20} alt="بعدی" src={NextButton} />
        </div>
      </div>
    </div>
  );
};

export default SwiperCoin;
