import { useState, useEffect } from "react";
import CurrencyItems from "./CurrencyItem";

import { useDispatch } from "react-redux";

import { setCurrenciesAction } from "../../store/action";

const Currency = (props) => {
  const [AllCurrensies, setAllCurrensies] = useState([]);
  const [currencies, setCurrency] = useState([]);
  const [currencies2, setCurrency2] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/admin/getallcurrencies`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setAllCurrensies(res);
        dispatch(setCurrenciesAction(res));
        const currs1 = res?.filter((item) => item.id < 13);
        const currs2 = res?.filter((item) => item.id >= 13 && item.id < 17);
        setCurrency(currs1);
        setCurrency2(currs2);
      })
      .catch((err) => console.log(err));
  }, []);

  const buyPriceChangeHandeler = (newPrice, id) => {
    const newCurrensies = [...AllCurrensies];
    const currencyIndex = newCurrensies.findIndex((item) => item.id === id);
    newCurrensies[currencyIndex].buyPrice = newPrice;
    setAllCurrensies(newCurrensies);
    dispatch(setCurrenciesAction(newCurrensies));
  };

  const sellPriceChangeHandeler = (newPrice, id) => {
    const newCurrensies = [...AllCurrensies];
    const currencyIndex = newCurrensies.findIndex((item) => item.id === id);
    newCurrensies[currencyIndex].sellPrice = newPrice;
    setAllCurrensies(newCurrensies);
    dispatch(setCurrenciesAction(newCurrensies));
  };
  return (
    <div className="text-center p-4">
      <div
        style={{ direction: "rtl" }}
        className=" p-2 grid grid-cols-2 mx-auto w-full font-semibold text-sm text-gray-700"
      >
        <div className="grid grid-cols-3 ">
          <div>ارز</div>
          <div>خرید</div>
          <div> فروش</div>
        </div>
        <div className="grid grid-cols-3">
          <div>ارز</div>
          <div>خرید</div>
          <div> فروش</div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          {currencies?.map((item) => {
            return (
              <CurrencyItems
                key={item.id}
                item={item}
                onbuyPriceChangeCurr={buyPriceChangeHandeler}
                onsellPriceChangeCurr={sellPriceChangeHandeler}
              />
            );
          })}
        </div>
        <div>
          {currencies2?.map((item) => {
            return (
              <CurrencyItems
                key={item.id}
                item={item}
                onbuyPriceChangeCurr={buyPriceChangeHandeler}
                onsellPriceChangeCurr={sellPriceChangeHandeler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Currency;
