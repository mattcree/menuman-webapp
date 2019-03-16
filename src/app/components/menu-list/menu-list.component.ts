import { Component, OnInit } from '@angular/core';
import { MenuService} from '../../services/menu.service';
import {Menu} from '../../models/menu';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class MenuListComponent implements OnInit {
  menus: Array<Menu> = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    const menusObservable = this.menuService.getAllMenus();
    menusObservable.subscribe((menusData: Array<Menu>) => {
      this.menus = menusData;
      console.log(menusData);
    });
  }

}
