import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent, ROUTES as childRoutes } from './dashboard/';
import { AuthGuard } from './blocks/auth';

export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent, children: childRoutes, canActivate: [AuthGuard] },
  { path: '**',    component: LoginComponent }
];
