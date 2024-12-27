import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { FareClass } from './fare-class-model';
import { ConfgService } from '../config-service/confg.service';

@Injectable({
  providedIn: 'root'
})

export class FareClassService {
  constructor(private http: HttpClient, private configService: ConfgService) { 
    this.configService.loadConfig()
      .subscribe((conf) => {
        this.baseURL = conf.apiHost;
      });
  }
  
  baseURL!: string;

  public getEntities(): Observable<FareClass[]> {
    return this.http.get<FareClass[]>(this.baseURL + 'api/fareclasses').pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getEntity(id: number): Observable<FareClass> {
    return this.http.get<FareClass>(this.baseURL + 'api/fareclasses/' + id).pipe(
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
