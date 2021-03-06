import { PostCommentModule } from './../comments/post-comment.module';
import { NewsLatestModule } from './../news-latest/news-latest.module';
import { NewsPopularModule } from './../news-popular/news-popular.module';
import { MarketAnalyseModule } from '../../market-analyse/market-analyse.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NewsDetailComponent } from './news-detail.component';
import { NavigationHeaderModule } from '../../header/navigation-header/navigation-header.module';
import { CurrencyBarModule } from '../../header/currency-bar/currency-bar.module';
import { FooterDolarnetModule } from '../../footer-dolarnet/footer-dolarnet.module';
import { PostCategoryHeaderModule } from '../../header/post-category-header/post-category-header.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
        NavigationHeaderModule,
        CurrencyBarModule,
        FooterDolarnetModule,
        MarketAnalyseModule,
        PostCategoryHeaderModule,
        NewsPopularModule,
        NewsLatestModule,
        MatButtonModule,
        MatIconModule,
        PostCommentModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NewsDetailModule
{
}