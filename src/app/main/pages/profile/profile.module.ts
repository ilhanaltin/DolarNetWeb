import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { NavigationHeaderModule } from '../header/navigation-header/navigation-header.module';
import { CurrencyBarModule } from '../header/currency-bar/currency-bar.module';
import { FooterDolarnetModule } from '../footer-dolarnet/footer-dolarnet.module';
import { LoginStateProfileBoxModule } from '../login-state-profile-box/login-state-profile-box.module';
import { MarketAnalyseModule } from '../market-analyse/market-analyse.module';
import { ConverterModule } from '../converter/converter.module';
import { NewsPopularModule } from '../post/news-popular/news-popular.module';
import { NewsLatestModule } from '../post/news-latest/news-latest.module';

import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
    declarations   : [
        ProfileComponent
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NavigationHeaderModule,
        CurrencyBarModule,
        FooterDolarnetModule,
        LoginStateProfileBoxModule,
        MarketAnalyseModule,
        ConverterModule,
        NewsPopularModule,
        NewsLatestModule,
        MatInputModule,
        MatAutocompleteModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class ProfileModule
{
}