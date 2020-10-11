import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from "../_services/theme.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isDarkTheme: boolean;
  public currentTheme: string = 'Dark ';

  private subToggleTheme: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.subToggleTheme = this.themeService.observeTheme().subscribe((checked: boolean) => {
      this.isDarkTheme = checked;
    });
  }

  /**
   * Toggle between light and dark theme
   * @param checked: slider checked
   */
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    checked === true ? this.currentTheme = 'Light ' : this.currentTheme = 'Dark ';
  }

  ngOnDestroy(): void {
    this.subToggleTheme.unsubscribe();
  }
}
