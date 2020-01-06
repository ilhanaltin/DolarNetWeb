import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginStateProfileBoxComponent } from './login-state-profile-box.component';

@NgModule({
    declarations   : [
        LoginStateProfileBoxComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule
    ],
    exports   : [
        LoginStateProfileBoxComponent
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class LoginStateProfileBoxModule
{
}