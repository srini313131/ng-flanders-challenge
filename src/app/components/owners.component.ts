import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { State } from '../services/state.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'owners-pets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card my-5">
      <div class="card-body">
        <div
          class="card-header custom-theme d-flex d-flex justify-content-between"
        >
          <h2>Pet Owners</h2>
          <button
            type="button"
            class="btn btn-secondary"
            (click)="handleLogout()"
          >
            Logout
          </button>
        </div>
        <div
          *ngFor="let owner of owners$ | async; trackBy: trackBy"
          class="d-flex list-item p-3 my-2 justify-content-between"
        >
          <span>{{ owner.name }}</span>
          <button
            type="button"
            class="btn custom-theme"
            (click)="handleDetailView(owner)"
          >
            View Pets Owned
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class OwnersComponent implements OnInit {
  owners$ = this.state.owners$;
  constructor(
    public state: State,
    private api: ApiService,
    public router: Router
  ) {}
  ngOnInit() {
    this.api.getOwners();
  }

  handleLogout() {
    this.state.logout();
    this.router.navigate(['/login']);
  }

  handleDetailView(owner: any) {
    this.state.selectOwner$.next(owner);
    this.router.navigate(['/owners', owner.name]);
  }

  trackBy(_: number, owner: any) {
    return owner.id;
  }
}
