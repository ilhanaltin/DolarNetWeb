import { CurrencyRateVM } from './currencyRateVM';

export class LatestVM {
    success: boolean;
    timestamp: number;
    base: string;
    date: Date;
    currencyRates: CurrencyRateVM;
}