import { TypeVM } from './../../models/types/TypeVM';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, timer } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { GlobalConstants } from '../../models/constants/GlobalConstants';
import { CriptoService } from '../../services/cripto.service';
import { CriptoRatesVM } from '../../models/coins/CriptoRatesVM';
import { HoldingService } from '../../services/holding.service';
import { HoldingSearchCriteriaVM } from '../../models/holding/HoldingSearchCriteriaVM';
import { HoldingVM } from '../../models/holding/HoldingVM';
import { AuthenticationService } from '../../services/authentication.service';
import { CurrencyService } from '../../services/currency.service';
import { GoldService } from '../../services/gold.service';
import { CurrencyRatesVM } from '../../models/integration/currency/CurrencyRatesVM';
import { GoldRatesVM } from '../../models/integration/gold/GoldRatesVM';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private myTimerSub: Subscription;
  readonly _globalConstants = GlobalConstants;

  postHoldingForm: FormGroup;

  currencyRates: CurrencyRatesVM[];
  goldRates: GoldRatesVM[];
  criptoRates: CriptoRatesVM[];
  
  listBoxCurrency = new FormControl();
  listBoxGold = new FormControl();
  listBoxCoin = new FormControl();
  currencies: TypeVM[];
  golds: TypeVM[];

  selectedCurrency: string = "";
  selectedGold: string = "";
  selectedCoin: string = "";

  filteredCurrencies: Observable<TypeVM[]>;
  filteredGolds: Observable<TypeVM[]>;
  filteredCoins: Observable<CriptoRatesVM[]>;
  optionPositionType: number;

  holdings: HoldingVM[];
  
  holding: HoldingVM;

  action: string = "new";

  constructor( private _criptoService: CriptoService,
    private _holdingService: HoldingService,
    private _formBuilder: FormBuilder,
    public _authenticationService: AuthenticationService,
    private _currencyService: CurrencyService, 
    private _goldService: GoldService) {

    this.holding = new HoldingVM({});
    this.currencies = this.getCurrencies();
    this.golds = this.getGolds();
    this.optionPositionType = GlobalConstants.PositionType.Currency;
   }

  ngOnInit() {  
    
      const ti = timer(0,60000);

        this.myTimerSub = ti.subscribe(t => {    
            this.getCurrencyAndConnectedData();
        });

      this.filteredCurrencies = this.listBoxCurrency.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCurrency(value))
        );

        this.filteredGolds = this.listBoxGold.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGold(value))
        );

        this.filteredCoins = this.listBoxCoin.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCoins(value))
        );        

        this.postHoldingForm = this.createPostHoldingForm();
  }

  getCurrencyAndConnectedData()
  {
        let storageDataCurrency = this._currencyService.getFromStorage();

        if(storageDataCurrency.isValid)
        {
            this.currencyRates = storageDataCurrency.data;

            this.getGoldData();
            this.getCriptoData();
            this.getholdings();
        }
        else
        {
            this._currencyService.getFromApi().subscribe(resp=>{
              this.currencyRates = resp.result;

              this.getGoldData();
              this.getCriptoData();
              this.getholdings();
            });
        }
  }

  getGoldData()
  {
        let storageDataGold = this._goldService.getFromStorage();

        if(storageDataGold.isValid)
        {
            this.goldRates = storageDataGold.data;
        }
        else
        {
            this._goldService.getFromApi().subscribe(resp=>{
              this.goldRates = resp.result;
            });
        }
  }

  getCriptoData()
  {
      let storageDataCripto = this._criptoService.getFromStorage();

      if(storageDataCripto.isValid)
      {
        this.criptoRates = storageDataCripto.data;
      }
      else
      {
          this._criptoService.getFromApi().subscribe(resp=>{
            this.criptoRates = resp.result;
          });
      }
  }

  private _filterCurrency(value: string): TypeVM[] {
    
    const filterValue = value.toLowerCase();

    return this.currencies.filter(option => option.adi.toLowerCase().includes(filterValue));
  }

  private _filterGold(value: string): TypeVM[] {
    const filterValue = value.toLowerCase();

    return this.golds.filter(option => option.adi.toLowerCase().includes(filterValue));
  }

  private _filterCoins(value: string): CriptoRatesVM[] {
    const filterValue = value.toLowerCase();

    return this.criptoRates.filter(option => option.code.toLowerCase().includes(filterValue));
  }
  
  createPostHoldingForm(): FormGroup
  {
      let currentUser = this._authenticationService.currentUser;

      if(this.action === "new")
      {
          return this._formBuilder.group({          
              id              : [this.holding.id],
              userId          : [currentUser.id],
              purchaseDate    : [this.holding.purchaseDate, Validators.required],
              amount          : [this.holding.amount, [Validators.min(1), Validators.required]],
              price           : [this.holding.price, [Validators.min(1), Validators.required]]
          });
      }
      else if(this.action === "edit")
      {
          return this._formBuilder.group({          
              id              : [this.holding.id],
              userId          : [currentUser.id],
              purchaseDate    : [this.holding.purchaseDate, Validators.required],
              amount          : [this.holding.amount, [Validators.min(1), Validators.required]],
              price           : [this.holding.price, [Validators.min(1), Validators.required]]
          });
      }
      
  }

  onPositionTypeChanged()
  {
      if(this.optionPositionType === GlobalConstants.PositionType.Currency)
      {
        this.selectedGold = "";
        this.selectedCoin = "";
      }
      else if(this.optionPositionType === GlobalConstants.PositionType.Gold)
      {
        this.selectedCurrency = "";
        this.selectedCoin = "";
      }
      else
      {
        this.selectedCurrency = "";
        this.selectedGold = "";
      }
  }

  onPositionSelectedCurrency(curr)
  {
  }

  onPositionSelectedGold(gold)
  {
  }

  onPositionSelectedCoin(coin)
  {
  }

  clearSearchField(){
      this.selectedCurrency = "";
      this.selectedCoin = "";
      this.selectedGold = "";
  }

  saveHolding(holding){

    let holdingVM = new HoldingVM({});

    holdingVM.id = holding.id;
    holdingVM.userId = holding.userId;
    holdingVM.purchaseDate = holding.purchaseDate;
    holdingVM.amount = holding.amount;
    holdingVM.price = holding.price;
    holdingVM.holdingTypeId = this.optionPositionType;

    if(this.optionPositionType === GlobalConstants.PositionType.Currency)
    {
        holdingVM.holdingCode = this.selectedCurrency;
    }
    else if(this.optionPositionType === GlobalConstants.PositionType.Gold)
    {
        holdingVM.holdingCode = this.selectedGold;
    }
    else
    {
        holdingVM.holdingCode = this.selectedCoin;
    }

    this._holdingService.post(holdingVM).subscribe(resp=>{
      this.getholdings();
    });
  }

  editHolding(holding)
  {
      this.holding = this.holdings.filter(t=>t.id == holding.id)[0];
      this.optionPositionType = this.holding.holdingTypeId;

      if(this.optionPositionType === GlobalConstants.PositionType.Currency)
      {
          this.selectedCurrency = this.holding.holdingCode;
      }
      else if(this.optionPositionType === GlobalConstants.PositionType.Gold)
      {
          this.selectedGold = this.holding.holdingCode;
      }
      else
      {
          this.selectedCoin = this.holding.holdingCode;
      } 

      this.action="edit";
      this.postHoldingForm = this.createPostHoldingForm();
  }

  deleteHolding(holding)
  {
    this._holdingService.delete(holding.id).subscribe(resp=>{
      this.getholdings();
    });
  }

  get isPositionSelected()
  {
      if(this.optionPositionType === GlobalConstants.PositionType.Currency)
      {
          return this.selectedCurrency !== "";
      }
      else if(this.optionPositionType === GlobalConstants.PositionType.Gold)
      {
          return this.selectedGold !== "";
      }
      else
      {
          return this.selectedCoin !== "";
      }      
  }

  getCurrencies() {
    let currencyArray: TypeVM[] = [];

    GlobalConstants.symbols.forEach(function(value, index){
      let curr = new TypeVM();
      curr.adi = value;
      curr.uzunAdi = GlobalConstants.symbolNames[index];
      curr.id = index + 1;
      currencyArray.push(curr);
    });

    return currencyArray;
  }

  getGolds() {
    let goldArray: TypeVM[] = [];

    GlobalConstants.goldTypes.forEach(function(value, index){
      let gold = new TypeVM();
      gold.adi = value;
      gold.id = index + 1;
      goldArray.push(gold);
    });

    return goldArray;
  }  

  getCurrencyFlagCss(code: string) : string
  {
      if(code == null || code == "")
        return "";

      return "flag-icon flag-icon-" + code.toLocaleLowerCase().split("ı").join("i").substring(0,2);
  }

  getCriptoFlagCss(code: string) : string
  {
      if(code == null || code == "")
        return "";

      return "https://api.dolar.net/Images/cripto-coin-icons/" + code.toLocaleLowerCase().split("ı").join("i") + ".png";
  }

  getholdings()
  {
      let criteria = new HoldingSearchCriteriaVM();
      criteria.itemCount = 30;
      criteria.pageId = 0;
      criteria.userId = 1;

      this._holdingService.get(criteria).subscribe(response=>{
        this.holdings = response.result.holdings;

        var _now = new Date(Date.now());
        var today = new Date(_now.getFullYear(), _now.getMonth(), _now.getDay());

        this.holdings.forEach(hold => {

            var _purchaseDate = new Date(
              (new Date(hold.purchaseDate.toString())).getFullYear(),
              (new Date(hold.purchaseDate.toString())).getMonth(),
              (new Date(hold.purchaseDate.toString())).getDay()
            );

            if(hold.holdingTypeId === GlobalConstants.PositionType.Currency)
            {
                hold.todaysPrice =  this.currencyRates.find(t=>t.code === hold.holdingCode).buying;
                hold.marketPrice =  this.currencyRates.find(t=>t.code === hold.holdingCode).buying * hold.amount;

                if(_purchaseDate.getTime() === today.getTime())
                {
                    var yesterdaysValue = this.currencyRates.find(t=>t.code === hold.holdingCode).buying * (100 - this.currencyRates.find(t=>t.code === hold.holdingCode).rate) / 100;
                    hold.dailyChangeRate =  100 * (yesterdaysValue - hold.price) / 100;
                }
                else 
                {
                    hold.dailyChangeRate = this.currencyRates.find(t=>t.code === hold.holdingCode).rate;
                }

                hold.dailyChange =  (hold.amount * hold.price) * hold.dailyChangeRate;

                hold.openChangeRate = (this.currencyRates.find(t=>t.code === hold.holdingCode).buying * 100 / hold.price) - 100;
                hold.openChange = (hold.amount * hold.price) * hold.openChangeRate;
            }
            else if(hold.holdingTypeId === GlobalConstants.PositionType.Gold)
            {
                hold.todaysPrice =  this.goldRates.find(t=>t.name === hold.holdingCode).buying;
                hold.marketPrice =  this.goldRates.find(t=>t.name === hold.holdingCode).buying * hold.amount;

                if(_purchaseDate.getTime() === today.getTime())
                {
                    var yesterdaysValue = this.goldRates.find(t=>t.name === hold.holdingCode).buying * (100 - this.goldRates.find(t=>t.name === hold.holdingCode).rate) / 100;

                    hold.dailyChangeRate =  100 * (yesterdaysValue - hold.price) / 100;
                }
                else 
                {
                    hold.dailyChangeRate = this.goldRates.find(t=>t.name === hold.holdingCode).rate;
                }

                hold.dailyChange =  (hold.amount * hold.price) * hold.dailyChangeRate;
                hold.openChangeRate = (this.goldRates.find(t=>t.name === hold.holdingCode).buying * 100 / hold.price) - 100;
                hold.openChange = (hold.amount * hold.price) * hold.openChangeRate;
            }
            else
            {
                hold.todaysPrice =  this.criptoRates.find(t=>t.code === hold.holdingCode).price;
                hold.marketPrice =  this.criptoRates.find(t=>t.code === hold.holdingCode).price * hold.amount;

                if(_purchaseDate.getTime() === today.getTime())
                {
                    var yesterdaysValue = this.criptoRates.find(t=>t.name === hold.holdingCode).price * (100 - this.criptoRates.find(t=>t.name === hold.holdingCode).changeDay) / 100;
                    hold.dailyChangeRate =  100 * (yesterdaysValue - hold.price) / 100;
                }
                else 
                {
                    hold.dailyChangeRate = this.criptoRates.find(t=>t.code === hold.holdingCode).changeDay;
                }

                hold.dailyChange =  (hold.amount * hold.price) * hold.dailyChangeRate;
                hold.openChangeRate = (this.criptoRates.find(t=>t.code === hold.holdingCode).price * 100 / hold.price) - 100;
                hold.openChange = (hold.amount * hold.price) * hold.openChangeRate;
            } 
        });
      });
  }

  getConvertedToTry(value: number) : string
  {
      return value.toLocaleString('tr-TR', {
        maximumFractionDigits: 2,
      });
  }
}