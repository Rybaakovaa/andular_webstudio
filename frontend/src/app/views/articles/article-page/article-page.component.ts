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
import {CommentType} from "../../../../types/comment.type";

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
          this.curArticles = (data as ArticleType);
          this.getActionsUserRequest();
          // this.curArticles.comments?.forEach(item => {
          //   item.angryStatus = false;
          // });
          // console.log(this.curArticles)
        });
    }
  }

  getActionsUserRequest() {
    this.commentsService.userActionCommentsByArticle(this.curArticles.id)
      .subscribe((data: { comment: string, action: string }[]) => {
        if (data.length > 0) {
          const action = data;
          this.curArticles.comments?.map(item => {
            const comment = action.find(id => id.comment === item.id);
            if (comment) {
              item.likeStatus = (comment.action === "like");
              item.dislikeStatus = (comment.action === "dislike");
            }
            return item;
          })
        }
      });
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

  // loadMoreCommentsRequest() {
  //   this.commentsService.getComments(this.curArticles.id)
  //     .subscribe((data: CommentsType) => {
  //       const allComments = (data as CommentsType).comments;
  //       if (allComments.length > 0) {
  //         const curLen = this.curArticles.comments?.length ? this.curArticles.comments?.length : 0;
  //         if (allComments.length - 10 > curLen) {
  //           this.curArticles.comments = this.curArticles.comments?.concat(allComments.splice(curLen, curLen + 10));
  //         } else {
  //           this.curArticles.comments = this.curArticles.comments?.concat(allComments);
  //         }
  //       }
  //     });
  // }

  loadAllCommentsRequest() {
    this.commentsService.getComments(this.curArticles.id)
      .subscribe((data: CommentsType) => {
        const allComments = (data as CommentsType).comments;
        if (allComments.length > 0) {
          this.curArticles.comments = this.curArticles.comments?.concat(allComments);
        }
      });
  }


  angryRequest(comment: CommentType) {
    if (comment.angryStatus) {
      this._snackBar.open('Жалоба уже отправлена')
      return;
    }

    if (this.actionRequest(comment, "violate")) {
      this.curArticles.comments = this.curArticles.comments?.map(item => {
        if (item.id === comment.id) {
          item.angryStatus = true;
          this._snackBar.open('Жалоба отправлена')
        }
        return item;
      });
    }
  }

  dislikeRequest(comment: CommentType) {
    if (this.actionRequest(comment, "dislike")) {
      comment.dislikesCount += comment.dislikeStatus ? -1 : 1;
      comment.dislikeStatus = !comment.dislikeStatus;
      if (comment.dislikeStatus) this._snackBar.open("Ваш голос учтен");

      if (comment.likeStatus) {
        comment.likeStatus = false;
        comment.likesCount -= 1;
      }
    }
  }

  likeRequest(comment: CommentType) {
    if (this.actionRequest(comment, "like")) {
      comment.likesCount += comment.likeStatus ? -1 : 1;
      comment.likeStatus = !comment.likeStatus;
      if (comment.likeStatus) this._snackBar.open("Ваш голос учтен");

      if (comment.dislikeStatus) {
        comment.dislikeStatus = false;
        comment.dislikesCount -= 1;
      }
    }
  }

  actionRequest(comment: CommentType, action: string): boolean {
    let error = true;
    this.commentsService.actionComment(comment.id, action)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          error = false;
          console.log(data.message);
        }
      });
    return error;
  }


  // HTML будет безопасно очищен и отрендерен в шаблоне
  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
