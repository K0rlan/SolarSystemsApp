import {Component, Input, OnChanges, OnInit, SimpleChanges, DoCheck} from '@angular/core';
import {News} from '../../model/News';
import {User} from '../../model/User';
import {NewsService} from '../../services/news.service';
import {AuthService} from '../../services/auth.service';
import {LoggingService} from '../../services/logging.service';

@Component({
  selector: 'app-news-catalog',
  templateUrl: './news-catalog.component.html',
  styleUrls: ['./news-catalog.component.css'],
  providers: [NewsService, LoggingService]
})
export class NewsCatalogComponent implements OnInit, DoCheck {

  list: any;
  news: News;
  user: User;
  saved = false;
  searchText: string;

  constructor(private newsService: NewsService, private accountService: AuthService) {
    this.user = this.accountService.userValue[0];
  }

  ngOnInit(): void {
    this.newsService.getAllBreeds().subscribe(res => {
      this.list = res;
      console.log(res);
    });
    console.log(this.user.email);
  }

  // tslint:disable-next-line:typedef
  addItem($event: any) {
    window.location.reload();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
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
  save() {
    this.saved = true;
  }
}
