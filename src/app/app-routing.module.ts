import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FilmComponent } from '../app/films/films.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { NotationComponent } from './notation/notation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'film/:id', component: FilmComponent },
  { path: 'notation/:id', component: NotationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
