# 📊 crypto-tracker
> ### https://hyundee.github.io/crypto-tracker
- #### 현재 시점을 기준으로 암호화페의 정보와 차트, 가격을 제공해주는 앱
![coin](https://github.com/hyundee/hyunflix/assets/125550186/bf006018-b6d6-4c2e-894a-7a4d4e4b5bb1)
<br/>
<br/>

## 💻 Preview
  > **Coin - 메인페이지**
  - React Query를 이용하여 Coinpaprika API 데이터 호출
  - 현재 시점을 기준으로 TOP100 시가 총액별 암호화폐를 정렬
<img width="285" alt="main_w" src="https://github.com/hyundee/hyunflix/assets/125550186/05246a86-79a4-4f16-b710-5eb0c7365eac">
<br/>
<br/>
<br/>

  > **Chart, Price - 상세 페이지**
  - 해당 암호화폐의 순위, 현재 시세, 총 유동량 등 세부적인 정보를 제공
  - React-router-dom을 사용하여 탭 UI 구현
    - Chart
      - 암호화폐의 시가, 고가, 저가, 종가 값을 5분주기로 반환하는 Candle차트
      - ApexChart 라이브러리를 활용한 차트 구현
    - Price : 암호화폐의 총 시가와 시총 변동률, 거래량 등을 제공
<img width="285" alt="chart" src="https://github.com/hyundee/hyunflix/assets/125550186/1bbb88e8-4874-4440-80f6-77f369f51b75">
<img width="285" alt="price" src="https://github.com/hyundee/hyunflix/assets/125550186/76c3601f-9699-4098-955c-4246fcf4bb11">
<br/>
<br/>
<br/>

  > **테마(theme)**
  - recoil을 이용하여 white와 black 모드로 전환할 수 있는 기능 구현
<img width="285" alt="main_w" src="https://github.com/hyundee/hyunflix/assets/125550186/05246a86-79a4-4f16-b710-5eb0c7365eac">
<img width="285" alt="main_b" src="https://github.com/hyundee/hyunflix/assets/125550186/16202266-8da7-42dc-bf45-c045c35eb42e">

<br/>
<br/>
<br/>

## 🛠️ 기술스택
![React](https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white)
<br/>
<br/>
<br/>
## 📚 라이브러리
![React Router](https://img.shields.io/badge/reactrouter-FF4154?style=for-the-badge&logo=reactrouter&logoColor=white)
![React Query](https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)
![styled-components](https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)
![ApexCharts](https://img.shields.io/badge/apexcharts-1F93FF?style=for-the-badge&logo=apexcharts&logoColor=white)

<br/>
<br/>
<br/>


## ⚙️ 설치 및 실행
1. Clone the repo
```
  git clone https://github.com/hyundee/crypto-tracker.git
```
2. Install npm packages
```
  npm install
```
