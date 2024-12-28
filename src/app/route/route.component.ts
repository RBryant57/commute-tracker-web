import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Route } from './route-model';
import { RouteService } from './route.service';

@Component({
  standalone: true,
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
  imports: [CommonModule, RouterModule]
})

export class RouteComponent implements OnInit {
  public entities: Route[] | undefined;
  public isList: boolean;
  public entityName: string;
  public entityId: number;
  private errorMessage: string | undefined;
  private param: Params;

  constructor(private service: RouteService, private route: ActivatedRoute) { }

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
        this.entityId = entity.id;
      },
      error => this.errorMessage = <any>error
    );
  }

}
