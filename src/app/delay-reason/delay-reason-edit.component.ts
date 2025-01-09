import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';

import { DelayReason } from './delay-reason-model';
import { DelayReasonService } from './delay-reason.service';
import { AlertModule } from "../alert/alert.module";
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-delay-reason-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressBar, AlertModule],
  templateUrl: './delay-reason-edit.component.html',
  styleUrl: './delay-reason-edit.component.css'
})

export class DelayReasonEditComponent implements OnInit {
  public entity: DelayReason;
  public isNew: boolean;
  private param: Params;
  private errorMessage: string;

  public entryForm = new FormGroup({
    name: new FormControl(),
    notes: new FormControl()
  })

  constructor(private delayReasonService: DelayReasonService, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params;
    });

    if (!!this.param['id']) {
      this.loadEntity(this.param['id']);
      this.isNew = false;
    }
    else {
      this.isNew = true;
    }
  }

  public addDelayReason(){
    let newEntity: DelayReason = {
      id: 0,
      name: this.entryForm.controls['name'].value,
      notes: this.entryForm.controls['notes'].value,
    }

    this.delayReasonService.addDelayReason(newEntity);
    this.alertService.success('Delay Reason added.');
  }

  public deleteDelayReason(){
    this.delayReasonService.deleteDelayReason(this.entity);
    this.alertService.success('Delay Reason removed.');
  }

  public saveDelayReason() {
    this.entity.name = this.entryForm.controls['name'].value;
    this.entity.notes = this.entryForm.controls['notes'].value;

    this.delayReasonService.saveDelayReason(this.entity);
    this.alertService.success('Delay Reason saved.');
  }

  private loadEntity(id: number) {
    this.delayReasonService.getEntity(id).subscribe(
      entity => {
        this.entity = entity;

        this.entryForm.controls['name'].setValue(entity.name);
        this.entryForm.controls['notes'].setValue(entity.notes);
      },
      error => this.errorMessage = <any>error
    );
  }
}