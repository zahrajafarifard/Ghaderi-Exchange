import { useState, useEffect } from "react";
import CoinItems from "./CoinItem";
import { useDispatch } from "react-redux";

import { setCoinsAction } from "../../store/action";

const Coin = (props) => {
  const [coins, setCoins] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/admin/getallcoins`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setCoins(res);
        dispatch(setCoinsAction(res));
      })
      .catch((err) => console.log(err));
  }, []);

  const buyPriceChangeHandeler = (newPrice, id) => {
    const newConis = [...coins];
    const coinIndex = newConis.findIndex((item) => item.id === id);
    newConis[coinIndex].buyPrice = newPrice;
    setCoins(newConis);
    dispatch(setCoinsAction(newConis));
  };
  const sellPriceChangeHandeler = (newPrice, id) => {
    const newConis = [...coins];
    const coinIndex = newConis.findIndex((item) => item.id === id);
    newConis[coinIndex].sellPrice = newPrice;
    setCoins(newConis);
    dispatch(setCoinsAction(newConis));
  };
  return (
    <div className="text-center p-4">
      <div
        style={{ direction: "rtl" }}
        className=" p-2 grid grid-cols-3 mx-auto w-full font-semibold text-sm text-gray-700"
      >
        <div>سکه</div>
        <div>خرید</div>

        <div> فروش</div>
      </div>
      {coins &&
        coins.map((item, index) => {
          return (
            <CoinItems
              key={item.id}
              item={item}
              onbuyPriceChange={buyPriceChangeHandeler}
              onsellPriceChange={sellPriceChangeHandeler}
            />
          );
        })}
    </div>
  );
};

export default Coin;
