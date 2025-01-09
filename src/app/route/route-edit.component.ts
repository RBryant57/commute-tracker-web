import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RouteService } from './route.service';
import { RouteType } from '../route-type/route-type-model';
import { Route } from './route-model';
import { RouteTypeService } from '../route-type/route-type.service';
import { AlertModule, AlertService } from '../alert';

@Component({
  selector: 'app-route-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertModule],
  templateUrl: './route-edit.component.html',
  styleUrl: './route-edit.component.css'
})

export class RouteEditComponent implements OnInit {
  public entity: Route;
  public isNew: boolean;
  public routeTypes: RouteType[];
  private param: Params;
  private errorMessage: string;

  public entryForm = new FormGroup({
    name: new FormControl(),
    routeType: new FormControl(),
    routeNumber: new FormControl(),
    miles: new FormControl(),
    notes: new FormControl()
  })

  constructor(private routeService: RouteService, private routeTypeService: RouteTypeService, private route: ActivatedRoute, private alertService: AlertService) { }

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
      this.entryForm.controls['routeType'].setValue(1);
    }

    this.loadRouteTypes();
  }

  public addRoute(){
    let newEntity: Route = {
      id: 0,
      name: this.entryForm.controls['name'].value,
      number: this.entryForm.controls['routeNumber'].value,
      routeType: null,
      miles: this.entryForm.controls['miles'].value,
      notes: this.entryForm.controls['notes'].value,
      type: this.entryForm.controls['routeType'].value
    }

    this.routeService.addRoute(newEntity);
    this.alertService.success('Route added.');
  }

  public deleteRoute(){
    this.routeService.deleteRoute(this.entity);
    this.alertService.success('Route removed.');
  }

  public saveRoute() {
    this.entity.name = this.entryForm.controls['name'].value;
    this.entity.number = this.entryForm.controls['routeNumber'].value;
    this.entity.type = this.entryForm.controls['routeType'].value;
    this.entity.miles = this.entryForm.controls['miles'].value;
    this.entity.notes = this.entryForm.controls['notes'].value;

    this.routeService.saveRoute(this.entity);
    this.alertService.success('Route updated.');
  }

  private loadEntity(id: number) {
    this.routeService.getEntity(id).subscribe(
      entity => {
        this.entity = entity;

        this.entryForm.controls['name'].setValue(entity.name);
        this.entryForm.controls['routeNumber'].setValue(entity.number);
        this.entryForm.controls['routeType'].setValue(entity.type);
        this.entryForm.controls['miles'].setValue(entity.miles);
        this.entryForm.controls['notes'].setValue(entity.notes);
      },
      error => this.errorMessage = <any>error
    );
  }

  private loadRouteTypes() {
    this.routeTypeService.getEntities().subscribe(
      routeTypes => {
        this.routeTypes = routeTypes;
      },
      error => this.errorMessage = <any>error
    );
  }
}