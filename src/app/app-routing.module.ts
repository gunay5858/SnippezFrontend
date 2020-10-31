import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AddSnippetComponent} from "./add-snippet/add-snippet.component";
import {AdminAppComponent} from "./admin/admin-app/admin-app.component";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";


const routes: Routes = [
  {path: 'dashboard', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'snippet/new', component: AddSnippetComponent},
  {path: 'admincp', component: AdminAppComponent},
  {path: 'dashboard', component: AdminDashboardComponent, outlet: 'admin'},
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
