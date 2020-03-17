import { HttpHeaders } from '@angular/common/http';
export const apiConfig = {
    Api:
    {
      Main:
      {
          Url: "https://api.dolar.net/api/"
          //Url: "https://localhost:44366/api/"
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
      }
    },
    SessionKeys:
    {
      Currency:{
        CurrencyDataRefreshedPeriodically: "CurrencyDataRefreshedPeriodically",
        PariteDataRefreshedPeriodically: "PariteDataRefreshedPeriodically"
      },
      Gold:{
        GoldDataRefreshedPeriodically: "GoldDataRefreshedPeriodically"
      },
      Borsa:{
        BorsaDataRefreshedPeriodically: "BorsaDataRefreshedPeriodically",
        BorsaHisseDataRefreshedPeriodically: "BorsaHisseDataRefreshedPeriodically",
        BorsaLiveDataRefreshedPeriodically: "BorsaLiveDataRefreshedPeriodically"
      },
      Cripto:{
        CriptoDataRefreshedPeriodically: "CoinDataRefreshedPeriodically"
      },
      Emtia:{
        EmtiaDataRefreshedPeriodically: "EmtiaDataRefreshedPeriodically"
      }
    },
    Services:
    {
        User:
        {
          Authenticate: "User/Authenticate",
          SocialAuthenticate: "User/SocialAuthenticate",
          Register: "User/Register",
          UpdateUser: "User",
          ChangePassword: "User/ChangePassword",
          CheckEmail: "User/CheckEmail",
          GetAllUser: "User",
          DeleteUser: "User",
          GetById: "User/GetById"
        },
        Holding:
        {
          Get: "Holding",
          Post: "Holding",
          Delete: "Holding",
          GetHoldingHistory: "Holding/GetHoldingHistory"
        },
        Portfolio:
        {
          Get: "Portfolio",
          Post: "Portfolio",
          Delete: "Portfolio"
        },
        Blog:
        {
          GetAll: "Blog",
          GetById: "Blog/GetById",
          Post: "Blog",
          Delete: "Blog",
          GetSliderPosts: "Blog/GetSliderPosts",
          GetMostPopularPosts: "Blog/GetMostPopularPosts",
          AddComment: "Blog/AddComment"
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
          GetAllCurrency: "Currency",
          GetPariteler: "Currency/GetPariteler"
        },
        Gold:
        {
          GetAllGold: "Gold"
        },
        Borsa:
        {
          GetAllBorsa: "Borsa",
          GetHisseSenedi: "Borsa/GetHisseSenedi",
          GetLiveBorsa: "Borsa/GetLiveBorsa"
        },
        Cripto:
        {
          GetAllCoins: "Cripto"
        },
        Emtia:
        {
          GetAllEmtia: "Emtia"
        },
    }
  };