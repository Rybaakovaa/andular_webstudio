import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  numberPhone: string = "74993431334";
  isLogged: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
