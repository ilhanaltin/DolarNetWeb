import { PostCommentModule } from './main/pages/post/comments/post-comment.module';
import { RegisterModule } from './main/pages/register/register.module';
import { NewsPopularModule } from './main/pages/post/news-popular/news-popular.module';
import { NewsLatestModule } from './main/pages/post/news-latest/news-latest.module';
import { EmtiaListModule } from './main/pages/standart-list/emtia-list/emtia-list.module';
import { NewsCategoryBoxModule } from './main/pages/post/news-category-box/news-category-box.module';
import { NewsListModule } from './main/pages/post/news-list/news-list.module';
import { BorsaHisseListModule } from './main/pages/standart-list/borsa-hisse-list/borsa-hisse-list.module';
import { NewsDetailModule } from './main/pages/post/news-detail/news-detail.module';
import { LoginModule } from './main/pages/login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './main/pages/home/home.module';
import { NewsModule } from './main/pages/post/news/news.module';
import { DovizListModule } from './main/pages/standart-list/doviz/doviz-list.module';
import { AltinListModule } from './main/pages/standart-list/altin/altin-list.module';
import { ParitelerListModule } from './main/pages/standart-list/pariteler/pariteler-list.module';
import { CriptoCoinListModule } from './main/pages/standart-list/cripto-coin/cripto-coin-list.module';
import { PostCategoryHeaderModule } from './main/pages/header/post-category-header/post-category-header.module';
import { BorsaLiveListModule } from './main/pages/standart-list/borsa-live-list/borsa-live-list.module';
import { ProfileModule } from './main/pages/profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

export function socialConfigs() {  
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("663168425346-sfp0a6hkhet3tjihp838ne9daioamk9t.apps.googleusercontent.com")
    }
    /* ,
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("Facebook-App-Id")
    } */
  ]);
  
  return config;  
}  

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
    BorsaHisseListModule,
    BorsaLiveListModule,
    NewsListModule,
    PostCategoryHeaderModule,
    NewsCategoryBoxModule,
    EmtiaListModule,
    NewsLatestModule,
    NewsPopularModule,
    RegisterModule,
    ProfileModule,
    BrowserAnimationsModule,
    PostCommentModule,
    SocialLoginModule,

    // Material moment date module
    MatMomentDateModule
  ],
  providers: [
    {
        provide: APP_BASE_HREF, 
        useValue: '/'
    },
    AuthService,  
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }