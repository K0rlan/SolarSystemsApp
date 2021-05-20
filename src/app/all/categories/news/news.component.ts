import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterViewChecked
} from '@angular/core';
import {NewsService} from '../../../services/news.service';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../model/User';
import {News} from '../../../model/News';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-breed',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
// tslint:disable-next-line:max-line-length
export class NewsComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked {
  searchText: string;
  listOfNews: News[];
  user: User  = null;
  newsId: number;
  newsCategory: string;
  private subscription: Subscription;

  constructor(private newsService: NewsService, private activateRoute: ActivatedRoute, private accountService: AuthService) {
    this.subscription = activateRoute.params.subscribe(params => this.newsId = params.id);
    this.user = this.accountService.userValue[0];
  }

  // tslint:disable-next-line:typedef
  ngOnChanges() {
    console.log('ParentComponent:OnChanges');
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log('ParentComponent:OnInit');
    this.getBreedList(this.newsId);
    console.log(this.newsId);
  }

  // tslint:disable-next-line:typedef
  getBreedList(breed: number) {
    this.newsService.getBreeds(breed).subscribe(res => {
      this.listOfNews = res;
      console.log(res);
    });
  }
  // tslint:disable-next-line:typedef
  ngDoCheck() {
    console.log('ParentComponent:DoCheck');
    console.log(this.newsId);
    this.searchText = this.newsService.getSearchText();
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewChecked() {
    console.log('ParentComponent:AfterViewChecked');
  }

}
