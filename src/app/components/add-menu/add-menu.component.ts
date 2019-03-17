import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent {

  modalRef: NgbModalRef;
  minimumFormFieldLength = 8;
  newMenuForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(this.minimumFormFieldLength)
    ]),
    description: new FormControl('', [
      Validators.required, Validators.minLength(this.minimumFormFieldLength)
    ]),
  });

  @ViewChild('content') content: TemplateRef<any>;
  constructor(private modalService: NgbModal, private menuService: MenuService) {}

  open(onSuccess: () => void) {
    this.newMenuForm.reset();
    this.modalRef = this.modalService.open(this.content);
    this.modalRef.result.then(onSuccess, () => {});
  }

  submitForm() {
    this.menuService.addMenu({
      name: this.newMenuForm.get('name').value,
      description: this.newMenuForm.get('description').value
    }).subscribe(() => {
      this.modalRef.close();
    });
  }

  get name() {
    return this.newMenuForm.get('name');
  }

  get description() {
    return this.newMenuForm.get('description');
  }


}
