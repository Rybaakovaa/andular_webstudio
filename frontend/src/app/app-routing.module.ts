import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {AuthForwardGuard} from "./core/auth/auth-forward.guard";
import {PolicyPageComponent} from "./views/policy-page/policy-page.component";

const routes: Routes = [
  // реализация ленивой загрузки модилей
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'policy', component: PolicyPageComponent },
      { path: '', loadChildren: () => import('./views/user/user.module').then((m) => m.UserModule), canActivate: [AuthForwardGuard]},
      { path: '', loadChildren: () => import('./views/articles/articles.module').then((m) => m.ArticlesModule)},
      // { path: '', loadChildren: () => import('./views/order/order.module').then((m) => m.OrderModule)},
      // { path: '', loadChildren: () => import('./views/personal/personal.module').then((m) => m.PersonalModule), canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: "enabled", scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
