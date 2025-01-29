import { DelayReason } from "../delay-reason/delay-reason-model";
import { Route } from "../route/route-model";

export class PassConditionModel {
}

export class PassCondition {
  Id: number | undefined;
  Date: Date | undefined;
  Minutes: number | undefined;
  UsualMinutes: number | undefined;
  DelayReason: DelayReason | undefined;
  Route: Route | undefined;
  Notes: string | undefined;
}

export class PassConditionRequest {
  Id!: number;
  Date: Date | undefined;
  Minutes: number | undefined;
  UsualMinutes: number | undefined;
  DelayReasonId: number | undefined;
  RouteId: number | undefined;
  Notes!: string;
}
