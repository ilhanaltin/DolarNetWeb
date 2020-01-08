import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CriptoCoinListComponent } from './cripto-coin-list.component';
import { NavigationHeaderModule } from '../../header/navigation-header/navigation-header.module';
import { CurrencyBarModule } from '../../header/currency-bar/currency-bar.module';
import { FooterDolarnetModule } from '../../footer-dolarnet/footer-dolarnet.module';
import { ConverterModule } from '../../converter/converter.module';

@NgModule({
    declarations   : [
        CriptoCoinListComponent        
    ],
    imports        : [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        NavigationHeaderModule,
        CurrencyBarModule,
        FooterDolarnetModule,
        ConverterModule
    ],
    providers      : [
    ],
    entryComponents: [
    ]
})

export class CriptoCoinListModule
{
}