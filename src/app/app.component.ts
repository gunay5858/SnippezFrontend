import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryComponent} from "./add-category/add-category.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public newCategoryFBDisabled: boolean = false;

  constructor(public dialog: MatDialog) {

  }

  /**
   * Opens the dialog to create a new category
   */
  openNewCategoryDialog() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {hasBackdrop: false});

    // disable creating new code snippet and create new category Floating Action Button
    dialogRef.afterClosed().subscribe(() => {
      this.newCategoryFBDisabled = false;
    });

    // enable creating new code snippet and create new category Floating Action Button
    dialogRef.afterOpened().subscribe(() => {
      this.newCategoryFBDisabled = true;
    })
  }
}
