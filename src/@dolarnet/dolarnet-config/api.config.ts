import { HttpHeaders } from '@angular/common/http';
export const apiConfig = {
    Api:
    {
      Main:
      {
        Url: "https://localhost:44366/api/"
      },
      Currency:
      {
        Url: "http://data.fixer.io/api/",
        Endpoint: 
        {
          Latest: "latest",
          Convert: "convert"
        },
        AccessKey: "d0b5ebf24379ec61a70dc9a83d95cf92"
      },
      CollectApi:
      {
        BaseUrl: "https://api.collectapi.com/economy/",
        HttpHeaders: {
          Key: "Authorization",
          Value: "apikey 4Wb9ZT6Ag8LpCqPKUeRYPl:6xYd1fJGK00fuOFc1UCHUA"
        },
        CurrencyURL: "allCurrency",
        GoldURL: "goldPrice",
        CriptoURL: "cripto"
      },
      Coin:
      {
        Url: "https://bravenewcoin-v1.p.rapidapi.com/",
        Endpoint:
        {
          Endpoint_ticker: "ticker",
          Endpoint_convert: "convert",
          Endpoint_prices: "prices"
        },
        Header:
        {
          Header_Host: "X-RapidAPI-Host",
          Header_Host_Value: "bravenewcoin-v1.p.rapidapi.com",
          Header_Key: "X-RapidAPI-Key",
          Header_Key_Value: "c370cca97fmshece299f1dfe9bebp126464jsnc72cc0a06b0d"
        }
      }
    },
    SessionKeys:
    {
      Currency:{
        CurrencyDataHistoricalYesterday: "CurrencyDataHistoricalYesterday",
        CurrencyDataRefreshedPeriodically: "CurrencyDataRefreshedPeriodically"
      },
      Gold:{
        GoldDataRefreshedPeriodically: "GoldDataRefreshedPeriodically"
      },
      Borsa:{
        BorsaDataRefreshedPeriodically: "BorsaDataRefreshedPeriodically"
      },
      Coin:{
        CoinTickersData: "CoinTickersData"
      }
    },
    Services:
    {
        User:
        {
          Authenticate: "User/Authenticate",
          Register: "User/Register",
          UpdateUser: "User",
          ChangePassword: "User/ChangePassword",
          CheckEmail: "User/CheckEmail",
          GetAllUser: "User",
          DeleteUser: "User",
          GetById: "User/GetById"
        },
        Portfolio:
        {
          Get: "Portfolio",
          Post: "Portfolio",
          Delete: "Portfolio"
        },
        Holding:
        {
          Get: "Holding",
          Post: "Holding",
          Delete: "Holding"
        },
        Blog:
        {
          GetAll: "Blog",
          GetById: "Blog/GetById",
          Post: "Blog",
          Delete: "Blog"
        },
        Integration:
        {
          GetAll: "Integration",
          GetById: "Integration/GetById",
          Post: "Integration",
          Delete: "Integration"
        },
        Audit:
        {
          GetAll: "Logs",
          GetById: "Logs/GetById",
          Post: "Logs"
        },
        Types:
        {
          GetActionTypes: "Types/GetActionTypes",
          GetCoinTypes: "Types/GetCoinTypes",
          GetCrudTypes: "Types/GetCrudTypes",
          GetLogTypes: "Types/GetLogTypes",
          GetPostCategoryTypes: "Types/GetPostCategoryTypes",
          GetPostStatusTypes: "Types/GetPostStatusTypes",
          GetRoleTypes: "Types/GetRoleTypes",
          GetServiceTypes: "Types/GetServiceTypes",
          GetUserStatusTypes: "Types/GetUserStatusTypes"
        },
        Currency:
        {
          GetAllCurrency: "Currency"
        },
        Gold:
        {
          GetAllGold: "Gold"
        },
        Borsa:
        {
          GetAllBorsa: "Borsa"
        }
    }
  };