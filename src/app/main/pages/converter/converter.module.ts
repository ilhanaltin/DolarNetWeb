import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConverterComponent } from './converter.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations   : [
        ConverterComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        FlexLayoutModule
    ],
    exports   : [
        ConverterComponent, MatIconModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class ConverterModule
{
}