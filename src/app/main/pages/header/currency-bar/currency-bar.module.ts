import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CurrencyBarComponent } from './currency-bar.component';

@NgModule({
    declarations   : [
        CurrencyBarComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule
    ],
    exports   : [
        CurrencyBarComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class CurrencyBarModule
{
}