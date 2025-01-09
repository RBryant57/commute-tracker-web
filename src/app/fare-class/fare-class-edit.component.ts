import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';

import { FareClass } from './fare-class-model';
import { FareClassService } from './fare-class.service';
import { AlertModule } from "../alert/alert.module";
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-fare-class-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressBar, AlertModule],
  templateUrl: './fare-class-edit.component.html',
  styleUrl: './fare-class-edit.component.css'
})

export class FareClassEditComponent implements OnInit {
  public entity: FareClass;
  public isNew: boolean;
  private param: Params;
  private errorMessage: string;

  public entryForm = new FormGroup({
    name: new FormControl(),
    notes: new FormControl()
  })

  constructor(private fareClassService: FareClassService, private route: ActivatedRoute, private alertService: AlertService) { }

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

  public addFareClass(){
    let newEntity: FareClass = {
      id: 0,
      name: this.entryForm.controls['name'].value,
      notes: this.entryForm.controls['notes'].value,
    }

    this.fareClassService.addFareClass(newEntity);
    this.alertService.success('Fare Class added.');
  }

  public deleteFareClass(){
    this.fareClassService.deleteFareClass(this.entity);
    this.alertService.success('Fare Class removed.');
  }

  public saveFareClass() {
    this.entity.name = this.entryForm.controls['name'].value;
    this.entity.notes = this.entryForm.controls['notes'].value;

    this.fareClassService.saveFareClass(this.entity);
    this.alertService.success('Fare Class saved.');
  }

  private loadEntity(id: number) {
    this.fareClassService.getEntity(id).subscribe(
      entity => {
        this.entity = entity;

        this.entryForm.controls['name'].setValue(entity.name);
        this.entryForm.controls['notes'].setValue(entity.notes);
      },
      error => this.errorMessage = <any>error
    );
  }
}