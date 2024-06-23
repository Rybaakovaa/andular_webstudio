import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreparePhonePipe} from './pipes/prepare-phone.pipe';
import {ArticleComponent} from './components/article/article.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    PreparePhonePipe,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    PreparePhonePipe,
    ArticleComponent
  ]
})
export class SharedModule {
}
