import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ConfgService } from '../config-service/confg.service';
import { RouteType } from './route-type-model';
import { BASE_URL } from '../common/common';

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

  public async addRouteType(routeType: RouteType) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/routetypes',
      {
        method: 'POST',
        body: JSON.stringify(routeType),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as RouteType;

    return response;
  }

  public async deleteRouteType(routeType: RouteType) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/routetypes/' + routeType.id,
      {
        method: 'DELETE',
        body: JSON.stringify(routeType),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as RouteType;

    return response;
  }

  public getEntities(): Observable<RouteType[]> {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    return this.http.get<RouteType[]>(this.baseURL + 'api/routetypes').pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getEntity(id: number): Observable<RouteType> {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    return this.http.get<RouteType>(this.baseURL + 'api/routetypes/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public async saveRouteType(routeType: RouteType) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    const response = await fetch(
      this.baseURL + 'api/routetypes/' + routeType.id,
      {
        method: 'PUT',
        body: JSON.stringify(routeType),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
    );
    if (!response.ok) {
      console.log('ex: ' + response.status);
    }
    const result = (await response.json()) as RouteType;

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