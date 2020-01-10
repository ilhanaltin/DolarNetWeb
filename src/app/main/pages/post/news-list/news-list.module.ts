import { NewsCategoryBoxModule } from './../news-category-box/news-category-box.module';
import { PostCategoryHeaderModule } from './../../header/post-category-header/post-category-header.module';
import { MarketAnalyseModule } from '../../market-analyse/market-analyse.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavigationHeaderModule } from '../../header/navigation-header/navigation-header.module';
import { NewsListComponent } from './news-list.component';
import { CurrencyBarModule } from '../../header/currency-bar/currency-bar.module';
import { FooterDolarnetModule } from '../../footer-dolarnet/footer-dolarnet.module';

@NgModule({
    declarations   : [
        NewsListComponent        
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NavigationHeaderModule,
        CurrencyBarModule,
        FooterDolarnetModule,
        MarketAnalyseModule,
        PostCategoryHeaderModule,
        NewsCategoryBoxModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NewsListModule
{
}