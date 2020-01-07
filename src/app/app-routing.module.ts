import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/pages/home/home.component';
import { LoginComponent } from './main/pages/login/login.component';
import { NewsComponent } from './main/pages/news/news.component';
import { NewsDetailComponent } from './main/pages/news-detail/news-detail.component';

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
    path     : 'news-detail/:id',
    component: NewsDetailComponent
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
