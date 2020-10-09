import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Snippet} from "../../models/snippet";

@Component({
  selector: 'app-snippet-list-item',
  templateUrl: './snippet-list-item.component.html',
  styleUrls: ['./snippet-list-item.component.scss']
})
export class SnippetListItemComponent implements OnInit {
  @Input() public codeSnippet: Snippet;
  @Input() public selected: boolean;
  @Output() public selectedSnippet: EventEmitter<Snippet> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {

  }

  returnCodeSnippet(codeSnippet: Snippet) {
    this.selectedSnippet.emit(codeSnippet);
  }
}
