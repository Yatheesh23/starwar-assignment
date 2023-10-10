import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://swapi.dev/api/films/'
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private characterData: any;
  constructor(private http: HttpClient) { }

  fetchInitialData(url: string): void {
    this.http.get<any>(url).subscribe(data => {
      this.dataSubject.next(data);
    });
  }

  getData(url: string): Observable<any> {
    this.fetchInitialData(url); 
    return this.dataSubject.asObservable();
  }

  setData(data: any): void {
    this.dataSubject.next(data);
  }

 
 
  getFilmData(filmUrl: string): Observable<any> {
    return this.http.get(filmUrl);
  }


  getCharacterName(characterUrl: string): Observable<any> {
    return this.http.get(characterUrl);
  }


}
