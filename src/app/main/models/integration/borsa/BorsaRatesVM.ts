import { Time } from '@angular/common';

export class BorsaRatesVM {
    current: number;
    changeRate: number;
    min: number;
    max: number;
    opening: number;
    closing: number;
    dateTime: Time;
}