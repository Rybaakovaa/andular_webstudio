import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentsService} from "../../../shared/services/comments.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentsType} from "../../../../types/comments.type";

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

  isLogged: boolean = false;

  commentText: string = '';
  comments: CommentsType | null = null;


  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private commentsService: CommentsService,
              private articleService: ArticleService,
              private _snackBar: MatSnackBar,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    // подписываемся на !params! т к 'products/:url'
    this.activatedRoute.params.subscribe(params => {
      this.urlParam = params['url'];

      if (this.urlParam) {
        this.getArticleRequest();
        this.getRelatedArticlesRequest();
      }
    });
  }


  getArticleRequest() {
    if (this.urlParam) {
      // запрос по текущей статье
      this.articleService.getArticle(this.urlParam)
        .subscribe((data: ArticleType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error) {
            // ...
            throw new Error((data as DefaultResponseType).message);
          }
          this.curArticles = data as ArticleType;
          console.log(this.curArticles)
        });
    }
  }

  getRelatedArticlesRequest() {
    if (this.urlParam) {
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

  addCommentRequest() {
    if (this.commentText) {
      this.commentsService.addComment(this.commentText, this.curArticles.id)
        .subscribe((data: DefaultResponseType) => {
          if (!data.error) {
            this._snackBar.open('Ваш коментарий опубликован.');
            this.getArticleRequest();
          } else {
            this._snackBar.open('При публикации коментария произошла ошибка.');
          }
          this.commentText = '';
        });
    }
  }


  loadAllCommentsRequest() {
    this.commentsService.getComments(this.curArticles.id)
      .subscribe((data: CommentsType) => {
          const allComments = (data as CommentsType).comments;
          if (allComments.length > 0) {
            this.curArticles.comments = this.curArticles.comments?.concat(allComments);
          }
      })

  }


  // HTML будет безопасно очищен и отрендерен в шаблоне
  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
