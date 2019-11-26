import { QueryVM } from './queryVM';
import { InfoVM } from './infoVM';

export class ConvertCurrencyVM
{
    success: boolean;
    query: QueryVM;
    info: InfoVM;
    historical: string;
    date: Date;
    result: number;
}