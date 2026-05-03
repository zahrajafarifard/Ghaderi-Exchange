import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Tamam from "../../assets/image/tamam.png";
import Emami from "../../assets/image/emami.svg";
const CoinItems = (props) => {
  const [valueb, setValueb] = useState(props.item.buyPrice);
  const [values, setValues] = useState(props.item.sellPrice);
  const deleteStatusFromStore = useSelector(
    (state) => state.Reducer.deleteStatus
  );
  useEffect(() => {
    setValueb(props.item.buyPrice);
    setValues(props.item.sellPrice);
  }, [deleteStatusFromStore]);

  const changebHandeler = (event) => {
    event.target.value === ""
      ? setValueb(0)
      : setValueb(
          parseInt(event.target.value.replace(/,/g, "")).toLocaleString()
        );
    props.onbuyPriceChange(
      event.target.value === "" ? 0 : event.target.value,
      props.item.id
    );
  };

  const changeHandelers = (event) => {
    event.target.value === ""
      ? setValues(0)
      : setValues(
          parseInt(event.target.value.replace(/,/g, "")).toLocaleString()
        );
    props.onsellPriceChange(
      event.target.value === "" ? 0 : event.target.value,
      props.item.id
    );
  };
  return (
    <div
      style={{ direction: "rtl", webkitAppRegion: "no-drag" }}
      className={`grid grid-cols-3 my-2 ${
        props.item.id % 2 === 0 ? "text-gray-700 " : "text-red-700 "
      }`}
    >
      <div
        className={`flex flex-row justify-end  font-semibold ${
          props.item.id === 2 ? "text-[14px]" : ""
        }`}
      >
        <img
          className="w-6 h-6  mx-auto my-auto "
          src={props.item.id === 2 ? Emami : Tamam}
        />
        <span className=" w-[102px]">{props.item.Coin.name}</span>
      </div>

      <div>
        <input
          dir="ltr"
          type="text"
          value={valueb.toLocaleString()}
          onChange={changebHandeler}
          className=" rounded-lg w-24 text-red-700 shadow-md shadow-[#5c5b5b] outline-none px-1  mx-auto "
        />
      </div>

      <div>
        <input
          dir="ltr"
          type="text"
          name="qq"
          value={values.toLocaleString()}
          onChange={changeHandelers}
          className=" rounded-lg w-24 text-red-700 shadow-md shadow-[#5c5b5b] outline-none px-1 mx-auto "
        />
      </div>
    </div>
  );
};

export default CoinItems;
