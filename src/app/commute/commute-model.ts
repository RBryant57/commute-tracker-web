import { DelayReason } from "../delay-reason/delay-reason-model";
import { Destination } from "../destination/destination-model";
import { FareClass } from "../fare-class/fare-class-model";
import { Route } from "../route/route-model";

export class CommuteModel {
}

export class Commute {
  Id: number | undefined;
  StartTime: Date | undefined;
  EndTime!: Date;
  Destination!: Destination;
  DesinationId: number;
  DelaySeconds!: number;
  CommuteLegModels!: CommuteLeg[];
  Notes!: string;
}

export class CommuteLeg {
  Id!: number;
  StartTime!: Date;
  EndTime!: Date;
  Destination!: Destination;
  DestinationId: number;
  DelayReason!: DelayReason;
  DelayReasonId: number;
  DelaySeconds!: number;
  FareClass!: FareClass;
  FareClassId: number;
  Route!: Route;
  RouteId: number;
  Commute!: Commute;
  CommuteId!: number;
  Notes!: string;
}

export class CommuteLegRequest {
  Id!: number;
  StartTime!: Date;
  EndTime!: Date;
  DestinationId!: number;
  DelayReasonId!: number;
  DelaySeconds!: number;
  FareClassId!: number;
  RouteId!: number;
  CommuteId!: number;
  Notes!: string;
}