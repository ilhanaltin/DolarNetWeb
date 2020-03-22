import { BorsaLiveListComponent } from './main/pages/standart-list/borsa-live-list/borsa-live-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/pages/home/home.component';
import { LoginComponent } from './main/pages/login/login.component';
import { DovizListComponent } from './main/pages/standart-list/doviz/doviz-list.component';
import { AltinListComponent } from './main/pages/standart-list/altin/altin-list.component';
import { ParitelerListComponent } from './main/pages/standart-list/pariteler/pariteler-list.component';
import { CriptoCoinListComponent } from './main/pages/standart-list/cripto-coin/cripto-coin-list.component';
import { NewsComponent } from './main/pages/post/news/news.component';
import { NewsListComponent } from './main/pages/post/news-list/news-list.component';
import { NewsDetailComponent } from './main/pages/post/news-detail/news-detail.component';
import { BorsaHisseListComponent } from './main/pages/standart-list/borsa-hisse-list/borsa-hisse-list.component';
import { EmtiaListComponent } from './main/pages/standart-list/emtia-list/emtia-list.component';
import { RegisterComponent } from './main/pages/register/register.component';
import { ProfileComponent } from './main/pages/profile/profile.component';
import { AuthGuard } from './main/services/auth-guard.service';
import { CurrencyGraphComponent } from './main/pages/graphs/currency/currency-graph/currency-graph.component';

const routes: Routes = [
  {
    path     : 'login',
    component: LoginComponent
  },
  {
    path     : 'register',
    component: RegisterComponent
  },
  {
    path     : 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'doviz-graph/:code',
    component: CurrencyGraphComponent
  },
  {
    path     : 'news',
    component: NewsComponent
  },
  {
    path     : 'news/:category/:categoryname',
    component: NewsListComponent
  },
  {
    path     : ':title/:id',
    component: NewsDetailComponent
  },
  {
    path     : 'doviz',
    component: DovizListComponent
  }, 
  {
    path     : 'altin',
    component: AltinListComponent
  }, 
  {
    path     : 'pariteler',
    component: ParitelerListComponent
  },
  {
    path     : 'cripto-coin',
    component: CriptoCoinListComponent
  },
  {
    path     : 'borsa-hisse',
    component: BorsaHisseListComponent
  },
  {
    path     : 'borsa-live',
    component: BorsaLiveListComponent
  },
  {
    path     : 'emtialar',
    component: EmtiaListComponent
  },  
  {
    path     : '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
