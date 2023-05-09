import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";

const Wrapper = styled.div`
  padding: 40px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
  flex-basis: 95%;
  text-align: center;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.textColor};
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const LoadText = styled.span`
  text-align: center;
  display: block;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive?: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  border-radius: 10px;
  a {
    padding: 10px 0px;
    display: block;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.textColor};
  padding: 15px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    KRW: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams() as { coinId: string };
  const { state } = useLocation();
  const { pathname } = useLocation();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
  );
  const loading = infoLoading || priceLoading;
  return (
    <Wrapper>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
        <link
          rel="icon"
          href={`https://coinicons-api.vercel.app/api/icon/${state?.symbol.toLowerCase()}`}
          sizes="16x16"
        />
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <Nav>
          <Link to={`/`}> &#8678;</Link>
        </Nav>
      </Header>
      {loading ? (
        <LoadText>Loading...</LoadText>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>현재 시세 :</span>
              <span>₩{priceData?.quotes.KRW.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>총 유동량 :</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 발행량 :</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={pathname === `/${coinId}/chart`}>
              <Link to={`chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={pathname === `/${coinId}/price`}>
              <Link to={`price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet
            context={{
              coinId: coinId,
              price: priceData?.quotes.KRW.price,
              market_cap: priceData?.quotes.KRW.market_cap,
              market_cap_change_24h:
                priceData?.quotes.KRW.market_cap_change_24h,
              volume_24h: priceData?.quotes.KRW.volume_24h,
              change_24h: priceData?.quotes.KRW.volume_24h_change_24h,
              change_7d: priceData?.quotes.KRW.percent_change_7d,
            }}
          />
        </>
      )}
    </Wrapper>
  );
};

export default Coin;
