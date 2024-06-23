import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreparePhonePipe} from './pipes/prepare-phone.pipe';
import {ArticleComponent} from './components/article/article.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BannerComponent} from './components/banner/banner.component';
import {TruncatePipe} from './pipes/truncate.pipe';
import { DateConvertPipe } from './pipes/date-convert.pipe';


@NgModule({
  declarations: [
    PreparePhonePipe,
    ArticleComponent,
    BannerComponent,
    TruncatePipe,
    DateConvertPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    PreparePhonePipe,
    ArticleComponent,
    BannerComponent,
    TruncatePipe,
    DateConvertPipe
  ]
})
export class SharedModule {
}
