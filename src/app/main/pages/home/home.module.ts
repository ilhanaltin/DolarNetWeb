import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { NavigationHeaderComponent } from '../header/navigation-header/navigation-header.component';
import { CurrencyBarComponent } from '../header/currency-bar/currency-bar.component';
import { SliderComponent } from '../slider/slider.component';
import { LoginStateProfileBoxComponent } from '../login-state-profile-box/login-state-profile-box.component';
import { ConverterComponent } from '../converter/converter.component';
import { HomePostListComponent } from '../home-post-list/home-post-list.component';
import { MarketAnalyseComponent } from '../market-analyse/market-analyse.component';
import { FooterDolarnetComponent } from '../footer-dolarnet/footer-dolarnet/footer-dolarnet.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationHeaderModule } from '../header/navigation-header/navigation-header.module';
import { CurrencyBarModule } from '../header/currency-bar/currency-bar.module';
import { SliderModule } from '../slider/slider.module';
import { LoginStateProfileBoxModule } from '../login-state-profile-box/login-state-profile-box.module';
import { ConverterModule } from '../converter/converter.module';
import { HomePostListModule } from '../home-post-list/home-post-list.module';
import { MarketAnalyseModule } from '../market-analyse/market-analyse.module';
import { FooterDolarnetModule } from '../footer-dolarnet/footer-dolarnet/footer-dolarnet.module';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
    declarations   : [
        HomeComponent        
    ],    
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        NavigationHeaderModule,
        CurrencyBarModule,
        SliderModule,
        LoginStateProfileBoxModule,
        ConverterModule,
        HomePostListModule,
        MarketAnalyseModule,
        FooterDolarnetModule
    ],
    exports        : [
        NavigationHeaderModule,
        CurrencyBarModule,
        SliderModule,
        LoginStateProfileBoxModule,
        ConverterModule,
        HomePostListModule,
        MarketAnalyseModule,
        FooterDolarnetModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class HomeModule
{
}