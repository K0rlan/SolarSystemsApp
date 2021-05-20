import {Injectable} from '@angular/core';
import {LoggingService} from './logging.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {News} from '../model/News';

@Injectable()
export class NewsService {
  apiurl = 'http://localhost:3000/';

  private search: string;

  constructor(private loggingService: LoggingService, private http: HttpClient) {
  }

  getSearchText(): string{
    return this.search;
  }
  // tslint:disable-next-line:typedef
  setSearchText(searchText: string){
    this.search = searchText;
  }

  getBreeds(breed: number): Observable<any> {
    return this.http.get<News[]>(`${this.apiurl}news/?categoryId=${breed}`);
  }

  getAllBreeds(): Observable<any> {
    return this.http.get<News[]>(`${this.apiurl}news`);
  }

  getBreedById(id: number): Observable<News>{
    return this.http.get<News>(`${this.apiurl}news/${id}`);
  }

  addNews(pet: News): Observable<any> {
    return this.http.post<any>(`${this.apiurl}news`, pet);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl}basket/${id}`);
  }

  addToFavorite(pet: News): Observable<any> {
    return this.http.post<News>(`${this.apiurl}favorite`, pet);
  }
  getFavorite(): Observable<any> {
    return this.http.get<News[]>(`${this.apiurl}news/?favStatus=true`);
  }

  updatePet(pet: News): Observable<any> {
    return this.http.put<any>(this.apiurl + 'news/' + pet.id , pet);
  }
}
