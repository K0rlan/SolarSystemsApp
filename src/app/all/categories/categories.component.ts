import {
  Component, DoCheck,
  OnInit
} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {LoggingService} from '../../services/logging.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/User';
import {News} from '../../model/News';

class Breed {
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [NewsService, LoggingService]
})
// tslint:disable-next-line:max-line-length
export class CategoriesComponent implements OnInit, DoCheck {

  pet: News;
  searchText: string;
  user: User;

  constructor(private newsService: NewsService, private accountService: AuthService) {
    this.user = this.accountService.userValue[0];
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log('CategoryComponent:OnInit');
    // this.getUserList();
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
}
