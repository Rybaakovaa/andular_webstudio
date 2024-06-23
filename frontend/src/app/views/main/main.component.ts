import {Component, OnInit} from '@angular/core';
import {ArticleType} from "../../../types/article.type";
import {ArticleService} from "../../shared/services/article.service";
import {ReviewType} from "../../../types/review.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  reviewsImagePath = 'assets/images/pages/';
  reviews: ReviewType[] = [
    {
      name: "Станислав",
      image: "review-1.png",
      text: "Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.",
    },
    {
      name: "Алёна",
      image: "review-2.png",
      text: "Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.",
    },
    {
      name: "Мария",
      image: "review-3.png",
      text: "Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!",
    },
  ];

  articles: ArticleType[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    // запрос на популярные статьи
    this.articleService.getPopularArticle().subscribe((data: ArticleType[]) => {
      console.log(data)
      this.articles = data;
    });
  }

}
