import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Coins from "./components/Coins";
import Coin from "./components/Coin";
import Chart from "./components/Chart";
import Price from "./components/Price";
import Error from "./Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
        errorElement: <Error />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default router;
