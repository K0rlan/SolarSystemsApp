import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NewsService} from '../../services/news.service';
import {first} from 'rxjs/operators';
import {User} from '../../model/User';
import {Liked, News} from '../../model/News';
import {LoggingService} from '../../services/logging.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
  providers: [NewsService, LoggingService]
})
export class FavoriteListComponent implements OnInit {
  user: User = null;

  constructor(private accountService: AuthService, private newsService: NewsService) {
    this.user = this.accountService.userValue[0];
  }

  ngOnInit(): void {
  }

  changeFav(news: News): any {
    this.user.favList = this.user.favList.filter(item => item !== news);
    this.newsService.updatePet(news).subscribe(data => console.log(data), error => console.log(error));
    this.accountService.update(this.user).subscribe(data => console.log(data), error => console.log(error));
  }
}
