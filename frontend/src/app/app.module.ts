import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from "./shared/layout/layout.component";
import {HeaderComponent} from "./shared/layout/header/header.component";
import {FooterComponent} from "./shared/layout/footer/footer.component";
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MainComponent} from './views/main/main.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {CarouselModule} from "ngx-owl-carousel-o";
import {PolicyPageComponent} from './views/policy-page/policy-page.component';
// import {InputNumberModule} from "primeng/inputnumber";
// import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PolicyPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    MatSnackBarModule,
    MatMenuModule,
    CarouselModule,
    ReactiveFormsModule,
    // InputNumberModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  exports: [
    FooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
