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
import {MatMenuModule} from "@angular/material/menu";
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    PreparePhonePipe,
    ArticleComponent,
    BannerComponent,
    TruncatePipe,
    DateConvertPipe,
    FormPopupComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatMenuModule,
    RouterModule,
  ],
  exports: [
    PreparePhonePipe,
    ArticleComponent,
    BannerComponent,
    TruncatePipe,
    DateConvertPipe,
    LoaderComponent,
    FormPopupComponent,
  ]
})
export class SharedModule {
}
