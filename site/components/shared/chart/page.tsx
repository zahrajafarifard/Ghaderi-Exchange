import * as React from "react";
import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import CircularProgress from "@mui/material/CircularProgress";

interface ItemsType {
  id: number;
  buyPrice: number;
  sellPrice: number;
  CurrencyId?: number;
  CoinId?: number;
  createdAt: string;
  updatedAt: string;
}
interface PropsType {
  items: ItemsType[];
}

const PercentAreaChart: React.FC<PropsType> = ({ items }) => {
  const [sellPrice, setItems] = useState<ItemsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setItems(items);
      setLoading(false);
    };

    loadData();
  }, [items]);

  const getPercents = (array: ItemsType[]) => {
    return array.map((v) => v.sellPrice).filter((v) => !isNaN(v));
  };

  // const getDates = (array: ItemsType[]) => {
  //   return array
  //     .map((v) => new Date(v.createdAt))
  //     .filter((date) => !isNaN(date.getTime()));
  // };

  if (loading) {
    return <CircularProgress color="success" size={20} />;
  }
  if (sellPrice.length === 0 || sellPrice.length === 1) {
    return <div className="text-[#58BD7D]">_</div>;
  }

  const percents = getPercents(sellPrice);
  // const dates = getDates(sellPrice);

  return (
    <LineChart
      width={100}
      height={30}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      bottomAxis={{ disableLine: true, disableTicks: false }}
      leftAxis={{ disableLine: true, disableTicks: false }}
      series={[
        {
          data: percents,
          type: "line",
          area: true,
          stack: "total",
          showMark: false,
          color: "#83DB7B",
        },
      ]}
      yAxis={[
        {
          valueFormatter: () => "",
        },
      ]}
      // xAxis={[
      //   {
      //     data: dates,
      //     min: dates && dates[0],
      //     max: dates && dates[dates.length - 1],
      //   },
      // ]}
    />
  );
};

export default PercentAreaChart;
