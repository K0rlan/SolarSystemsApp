import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {AppComponent} from './app.component';
import {NavComponent} from './static/nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './all/home/home.component';
import {FooterComponent} from './static/footer/footer.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './all/userAuth/login/login.component';
import {ExitOrderGuard} from './exit.order.guard';
import {AuthService} from './services/auth.service';
import {AuthClass} from './auth.guard';
import {ErrorComponent} from './error/error.component';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './all/userAuth/register/register.component';
import { NavAuthComponent } from './static/nav-auth/nav-auth.component';
import {CategoriesComponent} from './all/categories/categories.component';
import {NewsDetailComponent} from './all/news-detail/news-detail.component';
import {FavoriteListComponent} from './all/favorite-list/favorite-list.component';
import { CatalogComponent } from './all/catalog/catalog.component';
import {CategoriesModule} from './all/categories/categories.module';
import {OrderComponent} from './all/order/order.component';
import {NewsCatalogComponent} from './all/news-catalog/news-catalog.component';
import {AddNewComponent} from './all/news-catalog/add-new/add-new.component';
import {NewListComponent} from './all/news-catalog/new-list/new-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    NavAuthComponent,
    CategoriesComponent,
    NewsDetailComponent,
    FavoriteListComponent,
    CatalogComponent,
    OrderComponent,
    NewsCatalogComponent,
    AddNewComponent,
    NewListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    CategoriesModule,

  ],
  providers: [ExitOrderGuard,
    AuthService,
    AuthClass],
  bootstrap: [AppComponent]
})
export class AppModule {
}
