import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { OwnersComponent } from './components/owners.component';
import { OwnerDetailComponent } from './components/owner-detail.component';
import { State } from './services/state.service';

const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isLogged = inject(State).getUser();
  if (!isLogged) {
    inject(Router).navigate(['/login']);
  }
  return isLogged ? true : false;
};
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'owners', component: OwnersComponent, canActivate: [canActivate] },
  {
    path: 'owners/:id',
    component: OwnerDetailComponent,
    canActivate: [canActivate],
  },
  { path: '', pathMatch: 'full', redirectTo: '/owners' },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    LoginComponent,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
