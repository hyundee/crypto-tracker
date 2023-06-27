import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const CurrentPrice = styled.h4`
  font-size: 18px;
  margin-bottom: 12px;
  color: ${(props) => props.theme.accentColor};
  text-align: end;
`;

const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  span {
    margin-bottom: 10px;
    flex-basis: 50%;
    &:nth-child(even) {
      text-align: end;
    }
  }
`;

interface PriceProps {
  price: number;
  volume_24h: number;
  change_24h: number;
  change_7d: number;
  market_cap: number;
  market_cap_change_24h: number;
}

const Price = () => {
  const {
    price,
    market_cap,
    market_cap_change_24h,
    volume_24h,
    change_24h,
    change_7d,
  } = useOutletContext<PriceProps>();
  return (
    <>
      <CurrentPrice>₩ {Number(price.toFixed(1)).toLocaleString()}</CurrentPrice>
      <PriceDetail>
        <span>총 시가</span>
        <span>₩ {(market_cap / 1000000000000).toFixed(2)}</span>
        <span>시총 변동률 (24H)</span>
        <span>{market_cap_change_24h} %</span>
        <span>거래량 (24H)</span>
        <span>{(volume_24h / 1000000000000).toFixed(2)}%</span>
        <span>변동률 (1H)</span>
        <span>{change_24h} %</span>
        <span>변동률 (24H)</span>
        <span>{change_24h} %</span>
        <span>변동률 (7D)</span>
        <span>{change_7d} %</span>
      </PriceDetail>
    </>
  );
};

export default Price;
