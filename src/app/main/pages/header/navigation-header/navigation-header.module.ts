import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NavigationHeaderComponent } from './navigation-header.component';

@NgModule({
    declarations   : [
        NavigationHeaderComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule
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