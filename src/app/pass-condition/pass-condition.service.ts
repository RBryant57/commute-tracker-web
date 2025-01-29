import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PassCondition, PassConditionRequest } from './pass-condition-model';
import { ConfgService } from '../config-service/confg.service';
import { BASE_URL } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class PassConditionService {
  constructor(private http: HttpClient, private configService: ConfgService) {
    this.configService.loadConfig()
      .subscribe((conf) => {
        this.baseURL = conf.apiHost;
      });
  }

  baseURL!: string;

  public postPassCondition(passCondition: PassCondition) {
    if (this.baseURL == undefined) {
      this.baseURL = BASE_URL;
    }
    var url = this.baseURL + 'api/PassConditions';

    const body = JSON.stringify(this.transformPassCondition(passCondition));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
  }

    private transformPassCondition(passCondition: PassCondition): PassConditionRequest {
      var returnVal = new PassConditionRequest;
      returnVal.Id = passCondition.Id;
      returnVal.Date = passCondition.Date;
      returnVal.Minutes = passCondition.Minutes;
      returnVal.UsualMinutes = passCondition.UsualMinutes;
      returnVal.DelayReasonId = passCondition.DelayReason.id;
      returnVal.RouteId = passCondition.Route.id;
      returnVal.Notes = passCondition.Notes;
  
      return returnVal;
  
    }

}
