import { PostCategoryHeaderModule } from './../../header/post-category-header/post-category-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './news.component';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NavigationHeaderModule } from '../../header/navigation-header/navigation-header.module';
import { CurrencyBarModule } from '../../header/currency-bar/currency-bar.module';
import { SliderModule } from '../../slider/slider.module';
import { FooterDolarnetModule } from '../../footer-dolarnet/footer-dolarnet.module';

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
        NavigationHeaderModule,
        CurrencyBarModule,
        SliderModule, 
        FooterDolarnetModule,
        PostCategoryHeaderModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class NewsModule
{
}