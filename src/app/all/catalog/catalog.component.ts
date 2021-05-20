import {Component, DoCheck, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {LoggingService} from '../../services/logging.service';
import {News} from '../../model/News';
import {User} from '../../model/User';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [NewsService, LoggingService]
})
export class CatalogComponent implements OnInit, DoCheck {

  listOfNews: News[];
  news: News;
  searchText: string;
  user: User;
  saved = false;
  constructor(private newsService: NewsService, private accountService: AuthService) {
    this.user = this.accountService.userValue[0];
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log('CategoryComponent:OnInit');
    // this.getUserList();
    this.newsService.getAllBreeds().subscribe(res => {
      this.listOfNews = res;
      console.log(res);
    });
  }

  // tslint:disable-next-line:typedef
  ngDoCheck() {
    console.log('CategoryComponent:DoCheck');
    this.newsService.setSearchText(this.searchText);
  }

  // tslint:disable-next-line:typedef
  search(searchText: string) {
    this.newsService.setSearchText(searchText);
  }

  // tslint:disable-next-line:typedef
  save(){
    this.saved = true;
  }

}
