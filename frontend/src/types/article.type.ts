import {CommentType} from "./comment.type";

export type ArticleType = {
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string,


  // доп. параметры для ответа с сервера
  text?: string,
  comments?: CommentType[],
  commentsCount?: number,
}
