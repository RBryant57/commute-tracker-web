import { Routes } from '@angular/router';
import { CommuteComponent } from './commute/commute.component';
import { PassConditionComponent } from './pass-condition/pass-condition.component';
import { RouteComponent } from './route/route.component';
import { DelayReasonComponent } from './delay-reason/delay-reason.component';
import { DestinationComponent } from './destination/destination.component';
import { FareClassComponent } from './fare-class/fare-class.component';
import { RouteTypeComponent } from './route-type/route-type.component';
import { HomeComponent } from './home/home.component';
import { RouteEditComponent } from './route/route-edit.component';
import { RouteTypeEditComponent } from './route-type/route-type-edit.component';
import { DelayReasonEditComponent } from './delay-reason/delay-reason-edit.component';
import { DestinationEditComponent } from './destination/destination-edit.component';
import { FareClassEditComponent } from './fare-class/fare-class-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'commute', component: CommuteComponent },
    { path: 'passcondition', component: PassConditionComponent },
    { path: 'route', component: RouteComponent },
    { path: 'route/:id', component: RouteEditComponent },
    { path: 'routeadd', component: RouteEditComponent },
    { path: 'routetype', component: RouteTypeComponent },
    { path: 'routetype/:id', component: RouteTypeEditComponent },
    { path: 'routetypeadd', component: RouteTypeEditComponent },
    { path: 'delayreason', component: DelayReasonComponent },
    { path: 'delayreason/:id', component: DelayReasonEditComponent },
    { path: 'delayreasonadd', component: DelayReasonEditComponent },
    { path: 'destination', component: DestinationComponent },
    { path: 'destination/:id', component: DestinationEditComponent },
    { path: 'destinationadd', component: DestinationEditComponent },
    { path: 'fareclass', component: FareClassComponent },
    { path: 'fareclass/:id', component: FareClassEditComponent },
    { path: 'fareclassadd', component: FareClassEditComponent }
];
