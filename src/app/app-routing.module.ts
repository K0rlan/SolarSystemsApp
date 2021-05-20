import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './all/home/home.component';
import {LoginComponent} from './all/userAuth/login/login.component';
import {ExitOrderGuard} from './exit.order.guard';
import {RegisterComponent} from './all/userAuth/register/register.component';
import {AuthClass} from './auth.guard';
import {ErrorComponent} from './error/error.component';
import {FavoriteListComponent} from './all/favorite-list/favorite-list.component';
import {CatalogComponent} from './all/catalog/catalog.component';
import {OrderComponent} from './all/order/order.component';
import {NewsCatalogComponent} from './all/news-catalog/news-catalog.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent, canDeactivate: [ExitOrderGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'catalog', component: NewsCatalogComponent},
  {path: 'catalog/order', component: OrderComponent, canActivate: [AuthClass]},
  {path: 'favourites', component: FavoriteListComponent, canActivate: [AuthClass]},
  {path: 'categories/:id', canActivate: [AuthClass], loadChildren: () => import('./all/categories/categories.module')
      .then(allModule => allModule.CategoriesModule)},
  {path: 'catalog/categories/:id', canActivate: [AuthClass], loadChildren: () => import('./all/categories/categories.module')
      .then(allModule => allModule.CategoriesModule)},
  {path: 'add', component: CatalogComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
