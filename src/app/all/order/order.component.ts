import { Component, OnInit } from '@angular/core';
import {ComponentCanDeactivate} from '../../exit.order.guard';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/User';
import {News} from '../../model/News';
import {NewsService} from '../../services/news.service';
import {LoggingService} from '../../services/logging.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [NewsService, LoggingService]
})
export class OrderComponent implements OnInit, ComponentCanDeactivate {

 user: User  = null;
 saved = false;
 model: News;
 categoryName: string;
 id: number;

  constructor(private accountService: AuthService, private newsService: NewsService) {
    this.user = this.accountService.userValue[0];
  }

  orderForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    information: new FormControl('', [Validators.required]),
  });

  // tslint:disable-next-line:typedef
  get name(){
    return this.orderForm.get('name');
  }
  // tslint:disable-next-line:typedef
  get image(){
    return this.orderForm.get('image');
  }
  // tslint:disable-next-line:typedef
  get category(){
    return this.orderForm.get('category');
  }
  // tslint:disable-next-line:typedef
  get information(){
    return this.orderForm.get('information');
  }
  // tslint:disable-next-line:typedef
  save(){
    this.saved = true;
    this.prepareModel();
  }

  ngOnInit(): void {
    this.newsService.getAllBreeds().subscribe(res => {
      this.id = res.length + 1;
    });
  }

  // tslint:disable-next-line:typedef
  prepareModel() {
    // tslint:disable-next-line:triple-equals
    if (this.orderForm.getRawValue().category == '1') {
      this.categoryName = 'Politics';
      // tslint:disable-next-line:triple-equals
    } else if (this.orderForm.getRawValue().category == '2') {
      this.categoryName = 'Science';
      // tslint:disable-next-line:triple-equals
    } else if (this.orderForm.getRawValue().category == '3') {
      this.categoryName = 'Sport';
    }
    this.model = new News(this.id, this.orderForm.getRawValue().category, this.categoryName,
      this.orderForm.getRawValue().name, this.orderForm.getRawValue().image, this.orderForm.getRawValue().image,
      this.orderForm.getRawValue().image,
      this.orderForm.getRawValue().information);

    this.newsService.addNews(this.model).subscribe(data => console.log(data), error => console.log(error));
  }


  canDeactivate(): boolean | Observable<boolean> {
    if (!this.saved){
      return confirm('You didn\'t complete the order. Leave the page?');
    }else{
      return true;
    }
  }

  order(): any {
    alert('Order successfully accepted! Please, wait.');
  }
}
