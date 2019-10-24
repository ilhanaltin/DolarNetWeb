// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: "https://localhost:44366/api/",
  
  //User - Services
  Authenticate: "User/Authenticate",
  Register: "User/Register",
  UpdateUser: "User",
  ChangePassword: "User/ChangePassword",
  CheckEmail: "User/CheckEmail",
  GetAllUser: "User",
  DeleteUser: "User",
  GetById: "User/GetById",

  //Portfolio
  PortfolioGet: "Portfolio",
  PortfolioPost: "Portfolio",
  PortfolioDelete: "Portfolio",

    //Holding
    HoldingGet: "Holding",
    HoldingoPost: "Holding",
    HoldingoDelete: "Holding",

    //Blog
    BlogGetAll: "Blog",
    BlogGetById: "Blog/GetById",
    BlogPost: "Blog",
    BlogDelete: "Blog"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
