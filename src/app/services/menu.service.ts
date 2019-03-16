import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import {Menu} from '../models/menu';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) {}

  // Menu

  addMenu(menu: Menu): Observable<any> {
    return this.http.post<any>(window.location.origin + '/api/menu/', menu);
  }

  getAllMenus(): Observable<Array<Menu>> {
    return this.http.get<Array<Menu>>(window.location.origin + '/api/menu/');
  }

  // Menu Items

  addMenuItem(menuItem: MenuItem): Observable<any> {
    return this.http.post<any>(window.location.origin + '/api/menu-item/', menuItem);
  }

  getMenuItems(menuId: number): Observable<any> {
    return this.http.get<any>(window.location.origin + '/api/menu-item/');
  }

}
