import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CategoryType} from "../../../types/category.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {AuthResponseType} from "../../../types/auth-response.type";
import {AuthResponseGetNameType} from "../../../types/auth-response-get-name.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  getCategories(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(environment.api + 'categories');
  }

  getService(name: string, phone: string, service: string, type: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', {
      name: name, phone: phone, service: service, type: type
    });
  }




  authSuccessResponse(data: DefaultResponseType | AuthResponseType, isLogin: boolean): void {
    let error = null;
    if ((data as DefaultResponseType).error !== undefined) {
      error = (data as DefaultResponseType).message;
    }
    const authResponse = data as AuthResponseType;
    if (!authResponse.accessToken || !authResponse.refreshToken || !authResponse.userId ) {
      error = isLogin ? 'Ошибка авторизации.' : "Ошибка регистрации.";
    }
    if (error) {
      this._snackBar.open(error);
      throw new Error(error);
    }
    // set tokens
    this.authService.setTokens(authResponse.accessToken, authResponse.refreshToken);
    this.authService.userIdKey = authResponse.userId;
    this._snackBar.open(isLogin ?'Вы успешно авторизовались.' : 'Вы успешно зарегистрировались.');
    this.router.navigate(['/']);

    if (isLogin) {
      this.setUserInfoRequest();
    }
  }

  setUserInfoRequest(): void {
    let name = 'пользователь';
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
          this.authService.setUserInfo(name, email);
        }
      });
  }

}
