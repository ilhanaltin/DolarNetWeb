// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
      AccessKey: "07956779c4a73384f694471deba9610e"
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
    CurrencyDataHistoricalYesterday: "CurrencyDataHistoricalYesterday",
    CurrencyDataRefreshedPeriodically: "CurrencyDataRefreshedPeriodically"
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
        GetById: "GetById",
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
      }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
