import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomePostListComponent } from './home-post-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations   : [
        HomePostListComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    exports   : [
        HomePostListComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class HomePostListModule
{
}