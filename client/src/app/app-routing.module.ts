import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalViewComponent } from './hospital-view/hospital-view.component';
import { DepartmentViewComponent } from './department-view/department-view.component';

const routes: Routes = [
  { path: '', component: HospitalViewComponent},
  { path:'department/:hospitalname', component:DepartmentViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
