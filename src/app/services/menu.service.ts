import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) {}

  getMenuItems(menuId: number): Observable<any> {
    return this.http.get<any>(window.location.origin + '/api/menu-item/');
  }

  addMenuItem(menuItem: MenuItem): Observable<any> {
    return this.http.post<any>(window.location.origin + '/api/menu-item/', menuItem);
  }

}
