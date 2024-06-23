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
  comments?: {
    id: string,
    text: string,
    date: string,
    likesCount: number,
    dislikesCount: number,
    user: {
      id: string,
      name: string,
    }
  }[],
  commentsCount?: number,
}
