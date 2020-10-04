import {Component, OnDestroy, OnInit} from '@angular/core';
import {CodeSnippetService} from "../_services/code-snippet.service";
import {Subscription} from "rxjs";
import {Snippet} from "../models/snippet";

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss']
})
export class SnippetListComponent implements OnInit, OnDestroy {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  subRefreshCodeSnippets: Subscription = new Subscription();
  subLoadCodeSnippets: Subscription = new Subscription();
  public codeSnippets: Snippet[] = [];

  constructor(private codeSnippetService: CodeSnippetService) {
  }

  ngOnInit(): void {
    this.subRefreshCodeSnippets = this.codeSnippetService.getCodeSnippetCategoryId().subscribe((categoryId: number) => {
      this.getCodeSnippetsOfCategory(categoryId);
    });
  }

  public getCodeSnippetsOfCategory(categoryId: number) {
    this.subLoadCodeSnippets = this.codeSnippetService.getCodeSnippetsOfCategory(categoryId).subscribe((codeSnippets: Snippet[]) => {
      this.codeSnippets = codeSnippets;
    })
  }

  ngOnDestroy(): void {
    this.subRefreshCodeSnippets.unsubscribe();
    this.subLoadCodeSnippets.unsubscribe();
  }

}
