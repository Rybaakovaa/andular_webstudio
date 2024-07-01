import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthResponseType} from "../../../../types/auth-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {AuthResponseGetNameType} from "../../../../types/auth-response-get-name.type";
import {CommonService} from "../../../shared/services/common.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private commonService: CommonService,
              private _snackBar: MatSnackBar) {  }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }



  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
        .subscribe({
          next: (data: DefaultResponseType | AuthResponseType) => {
            this.commonService.authSuccessResponse(data, true);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка авторизации.');
            }
          }
        });
    }
  }
}
