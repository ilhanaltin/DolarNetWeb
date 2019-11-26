import { QueryVM } from './QueryVM';
import { InfoVM } from './InfoVM';

export class ConvertCurrencyVM
{
    success: boolean;
    query: QueryVM;
    info: InfoVM;
    historical: string;
    date: Date;
    result: number;
}