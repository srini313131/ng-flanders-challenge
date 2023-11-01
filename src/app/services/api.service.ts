import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, last, map, tap } from 'rxjs/operators';

import { State } from './state.service';
import { of } from 'rxjs';
import { Owner } from '../types';
const API_ENDPOINT =
  'https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private state: State) {}

  login(userName: string, password: string) {
    this.state.showLoader(true);
    // to randomly generate a number between 100 and 600 to be used to delay the stream
    const DELAY = Math.floor(Math.random() * 500) + 100;
    return this.http.get<{ users: any[] }>('./assets/users.json').pipe(
      map((res) => {
        return res.users.find(
          (user) => user.userName === userName && user.password === password
        )
          ? true
          : false;
      }),
      delay(DELAY),
      tap((isValidUser) => {
        // set the user name in session storage for authentication
        if (isValidUser) this.state.setUser(userName);
        this.state.showLoader(false);
      }),
      catchError((_) => {
        return of(false);
      })
    );
  }

  getOwners() {
    this.state.showLoader(true);

    this.http
      .get<Owner[]>(API_ENDPOINT)
      .pipe(
        map((data) => data.map((item, i) => ({ ...item, id: i + 1 }))),
        tap((data) => {
          this.state.owners$.next(data);
          this.state.showLoader(false);
        }),
        first()
      )
      .subscribe();
  }
}
