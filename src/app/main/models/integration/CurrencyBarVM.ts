export class CurrencyBarVM
{
    dolarTLValueInt: number = 0;
    dolarTLValueStr: string = "0,0000";

    dolarTLRateInt: number = 0;
    dolarTLRateStr: string = "0,0";

    euroTLValueInt: number = 0;
    euroTLValueStr: string = "0,0000";

    euroTLRateInt: number = 0;
    euroTLRateStr: string = "0,0";

    sterlinTLValueInt: number = 0;
    sterlinTLValueStr: string = "0,0000";

    sterlinTLRateInt: number = 0;
    sterlinTLRateStr: string = "0,0";

    goldTLValueInt: number = 0;
    goldTLValueStr: string = "0,00";

    goldTLRateInt: number = 0;
    goldTLRateStr: string = "0,0";

    borsaTLValueInt: number = 0;
    borsaTLValueStr: string = "0,00";

    borsaTLRateInt: number = 0;
    borsaTLRateStr: string = "0,0";

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
        }
    }
}