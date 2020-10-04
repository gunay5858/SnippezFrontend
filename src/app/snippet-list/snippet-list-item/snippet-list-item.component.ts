import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CodeSnippetService} from "../../_services/code-snippet.service";
import {Subscription} from "rxjs";
import {Snippet} from "../../models/snippet";

@Component({
  selector: 'app-snippet-list-item',
  templateUrl: './snippet-list-item.component.html',
  styleUrls: ['./snippet-list-item.component.scss']
})
export class SnippetListItemComponent implements OnInit {
  @Input() public codeSnippet: Snippet;
  @Input() public selected: boolean;

  constructor() {
  }

  ngOnInit(): void {

  }

}
