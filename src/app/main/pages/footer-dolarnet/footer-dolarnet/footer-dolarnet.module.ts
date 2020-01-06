import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FooterDolarnetComponent } from './footer-dolarnet.component';

@NgModule({
    declarations   : [
        FooterDolarnetComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule
    ],
    exports   : [
        FooterDolarnetComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class FooterDolarnetModule
{
}