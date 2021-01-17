import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { UserForm } from '../../models/user-fom';
import { BehaviorSubject } from 'rxjs';
import { BasicFormService } from '../../services/basic-form.service';
import { of } from 'rxjs/internal/observable/of';


export class DatalistDataSource extends DataSource<UserForm> {

  private UsersSubject = new BehaviorSubject<UserForm[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  data: UserForm[] = [];
  paginator!: MatPaginator;
  sort!: MatSort;

  constructor(private basicFormService: BasicFormService) {
    super();
  }


  loadUserData() {
    this.loadingSubject.next(true);

    this.basicFormService.getalldata().pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(result => {
        console.log(result);
        this.UsersSubject.next(result);
      });
  }


  connect(collectionViewer: CollectionViewer): Observable<UserForm[]> {
    // const dataMutations = [
    //   observableOf(this.data),
    //   this.paginator.page,
    //   this.sort.sortChange
    // ];

    return this.UsersSubject.asObservable();
    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    // }));
  }


  disconnect(collectionViewer: CollectionViewer) {
    this.UsersSubject.complete();
    this.loadingSubject.complete();
  }


  private getPagedData(data: UserForm[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }


  private getSortedData(data: UserForm[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.email, b.email, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}


function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
