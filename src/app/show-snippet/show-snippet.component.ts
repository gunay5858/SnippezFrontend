import {Component, OnDestroy, OnInit} from '@angular/core';

import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {CodeSnippetService} from "../_services/code-snippet.service";
import {Subscription} from "rxjs";
import {Snippet} from "../_models/snippet";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CodeLanguage} from "../_models/code-language";

@Component({
  selector: 'app-show-snippet',
  templateUrl: './show-snippet.component.html',
  styleUrls: ['./show-snippet.component.scss']
})
export class ShowSnippetComponent implements OnInit, OnDestroy {
  // chip list config
  chipSelectable = true;
  chipRemovable = true;
  chipAddOnBlur = true;

  // current code snippet attributes
  public tags: string[] = [];
  public sharedUsers: string[] = [];
  public public: boolean = false;
  public currentCodeSnippet: Snippet;
  public codeLanguage: CodeLanguage;

  private subCurrentCodeSnippet: Subscription = new Subscription();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public fgSettings: FormGroup;

  constructor(private codeSnippetService: CodeSnippetService, private formBuilder: FormBuilder) {
    this.fgSettings = this.formBuilder.group({
      tags: [this.tags],
      sharedUsers: [this.sharedUsers],
      is_public: [this.public, Validators.required]
    });
  }

  ngOnInit(): void {
    this.subCurrentCodeSnippet = this.codeSnippetService.observeCurrentCodeSnippet().subscribe((codeSnippet: Snippet) => {
      this.currentCodeSnippet = codeSnippet;
      this.tags = this.currentCodeSnippet.tags.split(',');
      this.sharedUsers = this.currentCodeSnippet.shared_users;
      this.public = this.currentCodeSnippet.public;
      this.codeLanguage = this.codeSnippetService.getCodeLanguageByShortcut(this.currentCodeSnippet.codeLanguage);
    });
  }

  ngOnDestroy(): void {
    this.subCurrentCodeSnippet.unsubscribe();
  }

  /**
   * Add a chip to chipList depending on type
   * @param event: the chip object
   * @param type: tag | user will separate the chip lists
   */
  addChip(event: MatChipInputEvent, type: string): void {
    const input = event.input;
    const value = event.value;

    if (type === 'tag') {
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }
    } else {
      if ((value || '').trim()) {
        this.sharedUsers.push(value.trim());
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
}
