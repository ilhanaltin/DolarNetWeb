import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/pages/home/home.component';
import { LoginComponent } from './main/pages/login/login.component';
import { DovizListComponent } from './main/pages/standart-list/doviz/doviz-list.component';
import { AltinListComponent } from './main/pages/standart-list/altin/altin-list.component';
import { ParitelerListComponent } from './main/pages/standart-list/pariteler/pariteler-list.component';
import { CriptoCoinListComponent } from './main/pages/standart-list/cripto-coin/cripto-coin-list.component';
import { BorsaListComponent } from './main/pages/standart-list/borsa-list/borsa-list.component';
import { NewsComponent } from './main/pages/post/news/news.component';
import { NewsListComponent } from './main/pages/post/news-list/news-list.component';
import { NewsDetailComponent } from './main/pages/post/news-detail/news-detail.component';

const routes: Routes = [
  {
    path     : '',
    component: HomeComponent
  },
  {
    path     : 'login',
    component: LoginComponent
  },
  {
    path     : 'news',
    component: NewsComponent
  },
  {
    path     : 'news-list/:category',
    component: NewsListComponent
  },
  {
    path     : 'news-list',
    component: NewsListComponent
  },
  {
    path     : 'news-detail/:id',
    component: NewsDetailComponent
  },
  {
    path     : 'doviz-list',
    component: DovizListComponent
  }, 
  {
    path     : 'altin-list',
    component: AltinListComponent
  }, 
  {
    path     : 'pariteler-list',
    component: ParitelerListComponent
  },
  {
    path     : 'cripto-coin-list',
    component: CriptoCoinListComponent
  },
  {
    path     : 'borsa-list',
    component: BorsaListComponent
  },
  {
    path     : '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
