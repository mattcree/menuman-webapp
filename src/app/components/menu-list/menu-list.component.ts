import {Component, OnInit, ViewChild} from '@angular/core';
import { MenuService} from '../../services/menu.service';
import {Menu} from '../../models/menu';
import { AddMenuComponent } from '../add-menu/add-menu.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class MenuListComponent implements OnInit {

  @ViewChild('addMenu') addMenuModal: AddMenuComponent;

  menus: Array<Menu> = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.getMenus();
  }

  openAddMenuModal() {
    this.addMenuModal.open(() => this.getMenus());
  }

  getMenus() {
    this.menuService.getAllMenus().subscribe((menusData: Array<Menu>) => {
      this.menus = menusData;
    });
  }
}
