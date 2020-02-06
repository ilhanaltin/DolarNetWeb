import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

@NgModule({
    declarations   : [
        RegisterComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class RegisterModule
{
}