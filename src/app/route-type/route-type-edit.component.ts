import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RouteType } from '../route-type/route-type-model';
import { RouteTypeService } from '../route-type/route-type.service';
import { AlertModule, AlertService } from '../alert';

@Component({
  selector: 'app-route-type-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertModule],
  templateUrl: './route-type-edit.component.html',
  styleUrl: './route-type-edit.component.css'
})

export class RouteTypeEditComponent implements OnInit {
  public entity: RouteType;
  public isNew: boolean;
  private param: Params;
  private errorMessage: string;

  public entryForm = new FormGroup({
    name: new FormControl(),
    notes: new FormControl()
  })

  constructor(private routeTypeService: RouteTypeService, private route: ActivatedRoute, private alertService: AlertService) { }

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

  public addRouteType(){
    let newEntity: RouteType = {
      id: 0,
      name: this.entryForm.controls['name'].value,
      notes: this.entryForm.controls['notes'].value,
    }

    this.routeTypeService.addRouteType(newEntity);
    this.alertService.success('Route Type added.');
  }

  public deleteRouteType(){
    this.routeTypeService.deleteRouteType(this.entity);
    this.alertService.success('Route Type removed.');
  }

  public saveRouteType() {
    this.entity.name = this.entryForm.controls['name'].value;
    this.entity.notes = this.entryForm.controls['notes'].value;

    this.routeTypeService.saveRouteType(this.entity);
    this.alertService.success('Route Type updated.');
  }

  private loadEntity(id: number) {
    this.routeTypeService.getEntity(id).subscribe(
      entity => {
        this.entity = entity;

        this.entryForm.controls['name'].setValue(entity.name);
        this.entryForm.controls['notes'].setValue(entity.notes);
      },
      error => this.errorMessage = <any>error
    );
  }
}