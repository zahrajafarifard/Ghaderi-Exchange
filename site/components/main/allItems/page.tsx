"use client";
import React, { useState } from "react";
import Image from "next/image";

import search from "@/public/images/search.svg";
import Coin from "./coin/page";
import Currency from "./currency/page";

const AllItems = () => {
  const [coins, setCoins] = useState<[]>([]);
  const [currs, setCurrs] = useState<[]>([]);

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<number>(0);

  const [searchItem, setSearchItem] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<"currency" | "gold">(
    "currency"
  );

  const searchHandler = async (value?: string) => {
    setResponseStatus(0);
    const query = value ?? searchItem;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ searchItem: query }),
        }
      );

      switch (response.status) {
        case 200:
          const data = await response.json();
          setCurrs(data?.currencies?.length > 0 ? data.currencies : []);
          setCoins(data?.coins?.length > 0 ? data.coins : []);
          break;
        case 404:
          setResponseStatus(404);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Search request failed:", error);
    } finally {
      if (!value) setSearchItem(""); // Reset search only if using state value
    }
  };
  return (
    <div id="prices" className="my-24">
      <h2
        className="text-[#2D2D2D] text-[48px] font-bold tracking-[-0.96px] text-right mb-6
        screen1200:text-[40px]
        screen900:text-[34px]
        screen660:text-3xl "
      >
        قیمت های به روز
      </h2>
      <div className="flex flex-row justify-between mt-4 w-full mx-auto ">
        <div
          className="my-auto w-1/4 border-[2px] border-[#E5E5E5] rounded-full px-4 py-2 flex items-center 
          screen900:w-1/3
          screen660:w-[40%]
          screen500:hidden"
        >
          <div className="flex flex-row-reverse items-center w-full">
            <Image
              src={search}
              width={16}
              height={16}
              alt="جست و جو"
              className="cursor-pointer"
              onClick={() => searchHandler()}
            />
            <input
              type="text"
              placeholder="جست و جو"
              dir="rtl"
              value={searchItem}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchItem(e.target.value)
              }
              className="w-full text-[#777E90] bg-transparent outline-none mr-2 
              screen1200:text-sm screen660:mr-1 screen660:text-xs "
            />
          </div>
        </div>
        <div className="my-auto relative hidden border-[2px] border-[#E5E5E5] rounded-full p-[10px] items-center w-fit screen500:flex">
          <Image
            src={search}
            width={16}
            height={16}
            alt="جست و جو"
            className="cursor-pointer"
            onClick={() => {
              setShowSearch((prev) => !prev);
            }}
          />
          {showSearch ? (
            <>
              <div
                onClick={() => {
                  setShowSearch(false);
                }}
                className="fixed top-0 left-0 w-screen h-screen z-10"
              />
              <input
                dir="rtl"
                className="border w-40 rounded-lg text-xs left-0 px-2 py-1.5 absolute top-10 outline-none z-20"
                placeholder="جست و جو ..."
                value={searchItem}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchItem(e.target.value);
                  searchHandler(e.target.value);
                }}
              />
            </>
          ) : (
            <div></div>
          )}
        </div>

        <div
          className="flex flex-row-reverse space-x-7 space-x-reverse my-auto 
          screen1100:space-x-4 screen1100:space-x-reverse
          screen900:space-x-2 screen900:space-x-reverse
          screen660:space-x-1 screen660:space-x-reverse "
        >
          <button
            onClick={() => {
              setResponseStatus(0);
              setSelectedItem("currency");
            }}
            className={`rounded-full font-bold text-lg py-2 px-5 transition duration-300 ${
              selectedItem === "currency"
                ? "bg-[#33b446] text-white hover:bg-[#258333] active:bg-[#258333]"
                : "text-[#777E90]"
            } screen1200:text-base screen660:text-sm`}
          >
            قیمت روز ارز
          </button>

          <button
            onClick={() => {
              setResponseStatus(0);
              setSelectedItem("gold");
            }}
            className={`rounded-full font-bold text-lg py-2 px-5 transition duration-300 ${
              selectedItem === "gold"
                ? "bg-[#33b446] text-white hover:bg-[#258333] active:bg-[#258333]"
                : "text-[#777E90]"
            } screen1200:text-base screen660:text-sm`}
          >
            قیمت روز سکه
          </button>
        </div>
      </div>

      <div className="mt-14">
        {selectedItem === "currency" ? (
          <div>
            <div
              style={{ direction: "rtl" }}
              className="grid grid-cols-12 items-center text-[#777E90] font-bold py-3 border-b border-[#E5E5E5]
              screen1100:hidden "
            >
              <div className="col-span-1 text-center"></div>
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-2 text-right">نام ارز</div>
              <div className="col-span-2 text-center">ارزش خرید</div>
              <div className="col-span-2 text-center">ارزش فروش</div>
              <div className="col-span-2 text-center">% تغییر در ۲۴ ساعت</div>
              <div className="col-span-2 text-center">تغییر ۷ روز گذشته</div>
            </div>
            <Currency searchItems={currs} responseStatus={responseStatus} />
          </div>
        ) : (
          <div>
            <div
              style={{ direction: "rtl" }}
              className="grid grid-cols-12 items-center text-[#777E90] font-bold py-3 border-b border-[#E5E5E5]
              screen1100:hidden "
            >
              <div className="col-span-1 text-center"></div>
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-2 text-right">نام سکه</div>
              <div className="col-span-2 text-center">ارزش خرید</div>
              <div className="col-span-2 text-center">ارزش فروش</div>
              <div className="col-span-2 text-center">% تغییر در ۲۴ ساعت</div>
              <div className="col-span-2 text-center">تغییر ۷ روز گذشته</div>
            </div>
            <Coin searchItems={coins} responseStatus={responseStatus} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllItems;
