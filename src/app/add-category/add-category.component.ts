import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../_services/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCategoryComponent implements OnInit {
  public fgNewCategory: FormGroup;
  public availableDevIcons: string[] = [];
  public availableLineAwesomeIcons: string[] = [];
  public currentIcon: string = 'las la-folder-open';
  public iconsExpanded: boolean = true;

  constructor(private categoryService: CategoryService, private _formBuilder: FormBuilder) {
    // form validation
    this.fgNewCategory = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      icon: [this.currentIcon, [Validators.required]],
    });

    // load all selectable icons
    this.availableDevIcons = this.categoryService.getAllDevIcons();
    this.availableLineAwesomeIcons = this.categoryService.getAllLineAwesomeIcons();
  }

  ngOnInit(): void {
  }

  /**
   * sert the categoy's icon
   * @param icon to set
   */
  setCurrentIcon(icon: string) {
    this.currentIcon = icon;
    this.fgNewCategory.patchValue({icon: icon});
    this.iconsExpanded = false;
  }
}
