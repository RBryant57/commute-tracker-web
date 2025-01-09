import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DelayReason } from './delay-reason-model';
import { ConfgService } from '../config-service/confg.service';
import { BASE_URL } from '../common/common';

@Injectable({
  providedIn: 'root'
})

export class DelayReasonService {
  constructor(private http: HttpClient, private configService: ConfgService) {
    this.configService.loadConfig()
      .subscribe((conf) => {
        this.baseURL = conf.apiHost;
      });
  }

  baseURL!: string;

  public async addDelayReason(delayReason: DelayReason) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/delayreasons',
      {
        method: 'POST',
        body: JSON.stringify(delayReason),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as DelayReason;

    return response;
  }

  public async deleteDelayReason(delayReason: DelayReason) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/delayreasons/' + delayReason.id,
      {
        method: 'DELETE',
        body: JSON.stringify(delayReason),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as DelayReason;

    return response;
  }

  public getEntities(): Observable<DelayReason[]> {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    return this.http.get<DelayReason[]>(this.baseURL + 'api/delayreasons').pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getEntity(id: number): Observable<DelayReason> {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    return this.http.get<DelayReason>(this.baseURL + 'api/delayreasons/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public async saveDelayReason(delayReason: DelayReason) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/delayreasons/' + delayReason.id,
      {
        method: 'PUT',
        body: JSON.stringify(delayReason),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as DelayReason;

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