import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserForm } from '../../models/user-fom';
import { BasicFormService } from '../../services/basic-form.service';
import { DatalistDataSource } from './datalist-datasource';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserForm>;
  dataSource!: DatalistDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'fullName',
    'email',
    'photo',
    'action'
  ];

  constructor(
    private router: Router,
    private basicFormService: BasicFormService) { }

  ngOnInit() {
    this.dataSource = new DatalistDataSource(this.basicFormService);
    this.dataSource.loadUserData();
  }

  create() {
    this.router.navigate(['basic-form/form']);
  }


  edit(model: any) {
    console.group(model);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
