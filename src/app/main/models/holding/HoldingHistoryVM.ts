export class HoldingHistoryVM
{
    id: number;
    holdingId: number;
    userId: number;
    holdingTypeId: number;
    holdingTypeAdi: string;
    holdingCode: string;
    date: Date;
    amount: number;
    price: number;

     /**
     * Constructor
     *
     * @param holdingHistory
     */
    constructor(holdingHistory)   
    {
        this.id = holdingHistory.id || 0;
        this.holdingId = holdingHistory.holdingId || 0;
        this.userId = holdingHistory.userId || 0;
        this.holdingTypeId = holdingHistory.holdingTypeId || 0;
        this.holdingTypeAdi = holdingHistory.holdingTypeAdi || '';
        this.holdingCode = holdingHistory.holdingCode || '';
        this.date = holdingHistory.date || '';
        this.amount = holdingHistory.amount || 0;
        this.price = holdingHistory.price || 0;
    }
}