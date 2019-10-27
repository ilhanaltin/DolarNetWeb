import { QueryVM } from './QueryVM';
import { InfoVM } from './InfoVM';

export class ConvertVM
{
    success: boolean;
    query: QueryVM;
    info: InfoVM;
    historical: string;
    date: Date;
    result: number;
}