import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginComponent} from "./auth/login/login.component";
import {FreshTrxsComponent} from "./detection/fresh-trxs/fresh-trxs.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: "", component: WelcomeComponent},
  {path: "login", component: LoginComponent},
  {path: "trxs", component: FreshTrxsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
