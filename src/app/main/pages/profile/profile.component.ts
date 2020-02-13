import { TypeVM } from './../../models/types/TypeVM';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { GlobalConstants } from '../../models/constants/GlobalConstants';
import { CriptoService } from '../../services/cripto.service';
import { CriptoRatesVM } from '../../models/coins/CriptoRatesVM';
import { HoldingService } from '../../services/holding.service';
import { HoldingSearchCriteriaVM } from '../../models/holding/HoldingSearchCriteriaVM';
import { HoldingVM } from '../../models/holding/HoldingVM';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  listBoxCurrency = new FormControl();
  listBoxGold = new FormControl();
  listBoxCoin = new FormControl();
  currencies: TypeVM[];
  golds: TypeVM[];

  selectedCurrency: TypeVM;
  selectedGold: TypeVM;
  selectedCoin: CriptoRatesVM;

  filteredCurrencies: Observable<TypeVM[]>;
  filteredGolds: Observable<TypeVM[]>;
  filteredCoins: Observable<CriptoRatesVM[]>;
  optionPositionType: number;

  criptoRates: CriptoRatesVM[];

  holdings: HoldingVM[];
  
  constructor( private _criptoService: CriptoService,
    private _holdingService: HoldingService) {

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

  onPositionTypeChanged()
  {
      if(this.optionPositionType === GlobalConstants.PositionType.Currency)
      {
        this.selectedGold = null;
        this.selectedCoin = null;
      }
      else if(this.optionPositionType === GlobalConstants.PositionType.Gold)
      {
        this.selectedCurrency = null;
        this.selectedCoin = null;
      }
      else
      {
        this.selectedCurrency = null;
        this.selectedGold = null;
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

      return "https://api-dolar.com/Images/cripto-coin-icons/" + code.toLocaleLowerCase().split("ı").join("i") + ".png";
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