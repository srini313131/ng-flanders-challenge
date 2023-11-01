import { Component } from '@angular/core';

import { State } from './services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="loader-conatiner" *ngIf="state.isLoading$ | async">
        <div
          class="spinner-border ms-auto loader left"
          aria-hidden="true"
        ></div>
        <div
          class="spinner-border ms-auto loader middle"
          aria-hidden="true"
        ></div>
        <div
          class="spinner-border ms-auto loader right"
          aria-hidden="true"
        ></div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(public state: State, private router: Router) {}

  handleLogout() {
    this.state.logout();
    this.router.navigate(['/login']);
  }
}
