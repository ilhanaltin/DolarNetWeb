import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ConverterComponent } from './converter.component';

@NgModule({
    declarations   : [
        ConverterComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule
    ],
    exports   : [
        ConverterComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class ConverterModule
{
}