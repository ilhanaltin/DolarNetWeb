import { Time } from '@angular/common';
import { CoinPriceVM } from './CoinPriceVM';

export class CoinPricesContainerVM
{
    success:boolean;
    source:string;
    time_stamp:Time;
    utc_date:Date;
    coin_id:string;
    coin_name:string;
    prices: CoinPriceVM[];
}