import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserForm } from '../models/user-fom';
import { UserFormCreate } from '../models/user-form-create';

@Injectable({
  providedIn: 'root'
})
export class BasicFormService {

  urlBase: string = `${environment.urlApi}/User`;

  constructor(private httpClient: HttpClient) { }

  getalldata() {
    return this.httpClient.get<UserForm[]>(this.urlBase);
  }


  // addData(model: UserFormCreate) {
  //   return this.httpClient.post(this.urlBase, model);
  // }


  addData(formData: any) {
    return this.httpClient.post(this.urlBase, formData, {reportProgress: true, observe: 'events'});
  }


}
