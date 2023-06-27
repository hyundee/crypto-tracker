import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isThemeAtom } from "../atoms";
import { styled } from "styled-components";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Text = styled.div`
  text-align: center;
  margin-top: 125px;
`;

const Chart = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const isTheme = useRecoilValue(isThemeAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <>
      {data?.length !== undefined ? (
        isLoading ? (
          <Text>Loading chart...</Text>
        ) : (
          <ApexChart
            type="candlestick"
            series={
              [
                {
                  data: data.map((coin: IHistorical) => ({
                    x: coin.time_open,
                    y: [coin.open, coin.high, coin.low, coin.close],
                  })),
                },
              ] as unknown as number[]
            }
            options={{
              chart: {
                height: 250,
                width: 500,
                background: "transparent",
                toolbar: {
                  show: false,
                },
              },
              theme: {
                mode: isTheme ? "dark" : "light",
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              yaxis: {
                show: true,
                tooltip: {
                  enabled: true,
                },
              },
              xaxis: {
                type: "datetime",
                labels: {
                  style: {
                    colors: isTheme ? "#f5f6fa" : "#2f3640",
                  },
                },
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#4cd137",
                    downward: "#00a8ff",
                  },
                },
              },
            }}
          ></ApexChart>
        )
      ) : (
        <Text>Price data not found</Text>
      )}
    </>
  );
};

export default Chart;
