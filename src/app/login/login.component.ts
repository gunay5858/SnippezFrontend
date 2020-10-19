import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fgLogin: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.fgLogin = this.formBuilder.group({
      username: [null],
      password: [null]
    });
  }

  ngOnInit(): void {
  }

}
