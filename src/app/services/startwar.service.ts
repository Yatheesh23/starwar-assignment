import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartwarService {


  constructor(private http: HttpClient) { }

  getData(api): Observable<any> {
    return this.http.get(api);
  }
  getFilmData(filmUrl: string): Observable<any> {
    return this.http.get(filmUrl);
  }


}
