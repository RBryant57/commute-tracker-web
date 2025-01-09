import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CommuteLeg, CommuteLegRequest } from './commute-model';
import { ConfgService } from '../config-service/confg.service';
import { BASE_URL } from '../common/common';

@Injectable({
  providedIn: 'root'
})

export class CommuteService {
  constructor(private http: HttpClient, private configService: ConfgService) {
    this.configService.loadConfig()
      .subscribe((conf) => {
        this.baseURL = conf.apiHost;
      });
  }

  baseURL!: string;

  public postCommute(leg: CommuteLeg) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    var url = this.baseURL + 'api/CommuteLegs/true';

    const body = JSON.stringify(this.transformCommuteLeg(leg));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
  }

  public postCommuteLeg(leg: CommuteLeg) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    var url = this.baseURL + 'api/CommuteLegs/false';

    const body = JSON.stringify(this.transformCommuteLeg(leg));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return (errorMessage);
  }

  private transformCommuteLeg(commuteLeg: CommuteLeg): CommuteLegRequest {
    var returnVal = new CommuteLegRequest;
    returnVal.Id = commuteLeg.Id;
    returnVal.StartTime = commuteLeg.StartTime;
    returnVal.EndTime = commuteLeg.EndTime;
    returnVal.DestinationId = commuteLeg.Destination.id;
    returnVal.DelayReasonId = commuteLeg.DelayReason.id;
    returnVal.DelaySeconds = commuteLeg.DelaySeconds != null ? commuteLeg.DelaySeconds : 0;
    returnVal.FareClassId = commuteLeg.FareClass.id;
    returnVal.RouteId = commuteLeg.Route.id;
    returnVal.Notes = commuteLeg.Notes;

    return returnVal;

  }
}
