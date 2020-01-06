import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';

@NgModule({
    declarations   : [
        SliderComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule
    ],
    exports   : [
        SliderComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class SliderModule
{
}