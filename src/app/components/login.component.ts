import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { State } from '../services/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="container-fluid d-flex py-3 responsive-login justify-content-center"
      style="height: 100vh"
    >
      <img src="../../assets/image.jpg" style="width:60%" />
      <div class="card">
        <div class="card-header custom-theme">Sign In</div>
        <div class="card-body" [formGroup]="loginForm">
          <label for="user-name" class="form-label">User Name:</label>
          <input
            type="text"
            id="user-name"
            class="form-control"
            formControlName="userName"
          />
          <label for="password" class="form-label">Password:</label>
          <input
            type="password"
            id="password"
            class="form-control"
            formControlName="password"
          />
          <button
            type="button"
            class="btn custom-theme my-3 mx-auto d-block"
            (click)="handleSubmit()"
            [disabled]="loginForm.invalid || (state.isLoading$ | async)"
          >
            Login
          </button>
          <div class="text-bg-danger p-3" *ngIf="isLoginError">
            The User Name or Password is Invalid
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoginError = false;
  subscription: Subscription | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    public state: State
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.state.getUser()) {
      this.navigateToOwners();
    }
  }

  handleSubmit() {
    this.isLoginError = false;
    const { userName, password } = this.loginForm.value;
    this.subscription = this.api.login(userName, password).subscribe({
      next: (validUser) => {
        if (validUser) {
          this.navigateToOwners();
        } else {
          this.isLoginError = true;
        }
      },
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  navigateToOwners() {
    this.router.navigate(['/owners']);
  }
}
