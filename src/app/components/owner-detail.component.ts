import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from 'src/app/services/state.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-owner-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-fluid pt-5">
      <div
        class="card"
        *ngIf="state.selectOwner$ | async as owner; else noSelectedUser"
      >
        <div class="card-body">
          <h5 class="card-title">{{ owner?.name }}, {{ owner?.age }}</h5>
          <p class="card-text">
            <span class="fw-bold me-2"> pets Owned:</span>
            <ng-container
              *ngIf="owner.pets && owner.pets.length > 0; else none"
            >
              <span
                *ngFor="let pet of owner.pets"
                class="badge me-2"
                [ngClass]="{
                  'text-bg-primary': pet.type === 'Dog',
                  'text-bg-success': pet.type === 'Cat'
                }"
                >{{ pet.name }}({{ pet.type }})</span
              >
            </ng-container>
            <ng-template text-bg-secondary #none
              ><span class="badge text-bg-secondary">None</span></ng-template
            >
          </p>
          <a class="btn btn-secondary" [routerLink]="['/owners']">Go Back</a>
        </div>
      </div>
      <ng-template #noSelectedUser>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Oops! The Selected User Doesnt Exist</h5>
            <a class="btn btn-secondary" [routerLink]="['/owners']">Go Back</a>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class OwnerDetailComponent {
  constructor(public state: State) {}
}
