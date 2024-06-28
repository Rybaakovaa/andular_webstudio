import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthResponseType} from "../../../types/auth-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {AuthResponseGetNameType} from "../../../types/auth-response-get-name.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey = "accessToken";
  public refreshTokenKey = 'refreshToken';
  public userIdKey = 'userId';
  public nameKey = 'name';
  public emailKey = 'email';

  public isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // оповещение для слушателей
  private isLogged: boolean = false; // текущщее состояние
  public userName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient)
  {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
    this.isLogged$.next(this.isLogged);
    this.userName$.next(localStorage.getItem(this.nameKey));
  }

  login(email: string, password: string, rememberMe: boolean): Observable<DefaultResponseType | AuthResponseType> {
    return this.http.post<DefaultResponseType | AuthResponseType>(environment.api + 'login', {
      email, password, rememberMe
    })
  }

  signup(name: string, email: string, password: string): Observable<DefaultResponseType | AuthResponseType> {
    return this.http.post<DefaultResponseType | AuthResponseType>(environment.api + 'signup', {
      name, email, password
    })
  }

  logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(environment.api + 'logout', {
        refreshToken: tokens.refreshToken
      })
    }
    throw throwError(() => 'Can not find token');
  }

  refresh(): Observable<DefaultResponseType | AuthResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType | AuthResponseType>(environment.api + 'refresh', {
        refreshToken: tokens.refreshToken
      })
    }
    throw throwError(() => 'Can not find token');
  }

  public getIsLoggedIn() {
    return this.isLogged;
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isLogged = true;
    this.isLogged$.next(this.isLogged);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.isLogged$.next(this.isLogged);
  }

  public getTokens(): { accessToken: string | null, refreshToken: string | null } {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey)
    }
  }

  get userId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  set userId(id: string | null) {
    if (id) {
      localStorage.setItem(this.userIdKey, id);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }



  getUserInfo(): Observable<DefaultResponseType | AuthResponseGetNameType> {
    return this.http.get<DefaultResponseType | AuthResponseGetNameType>(environment.api + 'users');
  }

  public setUserInfo(name: string, email: string): void {
    localStorage.setItem(this.nameKey, name);
    localStorage.setItem(this.emailKey, email);
    this.userName$.next(name);
  }

  public removeUserInfo(): void {
    localStorage.removeItem(this.nameKey);
    localStorage.removeItem(this.emailKey);
    this.userName$.next(null);
  }

}
