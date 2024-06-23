import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ArticleType} from "../../../types/article.type";
import {ArticleService} from "../../shared/services/article.service";
import {ReviewType} from "../../../types/review.type";
import {ServiceType} from "../../../types/service.type";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  imagePath = 'assets/images/pages/';

  banners = [
    {
      type: "Предложение месяца",
      title: "Продвижение в <br>Instagram для вашего <br>бизнеса <span>-15%!</span>",
      text: "",
      image: "banner-1.png"
    },
    {
      type: "Акция",
      title: "Нужен грамотный <br><span>копирайтер</span>?",
      text: "Весь декабрь у нас действует акция на работу копирайтера.",
      image: "banner-2.png"
    },
    {
      type: "Новость дня",
      title: "<span>6 место</span> в ТОП-10 <br>SMM-агенств Москвы!",
      text: "Мы благодарим каждого, кто голосовал за нас!",
      image: "banner-3.png"
    },
  ]

  customOptionsBanners: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        dotsEach: true
      },
    },
    nav: false
  }

  services: ServiceType[] = [
    {
      title: "Создание сайтов",
      description: "В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!",
      image: 'services-1.png',
      price:  "7 500",
      // url: "от куда брать сылку на услугу ???",
    },
    {
      title: "Продвижение",
      description: "Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!",
      image: 'services-2.png',
      price:  "3 500",
      // url: "от куда брать сылку на услугу ???",
    },
    {
      title: "Реклама",
      description: "Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.",
      image: 'services-3.png',
      price:  "1 000",
      // url: "от куда брать сылку на услугу ???",
    },
    {
      title: "Копирайтинг",
      description: "Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.",
      image: 'services-4.png',
      price:  "750",
      // url: "от куда брать сылку на услугу ???",
    },
  ]

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
    }
  ];

  customOptionsReviews: OwlOptions = {
    loop: true,
    margin: 26,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false
  }

  popularArticles: ArticleType[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    // запрос на популярные статьи
    this.articleService.getPopularArticles().subscribe((data: ArticleType[]) => {
      console.log(data)
      this.popularArticles = data;
    });
  }



}
