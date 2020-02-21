export class PortfolioVM
{
    id: number;
    userId: number;
    holdingTypeId: number;
    holdingTypeAdi: string;
    holdingCode: string;
    
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
        }
    }
}