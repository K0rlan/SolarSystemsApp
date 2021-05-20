import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from './categories.component';
import {NewsComponent} from './news/news.component';
import {NewsDetailComponent} from '../news-detail/news-detail.component';


const routes: Routes = [
  {
    path: '', component: CategoriesComponent,
    children: [
      {path: '', component: NewsComponent},
    ]
  },
  {path: 'detail/:id', component: NewsDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
