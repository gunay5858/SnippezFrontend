import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryComponent} from "./add-category/add-category.component";
import {ThemeService} from "./_services/theme.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public newCategoryFBDisabled: boolean = false;
  public isDarkTheme: boolean;

  private subToggleTheme: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private themeService: ThemeService, private router: Router, private overlayContainer: OverlayContainer) {

  }

  ngOnInit(): void {
    this.subToggleTheme = this.themeService.observeTheme().subscribe((checked: boolean) => {
      this.isDarkTheme = checked;

      if (checked === true) {
        this.overlayContainer.getContainerElement().classList.remove('light-theme');
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
      } else {
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
        this.overlayContainer.getContainerElement().classList.add('light-theme');
      }
    });
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

  ngOnDestroy(): void {
    this.subToggleTheme.unsubscribe();
  }

  /**
   * navigate to route for creating new code snippet if button is not disabled
   */
  navigate() {
    if (this.newCategoryFBDisabled === false) {
      this.router.navigate(['/snippet/new']);
    }
  }
}
