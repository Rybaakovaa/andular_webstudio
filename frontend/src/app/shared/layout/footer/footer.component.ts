import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  numberPhone: string = "74993431334";

  constructor() { }

  ngOnInit(): void {
  }

}
