import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DelayReason } from './delay-reason-model';
import { DelayReasonService } from './delay-reason.service';

@Component({
  selector: 'app-delay-reason',
  standalone: true,
  templateUrl: './delay-reason.component.html',
  styleUrls: ['./delay-reason.component.css'],
  imports: [CommonModule, RouterModule]
})

export class DelayReasonComponent implements OnInit {
  public entities: DelayReason[];
  public isList: boolean;
  public entityName: string;
  private errorMessage: string;
  private param: Params;

  constructor(private service: DelayReasonService, private route: ActivatedRoute) { }

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
        this.entityName = entity.name
      },
      error => this.errorMessage = <any>error
    );
  }
}
