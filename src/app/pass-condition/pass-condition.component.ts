import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Route } from '../route/route-model';
import { RouteService } from '../route/route.service';
import { DelayReason } from '../delay-reason/delay-reason-model';
import { DelayReasonService } from '../delay-reason/delay-reason.service';
import { PassCondition } from './pass-condition-model';
import { AlertService } from '../alert/alert.service';
import { PassConditionService } from './pass-condition.service';
import { AlertModule } from "../alert/alert.module";

@Component({
  selector: 'app-pass-condition',
  templateUrl: './pass-condition.component.html',
  styleUrls: ['./pass-condition.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgbModule, AlertModule, CommonModule]
})

export class PassConditionComponent implements OnInit {
  public passConditionForm: FormGroup;
  public routes: Route[] | undefined;
  public selectedRoute: Route | undefined;
  public delayReasons: DelayReason[] | undefined;
  public selectedDelayReason: DelayReason | undefined;
  public time: string | undefined;
  private errorMessage: string | undefined;


  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  constructor(private passConditionService: PassConditionService, private routeService: RouteService, private delayReasonService: DelayReasonService, private alertService: AlertService) {
    this.passConditionForm = this.createFormGroup();
  }

  ngOnInit() {
    this.loadRoutes();
    this.loadDelayReasons();
  }

  createFormGroup() {
    return new FormGroup({
      date: new FormControl(),
      time: new FormControl(),
      minutes: new FormControl(),
      usualMinutes: new FormControl(),
      delayReasonName: new FormControl(),
      delaySeconds: new FormControl(),
      route: new FormControl(),
      notes: new FormControl()
    });
  }

  public markTime() {
    var newDate = new Date();
    var hours = newDate.getHours().toString().length == 1 ? '0' + newDate.getHours() : newDate.getHours();
    var minutes = newDate.getMinutes().toString().length == 1 ? '0' + newDate.getMinutes() : newDate.getMinutes();
    var seconds = newDate.getSeconds().toString().length == 1 ? '0' + newDate.getSeconds() : newDate.getSeconds();
    this.passConditionForm.controls['time'].setValue(hours + ':' + minutes + ':' + seconds);
  }

  public addPassCondition() {
    var passCondition = new PassCondition();

    var date = this.passConditionForm.controls['date'].value;
    var time = this.passConditionForm.controls['time'].value;
    var startHours = time.slice(0, 2);
    var startMinutes = time.slice(3, 5);
    var startSeconds = time.slice(6, 8);

    passCondition.Date = new Date(date.year, (date.month - 1), date.day, (startHours - 7), startMinutes, startSeconds);
    passCondition.DelayReason = this.passConditionForm.controls['delayReasonName'].value;
    passCondition.Route = this.passConditionForm.controls['route'].value
    passCondition.Minutes = this.passConditionForm.controls['minutes'].value;
    passCondition.UsualMinutes = this.passConditionForm.controls['usualMinutes'].value;

    this.passConditionService.postPassCondition(passCondition)
      .subscribe(result => {
        this.alertService.success('Pass condition successfully added.');
        this.clearForm();
      }, error => {
          console.log(error);
        this.alertService.error('Pass condition was not successfully added.');
      });
  }

  private loadRoutes() {
    this.routeService.getEntities().subscribe(
      routes => {
        this.routes = routes;
      },
      error => this.errorMessage = <any>error
    );
  }

  private loadDelayReasons() {
    this.delayReasonService.getEntities().subscribe(
      entities => {
        this.delayReasons = entities;
        this.delayReasons.sort((n1, n2) => {
          if (n1.id > n2.id) { return 1; }
          if (n1.id < n2.id) { return -1; }
          return 0;
        });
      },
      error => this.errorMessage = <any>error
    );
  }

  private clearForm() {
    this.passConditionForm.controls['date'].setValue('');
    this.passConditionForm.controls['time'].setValue('');
    this.passConditionForm.controls['minutes'].setValue('');
    this.passConditionForm.controls['usualMinutes'].setValue('');
    this.passConditionForm.controls['delayReasonName'].setValue('');
    this.passConditionForm.controls['route'].setValue('');
  }
}
