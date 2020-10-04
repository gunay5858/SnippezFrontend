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
  categories: Category[] = [];
  subFindCategories: Subscription = new Subscription();

  constructor(private categoryService: CategoryService, private codeSnippetService: CodeSnippetService) {
  }

  public getCategories() {
    this.subFindCategories = this.categoryService.getUsersCategories().subscribe((categories: Category[]) => {
      this.categories = categories

      // select first category automatically after loading them
      if (this.categories.length > 0) {
        this.codeSnippetService.setCodeSnippetCategoryId(this.categories[0].id)
      }
    }, error => {
      console.log(error)
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.subFindCategories.unsubscribe();
  }

  loadCodeSnippets(id: number) {
    if (!id) {
      id = 0;
    }

    this.codeSnippetService.setCodeSnippetCategoryId(id)
  }
}
