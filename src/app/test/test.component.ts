import { CoinsService } from './../Services/coins.service';
import { UserVM } from './../Models/User/UserVM';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ServiceResult } from '../Models/ServiceResult';
import { UserListResponseDetailsVM } from '../Models/User/UserListResponseDetailsVM';
import { CurrencyService } from '../Services/currency.service';
import { HistoricalVM } from '../Models/Currency/HistoricalVM';
import { CurrencyChangeVM } from '../Models/Currency/CurrencyChangeVM';
import { LatestVM } from '../Models/Currency/LatestVM';
import { timer, Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public Editor = ClassicEditor;
  
  usersVM : ServiceResult<UserListResponseDetailsVM>;

  currentUserVM: UserVM;

  getByIdUser: UserVM;
  
  registeredUser: UserVM;

  yesterdayData: HistoricalVM;
  
  latestData: LatestVM;

  CurrencyChangeList: CurrencyChangeVM[] = [];

  private myTimerSub: Subscription;    
  subscription: Subscription;
  statusText: string;
  
  constructor(private userService: UserService, 
    private currencyService: CurrencyService,
    private coinsService: CoinsService,
    private storageService: StorageService) { 
  }

  ngOnInit() {

    this.storageService.watchStorage().subscribe((data:boolean) => {
      // this will call whenever your localStorage data changes
      // use localStorage code here and set your data here for ngFor
        console.log("Local Storage Değişti!!!");
      })

    /*const ti = timer(2000,1000);    
    this.myTimerSub = ti.subscribe(t => {    
        console.log("Tick");    
    });*/

    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.coinsService.getTickers()))
      .subscribe(result => {
        console.log(result.result.vol_24hr_pcnt);
    });

    /*this.userService.login().subscribe(response =>{
      this.currentUserVM = response.result.user;
      localStorage.setItem("token","Bearer " + response.result.token);
      console.log(response.result.user);
    });*/

    /*this.userService.getAll().subscribe(result =>{
      console.log('osman',result.result.userList);
      this.usersVM = result; 
    });*/

    /*this.userService.getById().subscribe(response =>{
      this.getByIdUser = response.result.user;
    });

    this.currencyService.convertTo().subscribe(response=>{
      console.log(response);
    })*/

    /*var latestDataFromStoreage = this.currencyService.getLatestFromStorage();

    if(latestDataFromStoreage.isValid)
    {
      this.latestData = latestDataFromStoreage.data;
      console.log("latest from storeage");
      console.log(this.latestData);
    }
    else
    {
      this.currencyService.getLatest().subscribe(latest =>
        {
            this.latestData = latest.result;
            console.log("latest from service");
            console.log(latest);
        });
    }*/

    /*var yesterdayDataFromStoreage = this.currencyService.getYesterdayFromStorage();

    console.log(yesterdayDataFromStoreage);
    
    if(yesterdayDataFromStoreage.isValid)
    {
      this.yesterdayData = yesterdayDataFromStoreage.data;
      console.log("yesterday from storeage");
      console.log(this.yesterdayData);
    }
    else
    {
      this.currencyService.getYesterday().subscribe(yesterday =>
        {
            this.yesterdayData = yesterday.result;
            console.log("yesterday from service");
            console.log(yesterday);
        });
    }*/

    /*this.currencyService.getYesterday().subscribe(yesterday =>
      {
          this.yesterdayData = yesterday.result;
          console.log("yesterday from service");
          console.log(yesterday);
      });*/

    /*this.currencyService.getYesterday().subscribe(yesterday =>{
      
      this.historicalData = yesterday;

      this.currencyService.getLatest().subscribe(latest =>{

        latest.currencyRates.rates.forEach(element => {
          let currencyChange = new CurrencyChangeVM();
          var yestCurrency= this.historicalData.currencyRates.rates.find(t=>t.currency == element.currency).rate;
          currencyChange.currency = element.currency;
          currencyChange.period = 1;
          currencyChange.periodType = 1;
          currencyChange.change = ((yestCurrency-element.rate)*100) / yestCurrency;  
          
          this.CurrencyChangeList.push(currencyChange);
        });          
      });

      console.log(this.CurrencyChangeList);
    });*/

    /*this.coinsService.getTickers().subscribe(result =>{
      console.log(result.result.vol_24hr_pcnt);
    });

    this.coinsService.convertTo().subscribe(result =>{
      console.log(result);
    });

    this.coinsService.getAllPrices().subscribe(result =>{
      console.log(result.result.prices[0]);
    });*/
    

    /*this.userService.register().subscribe(response =>{
      this.registeredUser = new UserVM();
      this.registeredUser.Name = response.Result.Name;
      this.registeredUser.Surname = response.Result.Surname;
      this.registeredUser.Email = response.Result.Email;
      this.registeredUser.UserName = response.Result.UserName;
    });*/

    /*this.userService.post().subscribe(response => {
      console.log(response.Status);
    });*/

    /*this.userService.delete().subscribe(response=>{
      console.log(response.Status);
    });*/    
  }
}
