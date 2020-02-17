import { TypeVM } from './../../models/types/TypeVM';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { GlobalConstants } from '../../models/constants/GlobalConstants';
import { CriptoService } from '../../services/cripto.service';
import { CriptoRatesVM } from '../../models/coins/CriptoRatesVM';
import { HoldingService } from '../../services/holding.service';
import { HoldingSearchCriteriaVM } from '../../models/holding/HoldingSearchCriteriaVM';
import { HoldingVM } from '../../models/holding/HoldingVM';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  postHoldingForm: FormGroup;

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

  criptoRates: CriptoRatesVM[];

  holdings: HoldingVM[];
  
  holding: HoldingVM;

  action: string = "new";

  constructor( private _criptoService: CriptoService,
    private _holdingService: HoldingService,
    private _formBuilder: FormBuilder,
    public _authenticationService: AuthenticationService) {

    this.holding = new HoldingVM({});
    this.currencies = this.getCurrencies();
    this.golds = this.getGolds();
    this.getCriptoData();

    this.optionPositionType = GlobalConstants.PositionType.Currency;
   }

  ngOnInit() {    
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

        this.getholdings();

        this.postHoldingForm = this.createPostHoldingForm();
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
      });
  }
}