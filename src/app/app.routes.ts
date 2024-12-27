import { Routes } from '@angular/router';
import { CommuteComponent } from './commute/commute.component';
import { PassConditionComponent } from './pass-condition/pass-condition.component';
import { RouteComponent } from './route/route.component';
import { Route } from './route/route-model';
import { DelayReasonComponent } from './delay-reason/delay-reason.component';
import { DestinationComponent } from './destination/destination.component';
import { FareClassComponent } from './fare-class/fare-class.component';
import { RouteTypeComponent } from './route-type/route-type.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'commute', component: CommuteComponent },
    { path: 'passcondition', component: PassConditionComponent },
    { path: 'route', component: RouteComponent},
    { path: 'route/:id', component: RouteComponent },
    { path: 'delayreason', component: DelayReasonComponent},
    { path: 'delayreason/:id', component: DelayReasonComponent },
    { path: 'destination', component: DestinationComponent},
    { path: 'destination/:id', component: DestinationComponent },
    { path: 'fareclass', component: FareClassComponent},
    { path: 'fareclass/:id', component: FareClassComponent },
    { path: 'routetype', component: RouteTypeComponent},
    { path: 'routetype/:id', component: RouteTypeComponent }
];
