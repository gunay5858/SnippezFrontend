import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../_services/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  fgNewCategory: FormGroup;
  availableDevIcons: string[] = [];
  availableLineAwesomeIcons: string[] = [];
  currentIcon: string = 'las la-folder-open';
  iconsExpanded: boolean = false;

  constructor(private categoryService: CategoryService, private _formBuilder: FormBuilder) {
    this.fgNewCategory = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      icon: ['icon-shell', [Validators.required]],
    });

    this.availableDevIcons = this.categoryService.getAllDevIcons();
    this.availableLineAwesomeIcons = this.categoryService.getAllLineAwesomeIcons();
  }

  ngOnInit(): void {
  }

  setCurrentIcon(icon: string) {
    this.currentIcon = icon;
    this.fgNewCategory.patchValue({icon: icon});
    this.iconsExpanded = false;
  }
}
