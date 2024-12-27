import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppConfig } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class ConfgService {

  constructor(private http: HttpClient) { }

  loadConfig(){
    return this.http.get<AppConfig>('./assets/appSettings.json');
  }
}
