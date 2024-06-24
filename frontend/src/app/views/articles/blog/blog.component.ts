import {Component, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ArticleService} from "../../../shared/services/article.service";
import {BlogArticlesType} from "../../../../types/blog-articles.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {CategoryType} from "../../../../types/category.type";
import {CommonService} from "../../../shared/services/common.service";

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


  filterOpen = false;


  constructor(private articleService: ArticleService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getArticlesRequest();
    this.getCategoriesRequest();
  }

  getCategoriesRequest() {
    this.commonService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.categories = data.map(item => {
          item.isChecked = false;
          return item;
        });
        console.log('this.categories')
        console.log(this.categories)
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



  openPage(numberPage: number) {
    this.activeParams.page = numberPage;
    this.getArticlesRequest();
    // this.router.navigate(['/catalog'], {queryParams: this.activeParams});
  }

  openPrevPage() {
    if (this.activeParams.page > 1) {
      this.activeParams.page--;
      this.getArticlesRequest();
      // this.router.navigate(['/catalog'], {queryParams: this.activeParams});
    }
  }

  openNextPage() {
    if (this.activeParams.page < this.countPages.length) {
      this.activeParams.page++;
      console.log(this.activeParams)
      this.getArticlesRequest();
      // this.router.navigate(['/catalog'], {queryParams: this.activeParams});
    }
  }



  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  updateFilters(category: string) {
    if (this.activeParams.categories) {
      const index = this.activeParams.categories.indexOf(category);
      if (index === -1) {
        this.activeParams.categories.push(category);
        this.categories.map(item => {
          if (item.name === category) {
            item.isChecked = true;
          }
          return item;
        });
      } else {
        this.activeParams.categories.splice(index, 1);
        this.categories.map(item => {
          if (item.name === category) {
            item.isChecked = false;
          }
          return item;
        });
      }
    }
    console.log(this.activeParams)
    this.getArticlesRequest();
    // this.router.navigate(['/catalog'], {queryParams: this.activeParams});
  }


}
