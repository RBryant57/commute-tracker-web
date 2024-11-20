import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteType } from './route-type-model';
import { RouteTypeService } from './route-type.service';

@Component({
  selector: 'app-routetype',
  templateUrl: './route-type.component.html',
  styleUrls: ['./route-type.component.css']
})
export class RouteTypeComponent implements OnInit {
  public entities: RouteType[];
  private errorMessage: string;

  constructor(private service: RouteTypeService, private route: ActivatedRoute) { }

  ngOnInit() {
    var param;
    this.route.params.subscribe(params => {
      param = params;
    });

    if (!!param.id) {
      this.loadEntity(param.id);
    }
    else {
      this.loadEntities();
      console.log(this.entities);
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
      },
      error => this.errorMessage = <any>error
    );
  }

}
