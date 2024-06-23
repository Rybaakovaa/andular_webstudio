import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article!: ArticleType;
  // imagePath =

  constructor() { }

  ngOnInit(): void {
  }

}
