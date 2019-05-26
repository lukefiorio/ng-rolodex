import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', canActivate: [AuthGuard], component: ContactComponent },
  { path: 'contacts/new', canActivate: [AuthGuard], component: NewContactComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
