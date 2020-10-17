import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../_models/category";
import {Snippet} from "../_models/snippet";
import {CategoryService} from "../_services/category.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.scss']
})
export class AddSnippetComponent implements OnInit, OnDestroy {
  // code snippet attributes
  public selectedCategory: Category;
  public categories: Category[] = [];
  public tags: string[] = [];
  public code = '';
  public currentSnippet: Snippet = new Snippet();

  @ViewChild("tplSettings", {read: ViewContainerRef}) private vcr: ViewContainerRef;

  // form validations
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public previewPanelOpenState = false;

  // subscriptions
  private subCategories: Subscription = new Subscription();

  constructor(private _formBuilder: FormBuilder, private categoryService: CategoryService) {
    this.firstFormGroup = this._formBuilder.group({
      title: [this.currentSnippet.title, [Validators.required, Validators.minLength(3)]],
      category: [this.currentSnippet.category],
      description: [this.currentSnippet.description],
    });
    this.secondFormGroup = this._formBuilder.group({
      code: [this.currentSnippet.code, [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnDestroy(): void {
    this.subCategories.unsubscribe();
  }

  /**
   * Load available categories from database
   */
  loadCategories() {
    this.categoryService.getUsersCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  /**
   * set the entered Code for code Snippet
   * @param code to add to code snippet
   */
  setCode(code: string) {
    this.code = code
  }

  /**
   * Assemble code snippet object on each step and persist to database as last step
   * @param value to add to code snippet model
   * @param save: persist in database
   */
  addSnippetData(value: any, save: boolean) {
    console.log(value)
    Object.assign(this.currentSnippet, value);

    if (save === true) {
      this.currentSnippet.tags = this.tags.toString();

      // todo: bring shared user to form User: {username: <username>}
      //this.currentSnippet.shared_users = this.sharedUsers;
      // todo: save data to db and deliver message
    }
    console.log(this.currentSnippet);
  }
}
