import { Component, OnInit } from '@angular/core';
import 'prismjs';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

declare var Prism: any;

@Component({
  selector: 'app-show-snippet',
  templateUrl: './show-snippet.component.html',
  styleUrls: ['./show-snippet.component.scss']
})
export class ShowSnippetComponent implements OnInit {
  public code = 'using System; using System.Collections.Generic; using System.Linq; using System.Text; using System.Threading.Tasks; namespace ConsoleApp1 { class Program { static void Main(string[] args) { } } }';
    languageIdentifier: string = 'cs';

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: string[] = ["test", "test2"];

  constructor() { }

  ngOnInit(): void {
    this.code = Prism.highlight(this.code, Prism.languages[this.languageIdentifier]);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}
