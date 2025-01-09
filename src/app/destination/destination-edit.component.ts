import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';

import { Destination } from './destination-model';
import { DestinationService } from './destination.service';
import { AlertModule } from "../alert/alert.module";
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-destination-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressBar, AlertModule],
  templateUrl: './destination-edit.component.html',
  styleUrl: './destination-edit.component.css'
})

export class DestinationEditComponent implements OnInit {
  public entity: Destination;
  public isNew: boolean;
  private param: Params;
  private errorMessage: string;

  public entryForm = new FormGroup({
    name: new FormControl(),
    notes: new FormControl()
  })

  constructor(private destinationService: DestinationService, private route: ActivatedRoute, private alertService: AlertService) { }

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

  public addDestination(){
    let newEntity: Destination = {
      id: 0,
      name: this.entryForm.controls['name'].value,
      notes: this.entryForm.controls['notes'].value,
    }

    this.destinationService.addDestination(newEntity);
    this.alertService.success('Destination added.');
  }

  public deleteDestination(){
    this.destinationService.deleteDestination(this.entity);
    this.alertService.success('Destination removed.');
  }

  public saveDestination() {
    this.entity.name = this.entryForm.controls['name'].value;
    this.entity.notes = this.entryForm.controls['notes'].value;

    this.destinationService.saveDestination(this.entity);
    this.alertService.success('Destination saved.');
  }

  private loadEntity(id: number) {
    this.destinationService.getEntity(id).subscribe(
      entity => {
        this.entity = entity;

        this.entryForm.controls['name'].setValue(entity.name);
        this.entryForm.controls['notes'].setValue(entity.notes);
      },
      error => this.errorMessage = <any>error
    );
  }
}