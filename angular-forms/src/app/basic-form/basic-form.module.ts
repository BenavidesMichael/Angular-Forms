import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicFormComponent } from './components/form/basic-form.component';
import { BasicFormRoutingModule } from './basic-form-routing.module';
import { DatalistComponent } from './components/datalist/datalist.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BasicFormComponent,
    DatalistComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BasicFormRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  exports: [
    BasicFormComponent,
    DatalistComponent,
  ]
})
export class BasicFormModule { }
