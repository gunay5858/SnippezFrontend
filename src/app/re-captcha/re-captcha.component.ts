import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {ThemeService} from "../_services/theme.service";

@Component({
  selector: 'app-re-captcha',
  templateUrl: './re-captcha.component.html',
  styleUrls: ['./re-captcha.component.scss']
})
export class ReCaptchaComponent implements OnInit, AfterViewInit {
  @ViewChild('captchaRef2') captchaRef2: ElementRef;
  private _reCaptchaId: number;
  private SITE_ID = environment.GOOGLE_SITE_KEY;
  private isRendered: boolean = false;

  @Output() onVerified: EventEmitter<boolean> = new EventEmitter<boolean>();
  private theme: string;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.themeService.observeTheme().subscribe((isDarkTheme: boolean) => {
      this.theme = isDarkTheme === true ? 'dark' : 'light';

      if (this.isRendered === false) {
        this.renderReCaptcha();
      } else {
        const grecaptcha = (window as any).grecaptcha;
        this._reCaptchaId = grecaptcha.reset(this.captchaRef2.nativeElement, {
          'sitekey': this.SITE_ID,
          'callback': (resonse) => this.reCapchaSuccess(resonse),
          'expired-callback': () => this.reCapchaExpired(),
          'theme': this.theme
        });
      }
    });
  }

  /**
   * render the recaptcha in relaited theme
   */
  renderReCaptcha() {
    if (this.isRendered === false) {
      this.isRendered = true;
    }

    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha) {
      this._reCaptchaId = grecaptcha.render(this.captchaRef2.nativeElement, {
        'sitekey': this.SITE_ID,
        'callback': (resonse) => this.reCapchaSuccess(resonse),
        'expired-callback': () => this.reCapchaExpired(),
        'theme': this.theme
      });
    }
  }

  /**
   * function if user clicks checkbox and getes token
   * @param data: token response from google
   */
  reCapchaSuccess(data: any) {
    console.log(data)
    if (data) {
      // TODO: verify from API that token is valid, and return result
    }
  }

  /**
   * User didn't click checkbox and captcha expired
   */
  reCapchaExpired() {
    // todo: return recaptcha is invalid
  }

}
