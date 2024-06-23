import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticlePageComponent implements OnInit {

  urlParam: string | null = null
  curArticles!: ArticleType;
  relatedArticles: ArticleType[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    // подписываемся на !params! т к 'products/:url'
    this.activatedRoute.params.subscribe(params => {
      this.urlParam = params['url'];
    });

    if (this.urlParam) {
      // запрос по текущей статье
      this.articleService.getArticle(this.urlParam)
        .subscribe((data: ArticleType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error) {
            // ...
            throw new Error((data as DefaultResponseType).message);
          }
          console.log(data as ArticleType)
          this.curArticles = data as ArticleType;
        });

      // запрос на читать также
      this.articleService.getRelatedArticles(this.urlParam)
        .subscribe((data: ArticleType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).error) {
            // ...
            throw new Error((data as DefaultResponseType).message);
          }
          this.relatedArticles = data as ArticleType[];
        });
    }
  }


  // HTML будет безопасно очищен и отрендерен в шаблоне
  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
