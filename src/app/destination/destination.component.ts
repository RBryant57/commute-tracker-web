import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Destination } from './destination-model'
import { DestinationService } from './destination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination',
  standalone: true,
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css'],
  imports: [CommonModule]
})
export class DestinationComponent implements OnInit {
  public entities: Destination[] | undefined;
  public isList: boolean;
  public entityName: string;
  private errorMessage: string | undefined;
  private param: Params;

  constructor(private service: DestinationService, private route: ActivatedRoute) { }

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