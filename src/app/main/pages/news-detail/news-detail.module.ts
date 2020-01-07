import { MarketAnalyseModule } from './../market-analyse/market-analyse.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationHeaderModule } from '../header/navigation-header/navigation-header.module';
import { CurrencyBarModule } from '../header/currency-bar/currency-bar.module';
import { HttpClientModule } from '@angular/common/http';
import { FooterDolarnetModule } from '../footer-dolarnet/footer-dolarnet.module';
import { NewsDetailComponent } from './news-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations   : [
        NewsDetailComponent        
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        NavigationHeaderModule,
        CurrencyBarModule,
        FooterDolarnetModule,
        MarketAnalyseModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NewsDetailModule
{
}