import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NewsLatestComponent } from './news-latest.component';

@NgModule({
    declarations   : [
        NewsLatestComponent        
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule
    ],
    exports   : [
        NewsLatestComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NewsLatestModule
{
}