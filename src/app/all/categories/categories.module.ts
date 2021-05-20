import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesRoutingModule} from './categories-routing.module';
import { NewsComponent } from './news/news.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SummaryPipe} from '../../summary.pipe';

@NgModule({
  declarations: [NewsComponent, SummaryPipe],
  exports: [
    SummaryPipe
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule
  ]
})
export class CategoriesModule { }
