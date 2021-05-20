import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';
import {User} from '../../model/User';
import {Comments, Liked, News} from '../../model/News';
import {NewsService} from '../../services/news.service';
import {LoggingService} from '../../services/logging.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-pet-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  providers: [NewsService, LoggingService, DatePipe]
})
export class NewsDetailComponent implements OnInit {
  num: number;
  private subscription: Subscription;
  user: User;
  news: News;
  liked: Liked;
  favStatus = false;
  hideComment = true;
  hideBTN = false;

  constructor(private newsService: NewsService, private activateRoute: ActivatedRoute,
              private accountService: AuthService, private router: Router, public datepipe: DatePipe) {
    this.subscription = activateRoute.params.subscribe(params => this.num = params.id);
    this.user = this.accountService.userValue[0];
  }

  ngOnInit(): void {
    console.log(this.num);
    this.getBreedById(this.num);
    console.log(this.user.name);
    // console.log(this.pet.name);
  }

  // tslint:disable-next-line:typedef
  getBreedById(id: number) {
    this.newsService.getBreedById(id).subscribe(data => {
      console.log(data);
      this.news = data;
      console.log(this.news.name);
      console.log(this.user.name);
    });
  }

  // tslint:disable-next-line:typedef
  changeCommentVissiblity() {
    this.hideBTN = !this.hideBTN;
    this.hideComment = !this.hideComment;
  }

  // tslint:disable-next-line:typedef
  getUserLiked() {
    for (const liked of this.news.liked) {
      if (liked.likedUser === this.user.email && liked.likeStatus) {
        return true;
      }
    }
    return false;
  }

  // tslint:disable-next-line:typedef
  getFavStatus() {
    for (const fav of this.user.favList) {
      if (fav.id === this.news.id) {
        this.favStatus = true;
        return true;
      }
    }
    return false;
  }

  // tslint:disable-next-line:typedef
  formatDate(date) {
    // tslint:disable-next-line:one-variable-per-declaration prefer-const
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      // tslint:disable-next-line:prefer-const
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  // tslint:disable-next-line:typedef
  addComment(commentText: string) {
    const comment = new Comments();
    comment.commentText = commentText;
    comment.userName = this.user.name;
    comment.userEmail = this.user.email;
    const koko = new Date();
    comment.date = (koko.getDate() + '.' + koko.getMonth() + '.' + koko.getFullYear()
      + ' ' + koko.getHours() + ':' + koko.getMinutes());
    this.news.comments.push(comment);
    this.accountService.update(this.user).subscribe(data => console.log(data.favList), error => console.log(error));
    this.newsService.updatePet(this.news).subscribe(data => console.log(data.name), error => console.log(error));
    this.changeCommentVissiblity();
  }

  changeFav(): any {
    this.favStatus = !this.favStatus;
    // tslint:disable-next-line:prefer-for-of
    if (this.favStatus === true) {
      this.user.favList.push(this.news);
      this.newsService.updatePet(this.news).subscribe(data => console.log(data), error => console.log(error));
      this.accountService.update(this.user)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            alert('error');
          });
    } else {
      this.user.favList = this.user.favList.filter(item => item.id !== this.news.id);
      this.accountService.update(this.user).subscribe(data => console.log(data.favList), error => console.log(error));
      this.newsService.updatePet(this.news).subscribe(data => console.log(data.name), error => console.log(error));
    }
  }

  changeLike(): any {
    for (const liked of this.news.liked) {
      if (this.user.email === liked.likedUser) {
        this.liked = liked;
      }
    }
    if (this.liked === undefined) {
      this.liked = new Liked();
    }
    console.log(this.liked);
    this.liked.likeStatus = !this.liked.likeStatus;
    // tslint:disable-next-line:prefer-for-of
    if (this.liked.likeStatus === true) {
      this.news.likes = this.news.likes + 1;
      this.liked.likedUser = this.user.email;
      this.news.liked.push(this.liked);
      this.accountService.update(this.user).subscribe(data => console.log(data.favList), error => console.log(error));
      this.newsService.updatePet(this.news).subscribe(data => console.log(data.name), error => console.log(error));
    } else {
      this.news.likes = this.news.likes - 1;
      this.liked.likedUser = '';
      this.news.liked = this.news.liked.filter(item => item.likedUser !== this.liked.likedUser);
      this.accountService.update(this.user).subscribe(data => console.log(data.favList), error => console.log(error));
      this.newsService.updatePet(this.news).subscribe(data => console.log(data.name), error => console.log(error));
    }
  }
}
