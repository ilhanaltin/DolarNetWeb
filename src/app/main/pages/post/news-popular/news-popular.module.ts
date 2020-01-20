import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NewsPopularComponent } from './news-popular.component';

@NgModule({
    declarations   : [
        NewsPopularComponent        
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule
    ],
    exports   : [
        NewsPopularComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NewsPopularModule
{
}