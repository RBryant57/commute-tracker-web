import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RouteType } from './route-type-model';
import { RouteTypeService } from './route-type.service';

@Component({
  selector: 'app-routetype',
  standalone: true,
  templateUrl: './route-type.component.html',
  styleUrls: ['./route-type.component.css'],
  imports: [CommonModule, RouterModule]
})

export class RouteTypeComponent implements OnInit {
  public entities: RouteType[];
  public isList: boolean;
  public entityName: string;
  private errorMessage: string;
  private param: Params;

  constructor(private service: RouteTypeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params;
    });

    if (!!this.param['id']) {
      this.loadEntity(this.param['id']);
      this.isList = false;
    }
    else {
      this.loadEntities();
      this.isList = true;
    }
  }

  private loadEntities() {
    this.service.getEntities().subscribe(
      entities => {
        this.entities = entities;
      },
      error => this.errorMessage = <any>error
    );
  }

  private loadEntity(id: number) {
    this.service.getEntity(id).subscribe(
      entity => {
        this.entities = new Array(entity);
        this.entityName = entity.name;
      },
      error => this.errorMessage = <any>error
    );
  }

}