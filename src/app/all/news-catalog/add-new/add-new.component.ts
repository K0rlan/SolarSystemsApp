import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../model/User';
import {News} from '../../../model/News';
import {AuthService} from '../../../services/auth.service';
import {NewsService} from '../../../services/news.service';
import {LoggingService} from '../../../services/logging.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ComponentCanDeactivate} from '../../../exit.order.guard';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css'],
  providers: [NewsService, LoggingService]
})
export class AddNewComponent implements OnInit, ComponentCanDeactivate {
  user: User  = null;
  saved = false;
  model: News;
  categoryName: string;
  id: number;
  closeResult = '';

  constructor(private modalService: NgbModal, private accountService: AuthService, private newsService: NewsService) {
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
    this.addNewItem();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  @Output() newItemEvent = new EventEmitter<any>();
  // tslint:disable-next-line:typedef
  addNewItem()  {
    this.newItemEvent.emit();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.newsService.getAllBreeds().subscribe(res => {
      this.id = res.length + 1;
    });
  }

  // tslint:disable-next-line:typedef
  isHiden() {
    if (this.user.role === 'admin') {
      return false;
    }
    return true;
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
