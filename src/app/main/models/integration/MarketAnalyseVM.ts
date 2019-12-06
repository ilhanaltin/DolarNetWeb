export class MarketAnalyseVM
{
    dolarTLValueInt: number;
    dolarTLValueStr: string;

    dolarTLRateInt: number;
    dolarTLRateStr: string;

    euroTLValueInt: number;
    euroTLValueStr: string;

    euroTLRateInt: number;
    euroTLRateStr: string;

    euroDolarValueInt: number;
    euroDolarValueStr: string;

    euroDolarRateInt: number;
    euroDolarRateStr: string;

    etheriumTLValueInt: number;
    etheriumTLValueStr: string;

    etheriumTLRateInt: number;
    etheriumTLRateStr: string;

    bitcoinTLValueInt: number;
    bitcoinTLValueStr: string;

    bitcoinTLRateInt: number;
    bitcoinTLRateStr: string;

    xrpTLValueInt: number;
    xrpTLValueStr: string;

    xrpTLRateInt: number;
    xrpTLRateStr: string;

    litecoinTLValueInt: number;
    litecoinTLValueStr: string;

    litecoinTLRateInt: number;
    litecoinTLRateStr: string;

    bitcoinCashTLValueInt: number;
    bitcoinCashTLValueStr: string;

    bitcoinCashTLRateInt: number;
    bitcoinCashTLRateStr: string;

    /**
     * Constructor
     *
     * @param currencyBar
     */
    constructor(currencyBar)   
    {
        {
            this.dolarTLValueInt = currencyBar.dolarTLValueInt || 0;
            this.dolarTLValueStr = currencyBar.dolarTLValueStr || '0,0000';
            this.dolarTLRateInt = currencyBar.dolarTLRateInt || 0;
            this.dolarTLRateStr = currencyBar.dolarTLRateStr || '0,00';
            this.etheriumTLValueInt = currencyBar.etheriumTLValueInt || 0;
            this.etheriumTLValueStr = currencyBar.etheriumTLValueStr || '0,00';
            this.etheriumTLRateInt = currencyBar.etheriumTLRateInt || 0;
            this.etheriumTLRateStr = currencyBar.etheriumTLRateStr || '0,00';
            this.bitcoinTLValueInt = currencyBar.bitcoinTLValueInt || 0;
            this.bitcoinTLValueStr = currencyBar.bitcoinTLValueStr || '0,00';
            this.bitcoinTLRateInt = currencyBar.bitcoinTLRateInt || 0;
            this.bitcoinTLRateStr = currencyBar.bitcoinTLRateStr || '0,00';
            this.xrpTLValueInt = currencyBar.xrpTLValueInt || 0;
            this.xrpTLValueStr = currencyBar.xrpTLValueStr || '0,0000';
            this.xrpTLRateInt = currencyBar.xrpTLRateInt || 0;
            this.xrpTLRateStr = currencyBar.xrpTLRateStr || '0,00';
            this.litecoinTLValueInt = currencyBar.litecoinTLValueInt || 0;
            this.litecoinTLValueStr = currencyBar.litecoinTLValueStr || '0,00';
            this.litecoinTLRateInt = currencyBar.litecoinTLRateInt || 0;
            this.litecoinTLRateStr = currencyBar.litecoinTLRateStr || '0,00';
            this.bitcoinCashTLValueInt = currencyBar.bitcoinCashTLValueInt || 0;
            this.bitcoinCashTLValueStr = currencyBar.bitcoinCashTLValueStr || '0,00';
            this.bitcoinCashTLRateInt = currencyBar.bitcoinCashTLRateInt || 0;
            this.bitcoinCashTLRateStr = currencyBar.bitcoinCashTLRateStr || '0,00';
        }
    }
}