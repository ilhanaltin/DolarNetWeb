import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {APP_BASE_HREF} from '@angular/common';
import { HomeComponent } from './main/pages/home/home.component';
import { SliderComponent } from './main/pages/slider/slider.component';
import { ConverterComponent } from './main/pages/converter/converter.component';
import { MarketAnalyseComponent } from './main/pages/market-analyse/market-analyse.component';
import { NavigationHeaderComponent } from './main/pages/header/navigation-header/navigation-header.component';
import { CurrencyBarComponent } from './main/pages/header/currency-bar/currency-bar.component';
import { FooterDolarnetComponent } from './main/pages/footer-dolarnet/footer-dolarnet/footer-dolarnet.component';
import { HomePostListComponent } from './main/pages/home-post-list/home-post-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './main/pages/login/login.component';
import { LoginStateProfileBoxComponent } from './main/pages/login-state-profile-box/login-state-profile-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    HomeComponent,
    CurrencyBarComponent,
    SliderComponent,
    ConverterComponent,
    MarketAnalyseComponent,
    FooterDolarnetComponent,
    HomePostListComponent,
    LoginComponent,
    LoginStateProfileBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
