import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { BlogComponent } from './blog/blog.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BlogComponent,
    ArticlePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
