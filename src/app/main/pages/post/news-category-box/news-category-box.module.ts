import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewsCategoryBoxComponent } from './news-category-box.component';

@NgModule({
    declarations   : [
        NewsCategoryBoxComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    exports   : [
        NewsCategoryBoxComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NewsCategoryBoxModule
{
}