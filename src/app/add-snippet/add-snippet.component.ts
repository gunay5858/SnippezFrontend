import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../models/category";
import {Snippet} from "../models/snippet";

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.scss']
})
export class AddSnippetComponent implements OnInit {
  selectedCategory: Category = null;
  categories: Category[] = [];
  sharedUsers: string[] = [];
  currentSnippet: Snippet = new Snippet();

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  panelOpenState = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  public code = '';
  languageIdentifier: string = 'cs';


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

  addChip(event: MatChipInputEvent, type: string): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
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

  removeChip(tag: string, type: string): void {
    let index;

    if (type === 'tag') {
      index = this.tags.indexOf(tag);
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    } else {
      index = this.sharedUsers.indexOf(tag);
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {

  }

  formatCode(code: string) {
    //TODO: highlight code
    // this.txtCode.nativeElement.value = code;
    this.code = code
    console.log(this.code)
  }

  addSnippetData(value: any, save: boolean) {
    Object.assign(this.currentSnippet, value);
    console.log(value);

    if (save === true) {
      this.currentSnippet.tags = this.tags.toString();
      this.currentSnippet.shared_users = this.sharedUsers;
      // todo: save data to db
    }
    console.log(this.currentSnippet);
  }
}
