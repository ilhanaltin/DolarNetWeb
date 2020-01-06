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
import { NewsComponent } from './news.component';
import { NavigationHeaderModule } from '../header/navigation-header/navigation-header.module';
import { CurrencyBarModule } from '../header/currency-bar/currency-bar.module';
import { SliderModule } from '../slider/slider.module';
import { FooterDolarnetModule } from '../footer-dolarnet/footer-dolarnet/footer-dolarnet.module';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
    declarations   : [
        NewsComponent        
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        NavigationHeaderModule,
        CurrencyBarModule,
        SliderModule, 
        FooterDolarnetModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NewsModule
{
}