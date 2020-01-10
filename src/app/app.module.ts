import { NewsListModule } from './main/pages/post/news-list/news-list.module';
import { BorsaListModule } from './main/pages/standart-list/borsa-list/borsa-list.module';
import { NewsDetailModule } from './main/pages/post/news-detail/news-detail.module';
import { LoginModule } from './main/pages/login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { APP_BASE_HREF} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './main/pages/home/home.module';
import { NewsModule } from './main/pages/post/news/news.module';
import { DovizListModule } from './main/pages/standart-list/doviz/doviz-list.module';
import { AltinListModule } from './main/pages/standart-list/altin/altin-list.module';
import { ParitelerListModule } from './main/pages/standart-list/pariteler/pariteler-list.module';
import { CriptoCoinListModule } from './main/pages/standart-list/cripto-coin/cripto-coin-list.module';
import { PostCategoryHeaderModule } from './main/pages/header/post-category-header/post-category-header.module';

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
    LoginModule,
    DovizListModule,
    AltinListModule,
    ParitelerListModule,
    CriptoCoinListModule,
    BorsaListModule,
    NewsListModule,
    PostCategoryHeaderModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
