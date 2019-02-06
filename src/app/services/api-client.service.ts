import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiClientService {

  constructor(private http: HttpClient) {}

  getFullMenu(menuId: number): Observable<any> {
    return this.http.get<any>(window.location.origin + '/api/menu/' + menuId + '/full');
  }

}