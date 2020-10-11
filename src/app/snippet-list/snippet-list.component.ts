import {Component, OnDestroy, OnInit} from '@angular/core';
import {CodeSnippetService} from "../_services/code-snippet.service";
import {Subscription} from "rxjs";
import {Snippet} from "../_models/snippet";

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss']
})
export class SnippetListComponent implements OnInit, OnDestroy {
  public codeSnippets: Snippet[] = [];

  // subscriptions
  private subRefreshCodeSnippets: Subscription = new Subscription();
  private subLoadCodeSnippets: Subscription = new Subscription();

  constructor(private codeSnippetService: CodeSnippetService) {
  }

  ngOnInit(): void {
    this.subRefreshCodeSnippets = this.codeSnippetService.observeCodeSnippetCategoryId().subscribe((categoryId: number) => {
      this.loadCodeSnippetsOfCategory(categoryId);
    });
  }

  /**
   * Load the code snippets of a category
   * @param categoryId: Id of the category from whom to load the code snippets
   */
  public loadCodeSnippetsOfCategory(categoryId: number) {
    this.subLoadCodeSnippets = this.codeSnippetService.getCodeSnippetsOfCategory(categoryId).subscribe((codeSnippets: Snippet[]) => {
      this.codeSnippets = codeSnippets;

      // set first as selected if exists
      if (this.codeSnippets.length > 0) {
        this.showCodeSnippet(this.codeSnippets[0]);
      }
    })
  }

  ngOnDestroy(): void {
    this.subRefreshCodeSnippets.unsubscribe();
    this.subLoadCodeSnippets.unsubscribe();
  }

  /**
   * deliver selected code snippet to other component which shows the code snippet
   * @param $event
   */
  showCodeSnippet($event: Snippet) {
    this.codeSnippetService.setCurrentCodeSnippet($event);
  }
}
