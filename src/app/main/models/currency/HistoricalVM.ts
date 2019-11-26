import { CurrencyRateVM } from './CurrencyRateVM';

export class HistoricalVM
{
    success: boolean;
    historical: boolean;
    date: Date;
    timestamp: number;
    base: string;
    currencyRates: CurrencyRateVM;
}