import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PassCondition } from './pass-condition-model';
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

    const body = JSON.stringify(passCondition);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
  }

}
