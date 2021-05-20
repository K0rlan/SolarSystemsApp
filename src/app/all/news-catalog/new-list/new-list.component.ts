import {Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges, DoCheck} from '@angular/core';
import {News} from '../../../model/News';
import {NewsService} from '../../../services/news.service';
import {LoggingService} from '../../../services/logging.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit, DoCheck {

  @Input() list;
  news: News;
  text;
  private changengeLog: any;

  constructor() {
  }

  @Output() newLikeEvent = new EventEmitter<string>();
  today: number = Date.now();

  ngOnInit(): void {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
  }

  // tslint:disable-next-line:typedef
  ngDoCheck() {
  }
}
