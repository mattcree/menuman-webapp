import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { MenuSections } from '../models/menu-sections';
import { MenuItem } from '../models/menu-item';


@Injectable()
export class MenuService {
  apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = window.location.origin + '/api/';
  }


  // Menu

  addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiPath + 'menu', menu);
  }

  getAllMenus(): Observable<Array<Menu>> {
    return this.http.get<Array<Menu>>(this.apiPath + 'menu');
  }

  getMenu(menuId: number): Observable<Menu> {
    return this.http.get<Menu>(this.apiPath + 'menu/' + menuId);
  }

  updateMenu(menuId: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(this.apiPath + 'menu/' + menuId, menu);
  }

  // Sections

  addSection(menuSection: MenuSections): Observable<MenuSections> {
    return this.http.post<MenuSections>(this.apiPath + 'menu', menuSection);
  }

  getAllSections(): Observable<Array<MenuSections>> {
    return this.http.get<Array<MenuSections>>(this.apiPath + 'section');
  }

  // Menu Items

  addMenuItem(menuItem: MenuItem): Observable<any> {
    return this.http.post<any>(this.apiPath + 'menu-item', menuItem);
  }

  getMenuItems(menuId: number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'menu-item');
  }

}
