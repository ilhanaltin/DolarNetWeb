export class PortfolioVM
{
    id: number;
    userId: number;
    holdingTypeId: number;
    holdingTypeAdi: string;
    holdingCode: string;
    value: number;
    dailyChange: number;
    dailyChangeRate: number;
    dateTime: Date 
    
     /**
     * Constructor
     *
     * @param holding
     */
    constructor(holding)   
    {
        {
            this.id = holding.id || 0;
            this.userId = holding.userId || 0;
            this.holdingTypeId = holding.holdingTypeId || 0;
            this.holdingTypeAdi = holding.holdingTypeAdi || '';
            this.holdingCode = holding.holdingCode || '';
            this.value = holding.value || 0;
            this.dailyChange = holding.dailyChange || 0;
            this.dailyChangeRate = holding.dailyChangeRate || 0;
        }
    }
}