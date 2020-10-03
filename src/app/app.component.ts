import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "./_services/category.service";
import {AddCategoryComponent} from "./add-category/add-category.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SnippezFrontend';

  @ViewChild("newCategoryDialog") foobar: TemplateRef<any>;


  constructor(public dialog: MatDialog) {

  }

  openNewCategoryDialog() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {hasBackdrop: false});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
