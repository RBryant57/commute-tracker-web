import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ConfgService } from '../config-service/confg.service';
import { RouteType } from './route-type-model';

@Injectable({
  providedIn: 'root'
})

export class RouteTypeService {
  constructor(private http: HttpClient, private configService: ConfgService) { 
    this.configService.loadConfig()
      .subscribe((conf) => {
        this.baseURL = conf.apiHost;
      });
  }
  
  baseURL!: string;

  public getEntities(): Observable<RouteType[]> {
    return this.http.get<RouteType[]>(this.baseURL + 'api/routetypes').pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getEntity(id: number): Observable<RouteType> {
    return this.http.get<RouteType>(this.baseURL + 'api/routetypes/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}