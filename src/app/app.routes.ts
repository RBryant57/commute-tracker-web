import { Routes } from '@angular/router';
import { CommuteComponent } from './commute/commute.component';

export const routes: Routes = [
    { path: '', redirectTo: '/entry', pathMatch: 'full'},
    { path: 'entry', component: CommuteComponent} 
];
