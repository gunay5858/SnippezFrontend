import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../models/category";
import {CategoryService} from "../_services/category.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  subFindCategories: Subscription = new Subscription();

  constructor(private categoryService: CategoryService) {
  }

  public getCategories() {
    this.subFindCategories = this.categoryService.getUsersCategories().subscribe((categories: Category[]) => {
      this.categories = categories
      console.log(categories)
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

}
