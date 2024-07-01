import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreparePhonePipe} from './pipes/prepare-phone.pipe';
import {ArticleComponent} from './components/article/article.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BannerComponent} from './components/banner/banner.component';
import {TruncatePipe} from './pipes/truncate.pipe';
import { DateConvertPipe } from './pipes/date-convert.pipe';
import { FormPopupComponent } from './components/form-popup/form-popup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "@angular/cdk/dialog";
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [
    PreparePhonePipe,
    ArticleComponent,
    BannerComponent,
    TruncatePipe,
    DateConvertPipe,
    FormPopupComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule,
  ],
  exports: [
    PreparePhonePipe,
    ArticleComponent,
    BannerComponent,
    TruncatePipe,
    DateConvertPipe,
    FormPopupComponent,
  ]
})
export class SharedModule {
}
