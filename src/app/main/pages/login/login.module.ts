import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

@NgModule({
    declarations   : [
        LoginComponent
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

export class LoginModule
{
}