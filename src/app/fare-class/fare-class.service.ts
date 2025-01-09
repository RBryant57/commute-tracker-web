import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { FareClass } from './fare-class-model';
import { ConfgService } from '../config-service/confg.service';
import { BASE_URL } from '../common/common';

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

  public async addFareClass(fareClass: FareClass) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/fareclasses',
      {
        method: 'POST',
        body: JSON.stringify(fareClass),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as FareClass;

    return response;
  }

  public async deleteFareClass(fareClass: FareClass) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/fareclasses/' + fareClass.id,
      {
        method: 'DELETE',
        body: JSON.stringify(fareClass),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as FareClass;

    return response;
  }

  public getEntities(): Observable<FareClass[]> {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
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

  public async saveFareClass(fareClass: FareClass) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/fareclasses/' + fareClass.id,
      {
        method: 'PUT',
        body: JSON.stringify(fareClass),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as FareClass;

    return response;
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
