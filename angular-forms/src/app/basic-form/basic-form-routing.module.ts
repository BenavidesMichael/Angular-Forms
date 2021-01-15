import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatalistComponent } from './components/datalist/datalist.component';
import { BasicFormComponent } from './components/form/basic-form.component';

const routes: Routes = [
  { path: '', component: DatalistComponent },
  { path: 'form', component: BasicFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicFormRoutingModule { }
