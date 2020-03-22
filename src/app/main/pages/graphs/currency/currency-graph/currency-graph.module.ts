import { ConverterModule } from './../../../converter/converter.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CurrencyGraphComponent } from './currency-graph.component';
import { FooterDolarnetModule } from '../../../footer-dolarnet/footer-dolarnet.module';
import { CurrencyBarModule } from '../../../header/currency-bar/currency-bar.module';
import { NavigationHeaderModule } from '../../../header/navigation-header/navigation-header.module';
import { NewsLatestModule } from '../../../post/news-latest/news-latest.module';
import { NewsPopularModule } from '../../../post/news-popular/news-popular.module';
import { MarketAnalyseModule } from '../../../market-analyse/market-analyse.module';

@NgModule({
    declarations   : [
        CurrencyGraphComponent        
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        NavigationHeaderModule,
        CurrencyBarModule,
        FooterDolarnetModule,
        ConverterModule,
        NewsLatestModule,
        MarketAnalyseModule,
        NewsPopularModule,
        NewsLatestModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class CurrencyGraphModule
{
}