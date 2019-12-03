import { Time } from '@angular/common';

export class RatesVM {
    name: string;
    code: string;
    buying: number;
    selling: number;
    rate: number;
    time: Time;
    date: Date;
    calculated: number;
    mergedDateTime: Date;
}