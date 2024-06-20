import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  numberPhone: string = "74993431334";
  isLogged: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router,) { }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });
    this.authService.userName$.subscribe((name: string) => {
      this.userName = name;
    });
  }


  logout(): void {
    this.authService.logout().subscribe({
      next: (data: DefaultResponseType) => {
        this.doLogout();
      },
      error: () => {
        this.doLogout();
      }
    })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.removeUserInfo();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы.');
    this.router.navigate(['/']);
  }
}
