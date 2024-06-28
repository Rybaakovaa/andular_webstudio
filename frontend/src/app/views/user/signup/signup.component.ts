import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {passwordValidator} from "../../../shared/validators/password-validator";
import {nameValidator} from "../../../shared/validators/name-validator";
import {AuthResponseType} from "../../../../types/auth-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {CommonService} from "../../../shared/services/common.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', [Validators.required, nameValidator()]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, passwordValidator()]],
    agree: [false, Validators.requiredTrue],
  })


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private commonService: CommonService) { }

  ngOnInit(): void {
  }

  signup() {
    if (this.signupForm.valid && this.signupForm.value.name && this.signupForm.value.email &&
        this.signupForm.value.password && this.signupForm.value.agree) {

      this.authService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)
        .subscribe({
          next: (data: DefaultResponseType | AuthResponseType) => {
            this.commonService.authSuccessResponse(data, false);

            if (this.signupForm.value.name && this.signupForm.value.email) {
              this.authService.setUserInfo(this.signupForm.value.name, this.signupForm.value.email);
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка регистрации.');
            }
          }
        })
    }
  }
}
