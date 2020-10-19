import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-re-captcha',
  templateUrl: './re-captcha.component.html',
  styleUrls: ['./re-captcha.component.scss']
})
export class ReCaptchaComponent implements OnInit, AfterViewInit {
  @ViewChild('captchaRef2') captchaRef2: ElementRef;
  private _reCaptchaId: number;
  private SITE_ID = environment.GOOGLE_SITE_KEY;

  @Output() onVerified: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha) {
      this._reCaptchaId = grecaptcha.render(this.captchaRef2.nativeElement, {
        'sitekey': this.SITE_ID,
        'callback': (resonse) => this.reCapchaSuccess(resonse),
        'expired-callback': () => this.reCapchaExpired()
      });
    }
  }

  reCapchaSuccess(data: any) {
    if (data) {
      alert("Congratulation! reCAPTCHA verified.")
      // Some logic goes here
    }
  }

  reCapchaExpired() {
    alert("Oops! reCAPTCHA expired.")
    // Some logic goes here
  }

}
