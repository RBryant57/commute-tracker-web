import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ConfgService } from '../config-service/confg.service';
import { Route } from './route-model';
import { BASE_URL } from '../common/common';

@Injectable({
  providedIn: 'root'
})

export class RouteService {
  constructor(private http: HttpClient, private configService: ConfgService) {
    this.configService.loadConfig()
      .subscribe((conf) => {
        this.baseURL = conf.apiHost;
      });
  }

  baseURL!: string;

  public async addRoute(route: Route) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/routes',
      {
        method: 'POST',
        body: JSON.stringify(route),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as Route;

    return response;
  }

  public async deleteRoute(route: Route) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/routes/' + route.id,
      {
        method: 'DELETE',
        body: JSON.stringify(route),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as Route;

    return response;
  }

  public getEntities(): Observable<Route[]> {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    return this.http.get<Route[]>(this.baseURL + 'api/routes').pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getEntity(id: number): Observable<Route> {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    return this.http.get<Route>(this.baseURL + 'api/routes/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public async saveRoute(route: Route) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/routes/' + route.id,
      {
        method: 'PUT',
        body: JSON.stringify(route),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as Route;

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