import { MarketAnalyseModule } from '../../market-analyse/market-analyse.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PostCategoryHeaderComponent } from './post-category-header.component';

@NgModule({
    declarations   : [
        PostCategoryHeaderComponent        
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule
    ],
    exports: [
        PostCategoryHeaderComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class PostCategoryHeaderModule
{
}