import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Destination } from './destination-model';
import { ConfgService } from '../config-service/confg.service';
import { BASE_URL } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  constructor(private http: HttpClient, private configService: ConfgService) {
    this.configService.loadConfig()
      .subscribe((conf) => {
        this.baseURL = conf.apiHost;
      });
  }

  baseURL!: string;

  public async addDestination(destination: Destination) {
    if(this.baseURL == undefined){
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/destinations',
      {
        method: 'POST',
        body: JSON.stringify(destination),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as Destination;

    return response;
  }

  public async deleteDestination(destination: Destination) {
    if(this.baseURL == undefined){
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/destinations/' + destination.id,
      {
        method: 'DELETE',
        body: JSON.stringify(destination),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as Destination;

    return response;
  }

  public getEntities(): Observable<Destination[]> {
    if(this.baseURL == undefined){
      this.baseURL = BASE_URL;
    }
    return this.http.get<Destination[]>(this.baseURL + 'api/destinations').pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getEntity(id: number): Observable<Destination> {
    if(this.baseURL == undefined){
      this.baseURL = BASE_URL;
    }
    return this.http.get<Destination>(this.baseURL + 'api/destinations/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public async saveDestination(destination: Destination) {
    if(this.baseURL == undefined){
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/destinations/' + destination.id,
      {
        method: 'PUT',
        body: JSON.stringify(destination),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as Destination;

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