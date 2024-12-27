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
  DelayReasonId: number | undefined;
  Route: Route | undefined;
  RouteId: number | undefined;
  Notes: string | undefined;
}
