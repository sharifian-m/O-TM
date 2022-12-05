import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Inject, Injectable, Injector} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(@Inject(Injector) protected injector: Injector, public controller: string) {
  }

  get(methodName, params?: HttpParams) {
    return this.http.get(`${environment.baseUrl}${this.controller}/${methodName}`, {params});
  }

  getById(methodName, id: string, params?: HttpParams) {

    return this.http.get(`${environment.baseUrl}${this.controller}/${methodName}/${id}`, {params});
  }

  post(methodName, data: any) {
    return this.http.post(`${environment.baseUrl}${this.controller}/${methodName}`, data);
  }

  put(methodName, data: any) {
    return this.http.put(`${environment.baseUrl}${this.controller}/${methodName}`, data);
  }

  putMulti(methodName, data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };
    return this.http.put(`${environment.baseUrl}${this.controller}/${methodName}`, data, options);
  }

  delete(methodName, id: string) {
    return this.http.delete(`${environment.baseUrl}${this.controller}/${methodName}/${id}`);

  }

  patch(methodName, data: any, id: string) {
    return this.http.patch(`${environment.baseUrl}${this.controller}/${methodName}/${id}`, data);

  }

  protected get http(): HttpClient {
    return this.injector.get(HttpClient);
  }
}
