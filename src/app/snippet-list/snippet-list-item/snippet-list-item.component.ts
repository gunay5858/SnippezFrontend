import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Snippet} from "../../models/snippet";
import {CodeSnippetService} from "../../_services/code-snippet.service";

@Component({
  selector: 'app-snippet-list-item',
  templateUrl: './snippet-list-item.component.html',
  styleUrls: ['./snippet-list-item.component.scss']
})
export class SnippetListItemComponent implements OnInit {
  @Input() public codeSnippet: Snippet;
  @Input() public selected: boolean;
  @Output() public selectedSnippet: EventEmitter<Snippet> = new EventEmitter();

  constructor(private codeSnippetService: CodeSnippetService) {
  }

  ngOnInit(): void {

  }

  returnCodeSnippet(codeSnippet: Snippet) {
    this.selectedSnippet.emit(codeSnippet);
  }

  getCodeLanguage(codeLanguage: string) {
    return this.codeSnippetService.getCodeLanguageByShortcut(codeLanguage).name;
  }
}
