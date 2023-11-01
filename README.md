# NgFlandersChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## About the App
  - This is simple app that lists pet owners and detail page that shows the pets owned by the owner.
  - The app implements Login & Logout functionality using the browser session storage.
  - The app implements protected routes using canActivate route guard. Unauthenticated users  trying to access the protected routes will be redirected to login page.
  - After sucessful Login user is redirected to "/owners" path which lists pet owners
  - clicking on "View Pets" shows the pets owned by the owner with the app url being "owners/{ownerName}"
  - Used Bootstrap for responsive layouts
  
