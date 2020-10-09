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

  /**
   * Emits current selected Code snippet to component who calls this component
   * @param codeSnippet
   */
  returnCodeSnippet(codeSnippet: Snippet) {
    this.selectedSnippet.emit(codeSnippet);
  }

  /**
   * get the code language
   * @param codeLanguage
   */
  getCodeLanguage(codeLanguage: string) {
    return this.codeSnippetService.getCodeLanguageByShortcut(codeLanguage).name;
  }
}
