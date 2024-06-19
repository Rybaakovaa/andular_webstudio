import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthResponseType} from "../../../types/auth-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey = "accessToken";
  public refreshTokenKey = 'refreshToken';
  public userIdKey = 'userId';

  public isLogged$: Subject<boolean> = new Subject<boolean>(); // оповещение для слушателей
  private isLogged: boolean = false; // текущщее состояние

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  login(email: string, password: string, rememberMe: boolean):
    Observable<DefaultResponseType | AuthResponseType> {
    return this.http.post<DefaultResponseType | AuthResponseType>(environment.api + 'login', {
      email, password, rememberMe
    })
  }

  signup(name: string, email: string, password: string):
    Observable<DefaultResponseType | AuthResponseType> {
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
    this.isLogged$.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
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
}
