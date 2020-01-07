import { NewsDetailModule } from './main/pages/news-detail/news-detail.module';
import { LoginModule } from './main/pages/login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './main/pages/home/home.module';
import { NewsModule } from './main/pages/news/news.module';
import { NewsDetailComponent } from './main/pages/news-detail/news-detail.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    NewsModule,
    NewsDetailModule,
    LoginModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
