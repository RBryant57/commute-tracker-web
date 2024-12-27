import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FareClass } from './fare-class-model';
import { FareClassService } from './fare-class.service';

@Component({
  selector: 'app-fare-class',
  standalone: true,
  templateUrl: './fare-class.component.html',
  styleUrls: ['./fare-class.component.css'],
  imports: [CommonModule]
})

export class FareClassComponent implements OnInit {
  public entities: FareClass[];
  public isList: boolean;
  public entityName: string;
  private errorMessage: string;
  private param: Params;

  constructor(private service: FareClassService, private route: ActivatedRoute) { }

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