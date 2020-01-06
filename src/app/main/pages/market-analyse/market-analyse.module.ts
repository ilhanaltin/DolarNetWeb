import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MarketAnalyseComponent } from './market-analyse.component';

@NgModule({
    declarations   : [
        MarketAnalyseComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule
    ],
    exports   : [
        MarketAnalyseComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class MarketAnalyseModule
{
}