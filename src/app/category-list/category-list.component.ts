import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../models/category";
import {CategoryService} from "../_services/category.service";
import {Subscription} from "rxjs";
import {CodeSnippetService} from "../_services/code-snippet.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  private subFindCategories: Subscription = new Subscription();

  constructor(private categoryService: CategoryService, private codeSnippetService: CodeSnippetService) {
  }

  /**
   * Load category list from API
   */
  public loadCategories() {
    this.subFindCategories = this.categoryService.getUsersCategories().subscribe((categories: Category[]) => {
      this.categories = categories

      // select first category automatically after loading them
      if (this.categories.length > 0) {
        this.codeSnippetService.setCodeSnippetCategoryId(this.categories[0].id)
      }
    }, error => {
      // TODO: deliver error message
      console.log(error)
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.subFindCategories.unsubscribe();
  }

  /**
   * Load the Code Snippets of a category by category Id
   * @param id of the category (0 means without category)
   */
  loadCodeSnippets(id: number) {
    if (!id) {
      id = 0;
    }

    this.codeSnippetService.setCodeSnippetCategoryId(id)
  }
}
