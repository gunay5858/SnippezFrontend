import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fgRegister: FormGroup;
  @ViewChild('avatarFileInput') avatarInput: ElementRef;
  @ViewChild('avatarPreview') avatarPreview: ElementRef;
  avatarIsSelected: boolean = false;
  private reCaptchaVerified: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.fgRegister = this.formBuilder.group({
      username: [null],
      password: [null],
      password_confirm: [null],
      email: [null],
      avatar: []
    });
  }

  ngOnInit(): void {
  }

  setAvatar($event: Event) {
    this.avatarIsSelected = true;
    // @ts-ignore
    const avatarSrc = URL.createObjectURL($event.target.files[0]);
    this.avatarPreview.nativeElement.src = avatarSrc;
  }

  removeAvatar() {
    this.avatarIsSelected = false;
    this.avatarPreview.nativeElement.src = null;
  }

  setReCaptchaVerified($event: boolean) {
    this.reCaptchaVerified = $event;
  }
}
