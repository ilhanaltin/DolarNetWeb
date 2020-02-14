export class HoldingVM
{
    id: number;
    userId: number;
    holdingTypeId: number;
    holdingTypeAdi: string;
    holdingCode: string;
    purchaseDate: Date;
    amount: number;
    price: number;

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
            this.purchaseDate = holding.purchaseDate || '';
            this.amount = holding.amount || 0;
            this.price = holding.price || 0;
        }
    }
}