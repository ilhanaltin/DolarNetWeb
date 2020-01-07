import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations   : [
        SliderComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule
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