import { Component, OnInit } from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ArticleService} from "../../../shared/services/article.service";
import {BlogArticlesType} from "../../../../types/blog-articles.type";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  countPage: number = 0;
  countArray: number[] = [];
  numPage: number = 0;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles()
      .subscribe((data: BlogArticlesType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error) {
          // ...
          throw new Error((data as DefaultResponseType).message);
        }
        console.log(data as BlogArticlesType)
        this.articles = (data as BlogArticlesType).items;
        this.countPage = (data as BlogArticlesType).count;
        this.numPage = (data as BlogArticlesType).pages;
        this.countArray = Array(this.countPage).fill(0).map((x, i) => i);
      });
  }

}
