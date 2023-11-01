import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Owner } from '../types';

const LOCAL_STOTAGE_KEY = 'flanders-app';
@Injectable({
  providedIn: 'root',
})
export class State {
  isLoading$ = new BehaviorSubject<boolean>(false);
  owners$ = new BehaviorSubject<Owner[]>([]);
  selectOwner$ = new BehaviorSubject<Owner | undefined>(undefined);

  // set the user in local storage
  setUser(userName: string) {
    sessionStorage.setItem(LOCAL_STOTAGE_KEY, userName);
  }
  //get logged in user name from local storage
  getUser() {
    return sessionStorage.getItem(LOCAL_STOTAGE_KEY);
  }
  // logout and remove user from locaalstorage
  logout() {
    sessionStorage.removeItem(LOCAL_STOTAGE_KEY);
  }

  showLoader(value: boolean) {
    this.isLoading$.next(value);
  }
}
