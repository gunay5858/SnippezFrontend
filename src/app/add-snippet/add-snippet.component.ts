import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../_models/category";
import {Snippet} from "../_models/snippet";

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.scss']
})
export class AddSnippetComponent implements OnInit {
  // code snippet attributes
  public selectedCategory: Category = null;
  public categories: Category[] = [];
  public sharedUsers: string[] = [];
  public tags: string[] = [];
  public code = '';
  public currentSnippet: Snippet = new Snippet();

  // chips
  public chipsSelectable = true;
  public chipsRemovable = true;
  public chipsAddOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // form validations
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public previewPanelOpenState = false;

  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      title: [this.currentSnippet.title, [Validators.required, Validators.minLength(3)]],
      category: [this.currentSnippet.category],
      description: [this.currentSnippet.description],
    });
    this.secondFormGroup = this._formBuilder.group({
      code: [this.currentSnippet.code, [Validators.required, Validators.minLength(3)]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      tags: [null],
      sharedUsers: [null],
      is_public: [false, Validators.required]
    });
  }

  /**
   * Add a chip to chipList depending on type
   * @param event: the chip object
   * @param type: tag | user will separate the chip lists
   */
  addChip(event: MatChipInputEvent, type: string): void {
    const input = event.input;
    const value = event.value;

    // Add chip
    if ((value || '').trim()) {
      if (type === 'tag') {
        this.tags.push(value.trim());
      } else {
        this.sharedUsers.push(value.trim())
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove a chip from a chips list
   * @param chip: ship object
   * @param type: tag | user will separate the chip lists
   */
  removeChip(chip: string, type: string): void {
    let index;

    if (type === 'tag') {
      index = this.tags.indexOf(chip);
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    } else {
      index = this.sharedUsers.indexOf(chip);
      if (index >= 0) {
        this.sharedUsers.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {

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
    Object.assign(this.currentSnippet, value);

    if (save === true) {
      this.currentSnippet.tags = this.tags.toString();
      this.currentSnippet.shared_users = this.sharedUsers;
      // todo: save data to db and deliver message
    }
    console.log(this.currentSnippet);
  }
}
