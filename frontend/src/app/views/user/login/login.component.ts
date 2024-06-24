import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthResponseType} from "../../../../types/auth-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {AuthResponseGetNameType} from "../../../../types/auth-response-get-name.type";

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
              private _snackBar: MatSnackBar,
              private router: Router) {  }

  ngOnInit(): void {
  }


  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
        .subscribe({
          next: (data: DefaultResponseType | AuthResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }
            const loginResponse = data as AuthResponseType;
            if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId ) {
              error = 'Ошибка авторизации.';
            }
            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }
            // set tokens
            this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
            this.authService.userIdKey = loginResponse.userId;
            this._snackBar.open('Вы успешно авторизовались.');
            this.router.navigate(['/']);

            this.setUserInfo();
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

  setUserInfo() {
    let name = '';
    let email = '';
    this.authService.getUserInfo()
      .subscribe({
        next: (data: DefaultResponseType | AuthResponseGetNameType) => {
          let error = null;
          if ((data as DefaultResponseType).error !== undefined) {
            error = (data as DefaultResponseType).message;
          }
          const userResponse = data as AuthResponseGetNameType;
          if (!userResponse.id || !userResponse.name || !userResponse.email) {
            error = 'Ошибка получения данных пользователя.';
          }
          if (error) {
            this._snackBar.open(error);
            // throw new Error(error);
          } else {
            name = userResponse.name;
            email = userResponse.email;
          }
          this.authService.setUserInfo(name, email);
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка получения данных пользователя.');
          }
        }
      });
  }
}
