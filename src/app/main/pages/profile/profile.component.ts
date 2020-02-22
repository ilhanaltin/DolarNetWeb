import { PortfolioService } from './../../services/portfolio.service';
import { PortfolioVM } from './../../models/portfolio/PortfolioVM';
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
import { PortfolioSearchCriteriaVM } from '../../models/portfolio/PortfolioSearchCriteriaVM';

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

  listBoxCurrencyPortfolio = new FormControl();
  listBoxGoldPortfolio = new FormControl();
  listBoxCoinPortfolio = new FormControl();

  currencies: TypeVM[];
  golds: TypeVM[];

  selectedCurrency: string = "";
  selectedGold: string = "";
  selectedCoin: string = "";

  selectedCurrencyPortfolio: string = "";
  selectedGoldPortfolio: string = "";
  selectedCoinPortfolio: string = "";

  filteredCurrencies: Observable<TypeVM[]>;
  filteredGolds: Observable<TypeVM[]>;
  filteredCoins: Observable<CriptoRatesVM[]>;

  filteredCurrenciesPortfolio: Observable<TypeVM[]>;
  filteredGoldsPortfolio: Observable<TypeVM[]>;
  filteredCoinsPortfolio: Observable<CriptoRatesVM[]>;

  optionPositionType: number;
  optionPositionTypePortfolio: number;

  marketValue: number;
  openPrice: number;
  openPriceRate: number;
  dailyPrice: number;
  dailyPriceRate: number;

  holdings: HoldingVM[];
  portfolios: PortfolioVM[];
  
  holding: HoldingVM;
  portfolio: PortfolioVM;

  action: string = "new";

  constructor( private _criptoService: CriptoService,
    private _holdingService: HoldingService,
    private _portfolioService: PortfolioService,
    private _formBuilder: FormBuilder,
    public _authenticationService: AuthenticationService,
    private _currencyService: CurrencyService, 
    private _goldService: GoldService) {

    this.holding = new HoldingVM({});
    this.portfolio = new PortfolioVM({});
    this.currencies = this.getCurrencies();
    this.golds = this.getGolds();
    this.optionPositionType = GlobalConstants.PositionType.Currency;
    this.optionPositionTypePortfolio = GlobalConstants.PositionType.Currency;
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
        
        this.filteredCurrenciesPortfolio = this.listBoxCurrencyPortfolio.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCurrency(value))
        );

        this.filteredGoldsPortfolio = this.listBoxGoldPortfolio.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGold(value))
        );

        this.filteredCoinsPortfolio = this.listBoxCoinPortfolio.valueChanges
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
        }
        else
        {
            this._currencyService.getFromApi().subscribe(resp=>{
              this.currencyRates = resp.result;

              this.getGoldData();
              this.getCriptoData();              
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

  getCriptoData(getOnlyCripto: boolean = false)
  {
      let storageDataCripto = this._criptoService.getFromStorage();

      if(storageDataCripto.isValid)
      {
        this.criptoRates = storageDataCripto.data;
        
        if(getOnlyCripto === false)
        {
            this.getHoldings();
            this.getPortfolios();
        }
      }
      else
      {
          this._criptoService.getFromApi().subscribe(resp=>{
              this.criptoRates = resp.result;
              
              if(getOnlyCripto === false)
              {
                this.getHoldings();
                this.getPortfolios();
              }
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

  onPositionTypeChangedPortfolio()
  {
      if(this.optionPositionTypePortfolio === GlobalConstants.PositionType.Currency)
      {
        this.selectedGoldPortfolio = "";
        this.selectedCoinPortfolio = "";
      }
      else if(this.optionPositionTypePortfolio === GlobalConstants.PositionType.Gold)
      {
        this.selectedCurrencyPortfolio = "";
        this.selectedCoinPortfolio = "";
      }
      else
      {
        this.selectedCurrencyPortfolio = "";
        this.selectedGoldPortfolio = "";
      }
  }

  clearSearchField(){
      this.selectedCurrency = "";
      this.selectedCoin = "";
      this.selectedGold = "";

      this.selectedCurrencyPortfolio = "";
      this.selectedCoinPortfolio = "";
      this.selectedGoldPortfolio = "";
  }

  tabChanged(){
    this.selectedCurrencyPortfolio = "";
    this.selectedCoinPortfolio = "";
    this.selectedGoldPortfolio = "";

    this.selectedCurrency = "";
    this.selectedCoin = "";
    this.selectedGold = "";

    this.currencies = this.getCurrencies();
    this.golds = this.getGolds();
    this.getCriptoData(true);
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
      this.getHoldings();
    });
  }

  savePortfolio(){

    let portfolioVM = new PortfolioVM({});

    portfolioVM.userId = this._authenticationService.currentUser.id;;
    portfolioVM.holdingTypeId = this.optionPositionTypePortfolio;

    if(this.optionPositionTypePortfolio === GlobalConstants.PositionType.Currency)
    {
        portfolioVM.holdingCode = this.selectedCurrencyPortfolio;
    }
    else if(this.optionPositionTypePortfolio === GlobalConstants.PositionType.Gold)
    {
        portfolioVM.holdingCode = this.selectedGoldPortfolio;
    }
    else
    {
        portfolioVM.holdingCode = this.selectedCoinPortfolio;
    }

    this._portfolioService.post(portfolioVM).subscribe(resp=>{
      this.getPortfolios();
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
      this.getHoldings();
    });
  }

  deletePortfolio(portfolio)
  {
    this._portfolioService.delete(portfolio.id).subscribe(resp=>{
      this.getPortfolios();
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

  getHoldings()
  {
      let criteria = new HoldingSearchCriteriaVM();
      criteria.itemCount = 30;
      criteria.pageId = 0;
      criteria.userId = this._authenticationService.currentUser.id;

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
                hold.holdingLongName = this.currencyRates.find(t=>t.code === hold.holdingCode).name;

                if(_purchaseDate.getTime() === today.getTime())
                {
                    hold.dailyChangeRate =  (hold.todaysPrice - hold.price) * 100 / hold.price;
                }
                else 
                {
                    hold.dailyChangeRate = this.currencyRates.find(t=>t.code === hold.holdingCode).rate;
                }

                hold.dailyChange =  (hold.amount * hold.price) * hold.dailyChangeRate / 100;
                hold.openChangeRate = (this.currencyRates.find(t=>t.code === hold.holdingCode).buying * 100 / hold.price) - 100;
                hold.openChange = (hold.amount * hold.price) * hold.openChangeRate / 100;
            }
            else if(hold.holdingTypeId === GlobalConstants.PositionType.Gold)
            {
                hold.todaysPrice =  this.goldRates.find(t=>t.name === hold.holdingCode).buying;
                hold.marketPrice =  this.goldRates.find(t=>t.name === hold.holdingCode).buying * hold.amount;
                hold.holdingLongName = this.goldRates.find(t=>t.name === hold.holdingCode).name;

                if(_purchaseDate.getTime() === today.getTime())
                {
                    hold.dailyChangeRate =  (hold.todaysPrice - hold.price) * 100 / hold.price;
                }
                else 
                {
                    hold.dailyChangeRate = this.goldRates.find(t=>t.name === hold.holdingCode).rate;
                }

                hold.dailyChange =  (hold.amount * hold.price) * hold.dailyChangeRate / 100;
                hold.openChangeRate = (this.goldRates.find(t=>t.name === hold.holdingCode).buying * 100 / hold.price) - 100;
                hold.openChange = (hold.amount * hold.price) * hold.openChangeRate / 100;
            }
            else
            {
                hold.todaysPrice =  this.criptoRates.find(t=>t.code === hold.holdingCode).price;
                hold.marketPrice =  this.criptoRates.find(t=>t.code === hold.holdingCode).price * hold.amount;
                hold.holdingLongName = this.criptoRates.find(t=>t.code === hold.holdingCode).name;
                
                if(_purchaseDate.getTime() === today.getTime())
                {
                    hold.dailyChangeRate =  (hold.todaysPrice - hold.price) * 100 / hold.price;
                }
                else 
                {
                    hold.dailyChangeRate = this.criptoRates.find(t=>t.code === hold.holdingCode).changeDay;
                }

                hold.dailyChange =  (hold.amount * hold.price) * hold.dailyChangeRate / 100;
                hold.openChangeRate = (this.criptoRates.find(t=>t.code === hold.holdingCode).price * 100 / hold.price) - 100;
                hold.openChange = (hold.amount * hold.price) * hold.openChangeRate / 100;
            } 
        });

        this.marketValue = this.holdings.reduce(function(prev, cur) {
          return prev + cur.marketPrice;
        }, 0);

        var valueBefore = this.holdings.reduce(function(prev, cur) {
          return prev + cur.amount * cur.price;
        }, 0);

        var todaysChange = this.holdings.reduce(function(prev, cur) {
          return prev + cur.dailyChange;
        }, 0); 

        this.openPrice = this.marketValue - valueBefore;

        this.openPriceRate = this.openPrice * 100 / valueBefore;
        this.dailyPriceRate = 100 * todaysChange / (this.marketValue - todaysChange);

        this.dailyPrice = this.holdings.reduce(function(prev, cur) {
          return prev + cur.dailyChange;
        }, 0);
      });
  }

  getPortfolios()
  {
      let criteria = new PortfolioSearchCriteriaVM();
      criteria.itemCount = 30;
      criteria.pageId = 0;
      criteria.userId = this._authenticationService.currentUser.id;

      this._portfolioService.get(criteria).subscribe(response=>{
        this.portfolios = response.result.portfolios;

        this.portfolios.forEach(port => {

            if(port.holdingTypeId === GlobalConstants.PositionType.Currency)
            {
                port.value =  this.currencyRates.find(t=>t.code === port.holdingCode).buying;
                port.dailyChange =  this.currencyRates.find(t=>t.code === port.holdingCode).rate * port.value / 100;
                port.dailyChangeRate =  this.currencyRates.find(t=>t.code === port.holdingCode).rate;
                port.dateTime = this.currencyRates.find(t=>t.code === port.holdingCode).dateTime;
                port.holdingLongName = this.currencyRates.find(t=>t.code === port.holdingCode).name;

            }
            else if(port.holdingTypeId === GlobalConstants.PositionType.Gold)
            {
                port.value =  this.goldRates.find(t=>t.name === port.holdingCode).buying;
                port.dailyChange =  this.goldRates.find(t=>t.name === port.holdingCode).rate * port.value / 100;
                port.dailyChangeRate =  this.goldRates.find(t=>t.name === port.holdingCode).rate;
                port.dateTime = this.goldRates.find(t=>t.name === port.holdingCode).dateTime;
                port.holdingLongName = this.goldRates.find(t=>t.name === port.holdingCode).name;
            }
            else
            {
                port.value =  this.criptoRates.find(t=>t.code === port.holdingCode).price * this.currencyRates.find(t=>t.code === "USD").buying;
                port.dailyChange =  this.criptoRates.find(t=>t.code === port.holdingCode).changeDay * port.value / 100;                
                port.dailyChangeRate =  this.criptoRates.find(t=>t.code === port.holdingCode).changeDay; 
                port.dateTime = this.criptoRates.find(t=>t.code === port.holdingCode).dateTime;
                port.holdingLongName = this.criptoRates.find(t=>t.code === port.holdingCode).name;
            } 
        });
      });
  }

  getConvertedToTry(value: number, presicion: number = 2) : string
  {
      if(value == null)
        return "";

      return value.toLocaleString('tr-TR', {
        maximumFractionDigits: presicion,
      });
  }

  getCssWithValue(value)
  {
      return value >= 0 ? "text-success mb-0" : "text-danger mb-0";
  }

  getUpDownImageWithValue(value)
  {
      return value >= 0 ? "assets/images/profile/profile-up-arrow.png" : "assets/images/profile/profile-down-arrow.png";
  }

  getIsPortfolioSelected()
  {
    return this.selectedCoinPortfolio || this.selectedGoldPortfolio || this.selectedCurrencyPortfolio;
  }
}