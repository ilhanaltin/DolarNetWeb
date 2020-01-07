import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NavigationHeaderComponent } from './navigation-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations   : [
        NavigationHeaderComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        NavigationHeaderComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NavigationHeaderModule
{
}