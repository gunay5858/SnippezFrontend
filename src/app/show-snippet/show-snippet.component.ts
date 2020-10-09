import {Component, OnDestroy, OnInit} from '@angular/core';

import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {CodeSnippetService} from "../_services/code-snippet.service";
import {Subscription} from "rxjs";
import {Snippet} from "../models/snippet";

@Component({
  selector: 'app-show-snippet',
  templateUrl: './show-snippet.component.html',
  styleUrls: ['./show-snippet.component.scss']
})
export class ShowSnippetComponent implements OnInit, OnDestroy {
  chipSelectable = true;
  chipRemovable = true;
  chipAddOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  sharedUsers: string[] = [];

  public currentCodeSnippet: Snippet;
  private subCurrentCodeSnippet: Subscription = new Subscription();

  constructor(private codeSnippetService: CodeSnippetService) {
  }

  ngOnInit(): void {
    this.subCurrentCodeSnippet = this.codeSnippetService.observeCurrentCodeSnippet().subscribe((codeSnippet: Snippet) => {
      this.currentCodeSnippet = codeSnippet;
      this.tags = this.currentCodeSnippet.tags.split(',');
    });
  }

  ngOnDestroy(): void {
    this.subCurrentCodeSnippet.unsubscribe();
  }

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
