export class CurrencyBarVM
{
    dolarTLValueInt: number;
    dolarTLValueStr: string;

    dolarTLRateInt: number;
    dolarTLRateStr: string;

    euroTLValueInt: number;
    euroTLValueStr: string;

    euroTLRateInt: number;
    euroTLRateStr: string;

    sterlinTLValueInt: number;
    sterlinTLValueStr: string;

    sterlinTLRateInt: number;
    sterlinTLRateStr: string;    

    borsaTLValueInt: number;
    borsaTLValueStr: string;

    borsaTLRateInt: number;
    borsaTLRateStr: string;

    goldTLValueInt: number;
    goldTLValueStr: string;

    goldTLRateInt: number;
    goldTLRateStr: string;

    goldOnsTLValueInt: number;
    goldOnsTLValueStr: string;

    goldOnsTLRateInt: number;
    goldOnsTLRateStr: string;

    bitcoinTLValueInt: number;
    bitcoinTLValueStr: string;

    bitcoinTLRateInt: number;
    bitcoinTLRateStr: string;

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
            this.dolarTLRateStr = currencyBar.dolarTLRateStr || '0,0';
            this.euroTLValueInt = currencyBar.euroTLValueInt || 0;
            this.euroTLValueStr = currencyBar.euroTLValueStr || '0,0000';
            this.euroTLRateInt = currencyBar.euroTLRateInt || 0;
            this.euroTLRateStr = currencyBar.euroTLRateStr || '0,0';
            this.sterlinTLValueInt = currencyBar.sterlinTLValueInt || 0;
            this.sterlinTLValueStr = currencyBar.sterlinTLValueStr || '0,0000';
            this.sterlinTLRateInt = currencyBar.sterlinTLRateInt || 0;
            this.sterlinTLRateStr = currencyBar.sterlinTLRateStr || '0,0';
            this.borsaTLValueInt = currencyBar.borsaTLValueInt || 0;
            this.borsaTLValueStr = currencyBar.borsaTLValueStr || '0,00';
            this.borsaTLRateInt = currencyBar.borsaTLRateInt || 0;
            this.borsaTLRateStr = currencyBar.borsaTLRateStr || '0,0';
            this.goldTLValueInt = currencyBar.goldTLValueInt || 0;
            this.goldTLValueStr = currencyBar.goldTLValueStr || '0,00';
            this.goldTLRateInt = currencyBar.goldTLRateInt || 0;
            this.goldTLRateStr = currencyBar.goldTLRateStr || '0,0';
            this.goldOnsTLValueInt = currencyBar.goldOnsTLValueInt || 0;
            this.goldOnsTLValueStr = currencyBar.goldOnsTLValueStr || '0,00';
            this.goldOnsTLRateInt = currencyBar.goldOnsTLRateInt || 0;
            this.goldOnsTLRateStr = currencyBar.goldOnsTLRateStr || '0,0';
            this.bitcoinTLValueInt = currencyBar.bitcoinTLValueInt || 0;
            this.bitcoinTLValueStr = currencyBar.bitcoinTLValueStr || '0,00';
            this.bitcoinTLRateInt = currencyBar.bitcoinTLRateInt || 0;
            this.bitcoinTLRateStr = currencyBar.bitcoinTLRateStr || '0,0';
        }
    }
}