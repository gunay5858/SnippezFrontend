import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _darkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Change theme to dark or light theme
   * @param isDarkTheme
   */
  setDarkTheme(isDarkTheme: boolean) {
    this._darkTheme.next(isDarkTheme);
  }

  /**
   * subscribe to status of theme
   */
  observeTheme() {
    return this._darkTheme.asObservable();
  }
}
