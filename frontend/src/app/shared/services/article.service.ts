import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {BlogArticlesType} from "../../../types/blog-articles.type";
import {ActiveParamsType} from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticle(url: string): Observable<ArticleType | DefaultResponseType> {
    return this.http.get<ArticleType | DefaultResponseType>(environment.api + 'articles/' + url);
  }

  // getArticles(): Observable<BlogArticlesType> {
  //   return this.http.get<BlogArticlesType>(environment.api + 'articles');
  // }

  getArticles(params: ActiveParamsType): Observable<BlogArticlesType> {
    return this.http.get<BlogArticlesType>(environment.api + 'articles', {
      params: params
    });
  }

  getPopularArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  getRelatedArticles(url: string): Observable<ArticleType[] | DefaultResponseType> {
    return this.http.get<ArticleType[] | DefaultResponseType>(environment.api + 'articles/related/' + url);
  }



}
