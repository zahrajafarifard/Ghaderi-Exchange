import React, { useState, useEffect } from "react";
import Coin from "./Coin/Coin";
import Currency from "./Currency/Currency";

import { useSelector, useDispatch } from "react-redux";
import { deleteStatus } from "../store/action";

const Main = () => {
  const [coin, setCoin] = useState([]);
  const [currency, setCurrency] = useState([]);

  const coinsFromStore = useSelector((state) => state.Reducer.coins);
  const currenciesFromStore = useSelector((state) => state.Reducer.currencies);
  const dispatch = useDispatch();

  useEffect(() => {
    setCoin(coinsFromStore);
    setCurrency(currenciesFromStore);
  }, [coinsFromStore, currenciesFromStore, coin, currency]);

  const closeHandler = () => {
    return window.closeApp.closeApplication();
  };

  const reloadHandler = () => {
    return window.reloadApp.reloadApplication();
  };

  const deleteCoinHandler = () => {
    const _coin = [...coin];
    for (let i = 0; i < _coin.length; i++) {
      _coin[i].buyPrice = 0;
      _coin[i].sellPrice = 0;
    }

    setCoin(_coin);
    dispatch(deleteStatus());
  };
  const deleteCurrencyHandler = () => {
    const _currency = [...currency];

    for (let j = 0; j < _currency.length; j++) {
      _currency[j].buyPrice = 0;
      _currency[j].sellPrice = 0;
    }
    setCurrency(_currency);
    dispatch(deleteStatus());
  };

  const updateCurrencyHandler = async () => {
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL}/admin/updateCurrency`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            secretKey: process.env.REACT_APP_SECRET_KEY,
          },
          body: JSON.stringify({ currency }),
        }
      );
      await _response.json();
    } catch {
      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }

    if (_response.ok) {
      return window.Notification.showSuccess(
        "به روز رسانی با موفقیت انجام شد ."
      );
    }

    if (_response.status === 500) {
      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }

    if (!_response.ok) {
      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }
  };

  const updateCoinHandler = async () => {
    let _response;

    try {
      _response = await fetch(`${process.env.REACT_APP_URL}/admin/updateCoin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          secretKey: process.env.REACT_APP_SECRET_KEY,
        },
        body: JSON.stringify({ coin }),
      });
    } catch {
      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }
    if (_response.ok) {
      return window.Notification.showSuccess(
        "به روز رسانی با موفقیت انجام شد ."
      );
    }

    if (_response.status === 500) {
      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }

    if (!_response.ok) {
      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }
  };

  return (
    <div style={{ webkitAppRegion: "drag" }}>
      <div
        style={{ direction: "rtl" }}
        className="grid  grid-flow-col-2 h-[460px] "
      >
        <div>
          <Currency />
        </div>
        <div className="w-[50%] relative z-10 right-[50%] -top-[100%]">
          <Coin />
        </div>
      </div>
      <div
        style={{ webkitAppRegion: "no-drag" }}
        className="flex flex-row-reverse  w-[65%] mx-auto justify-around   "
      >
        <button
          className=" px-2  py-1  text-[14px] shadow-md  shadow-red-900 rounded-xl  font-bold bg-black text-red-700"
          onClick={updateCurrencyHandler}
        >
          به روز رسانی ارز
        </button>
        <button
          className={`  px-2  py-1  text-[14px] shadow-md  shadow-red-900 rounded-xl  font-bold bg-black text-red-700
             
            `}
          onClick={updateCoinHandler}
        >
          به روز رسانی سکه
        </button>

        <button
          className=" px-2  py-1  text-[14px] shadow-md  shadow-red-900 rounded-xl  font-bold bg-black text-red-700"
          onClick={deleteCurrencyHandler}
        >
          حذف قیمت ارز
        </button>
        <button
          className=" px-2  py-1  text-[14px] shadow-md  shadow-red-900 rounded-xl  font-bold bg-black text-red-700"
          onClick={deleteCoinHandler}
        >
          حذف قیمت سکه
        </button>
       
      </div>

  
    </div>
  );
};

export default Main;
