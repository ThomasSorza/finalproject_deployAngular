import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent} from './vistas/login/login.component';
import { NuevoComponent} from './vistas/nuevo/nuevo.component';
import { EditComponent} from './vistas/edit/edit.component';
import { DashboardComponent} from './vistas/dashboard/dashboard.component';
import { DashboardRolesComponent } from './vistas/dashboard-roles/dashboard-roles/dashboard-roles.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'nuevo',
    component: NuevoComponent
  },
  {
    path:'edit/:id',
    component: EditComponent
  },
  {
    path:'dashboard-roles',
    component: DashboardRolesComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,DashboardRolesComponent,DashboardComponent,NuevoComponent,EditComponent]
