import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isThemeAtom } from "../atoms";
import { Helmet } from "react-helmet-async";

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

const Nav = styled.nav<{ motion: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.motion};
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  width: 40px;
  height: 25px;
  border-radius: 15px;
  padding: 0 5px;
  font-size: 15px;
  cursor: pointer;
  span {
    display: block;
    text-align: left;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const LoadText = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-size: 40px;
  flex-basis: 95%;
  text-align: center;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li<{ $isTheme: boolean }>`
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  a {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: inherit;
    transition: 0.2s linear;
    span {
      flex-basis: 80%;
    }
  }
  &:hover {
    a {
      background-color: ${(props) => props.theme.selectColor};
      color: ${(props) => (props.$isTheme ? props.theme.accentColor : "#fff")};
    }
  }
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoins[]>(["allCoins"], fetchCoins);
  const isTheme = useRecoilValue(isThemeAtom);
  const setTheme = useSetRecoilState(isThemeAtom);
  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Coin Tracker</title>
        <link
          rel="icon"
          href={`https://coinicons-api.vercel.app/api/icon/yfi`}
          sizes="16x16"
        />
      </Helmet>
      <Header>
        <Title>Coin Tracker</Title>
        <Nav onClick={toggleTheme} motion={isTheme ? "right" : "left"}>
          <span></span>
        </Nav>
      </Header>
      {isLoading ? (
        <LoadText>Loading...</LoadText>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id} $isTheme={isTheme}>
              <Link
                to={`${coin.id}`}
                state={{ name: `${coin.name}`, symbol: `${coin.symbol}` }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.name}
                />
                <span>{coin.name}</span> &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Wrapper>
  );
};

export default Coins;
