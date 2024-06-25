import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentsType} from "../../../types/comments.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  addComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text, article
    });
  }

  getComments(id: string): Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments?article=' + id);
  }

  actionComment(id: string, action: string): Observable<CommentsType> {
    return this.http.post<CommentsType>(`environment.api/comments/${id}/apply-action`, {
      action
    });
  }

}
