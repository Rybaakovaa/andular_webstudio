import {Component, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ArticleService} from "../../../shared/services/article.service";
import {BlogArticlesType} from "../../../../types/blog-articles.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {CategoryType} from "../../../../types/category.type";
import {CommonService} from "../../../shared/services/common.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  countArticles: number = 0;
  countPages: number[] = [];
  // numberPages: number = 0;

  activeParams: ActiveParamsType = {categories: [], page: 1};
  categories: CategoryType[] = [];

  filterOpen: boolean = false;

  constructor(private articleService: ArticleService,
              private commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCategoriesRequest();

    // подписываемся на изменение query парамтеров
    this.activatedRoute.queryParams
      // добавляем задержу (защита от кучи запросов)
      // .pipe(
      //   debounceTime(500)
      // )
      .subscribe(params => {
        if (params.hasOwnProperty('categories')) {
          this.activeParams.categories = Array.isArray(params['categories']) ?  params['categories'] : [params['categories']];
        }
        if (params.hasOwnProperty('page')) {
          this.activeParams.page = +params['page'];
        }

        // запрос на нове продукты (в соответствии с фильром)
        this.getArticlesRequest();
      });

  }

  getCategoriesRequest() {
    this.commonService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.categories = data.map(item => {
          item.isChecked = !!this.activeParams.categories?.includes(item.url);
          return item;
        });
      });
  }

  getArticlesRequest() {
    this.articleService.getArticles(this.activeParams)
      .subscribe((data: BlogArticlesType) => {
        this.articles = data.items;
        this.countArticles = data.count;
        this.countPages = Array(data.pages).fill(0).map((x, i) => i);
      });
  }


  goToPage() {
    this.router.navigate(['/articles'], {queryParams: this.activeParams});
  }


  openPage(numberPage: number) {
    this.activeParams.page = numberPage;
    this.goToPage();
  }

  openPrevPage() {
    if (this.activeParams.page > 1) {
      this.activeParams.page--;
      this.goToPage();
    }
  }

  openNextPage() {
    if (this.activeParams.page < this.countPages.length) {
      this.activeParams.page++;
      this.goToPage();
    }
  }



  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  updateFilters(categoryUrl: string) {
    if (this.activeParams.categories) {
      const index = this.activeParams.categories.indexOf(categoryUrl);
      if (index === -1) {
        this.activeParams.categories.push(categoryUrl);
        this.categories.map(item => {
          if (item.url === categoryUrl) {
            item.isChecked = true;
          }
          return item;
        });
      } else {
        this.activeParams.categories.splice(index, 1);
        this.categories.map(item => {
          if (item.url === categoryUrl) {
            item.isChecked = false;
          }
          return item;
        });
      }
    }
    this.goToPage();
  }

  deleteFilter(categoryUrl: string) {
    if (this.activeParams.categories) {
      const index = this.activeParams.categories.indexOf(categoryUrl);
      this.activeParams.categories.splice(index, 1);
      this.categories.map(item => {
        if (item.url === categoryUrl) {
          item.isChecked = false;
        }
        return item;
      });
      this.goToPage();
    }
  }


}
