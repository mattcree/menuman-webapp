import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuService} from '../../services/menu.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import {Menu} from '../../models/menu';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})

export class EditMenuComponent implements OnInit {

  minimumFormFieldLength = 8;
  menu: Menu;


  editMenuForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(this.minimumFormFieldLength)
    ]),
    description: new FormControl('', [
      Validators.required, Validators.minLength(this.minimumFormFieldLength)
    ]),
  });

  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      flatMap(params => of(params.menuId)),
      flatMap(menuId => this.menuService.getMenu(menuId))
    ).subscribe(menu => this.menu = menu);
  }


  submitForm() {
    this.menuService.updateMenu(this.menu['id'], {
      name: this.editMenuForm.get('name').value,
      description: this.editMenuForm.get('description').value
    }).subscribe(() => this.router.navigate(['menus']));
  }

  get name() {
    return this.editMenuForm.get('name');
  }

  get description() {
    return this.editMenuForm.get('description');
  }

}
