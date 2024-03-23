# myFlix Angular Movie App

## Overview

myFlix is a movie application built using Angular. It allows users to browse a collection of movies, view details about each movie, add movies to their favorites list, and more.

## Features

- Browse a collection of movies
- View details about each movie including synopsis, genre, director, and release year
- Add movies to favorites list
- Search for movies
- Sort movies by title, genre, or release year

## Technologies Used

- Angular
- Express
- RxJS
- TypeScript

## Dependencies

- **Angular Packages:**
  - `@angular/animations`: ^17.0.0
  - `@angular/cdk`: ^17.0.4
  - `@angular/common`: ^17.0.0
  - `@angular/compiler`: ^17.0.0
  - `@angular/core`: ^17.0.0
  - `@angular/forms`: ^17.0.0
  - `@angular/material`: ^17.0.4
  - `@angular/platform-browser`: ^17.0.0
  - `@angular/platform-browser-dynamic`: ^17.0.0
  - `@angular/platform-server`: ^17.0.0
  - `@angular/router`: ^17.0.0
  - `@angular/ssr`: ^17.0.7

- **Other Dependencies:**
  - `express`: ^4.18.2
  - `rxjs`: ~7.8.0
  - `zone.js`: ~0.14.2

## Development Dependencies

- `@angular-devkit/build-angular`: ^17.0.7
- `@angular/cli`: ^17.0.7
- `@angular/compiler-cli`: ^17.0.0
- `@types/express`: ^4.17.17
- `@types/jasmine`: ~5.1.0
- `@types/node`: ^18.18.0
- `angular-cli-ghpages`: ^2.0.0-beta.2
- `jasmine-core`: ~5.1.0
- `karma`: ~6.4.0
- `karma-chrome-launcher`: ~3.2.0
- `karma-coverage`: ~2.2.0
- `karma-jasmine`: ~5.1.0
- `karma-jasmine-html-reporter`: ~2.1.0
- `typedoc`: ^0.25.12
- `typescript`: ~5.2.2

## Scripts

- `ng serve`: Start the development server.
- `ng build`: Build the project.
- `ng build --watch --configuration development`: Build the project and watch for changes in development mode.
- `ng test`: Run tests.
- `node dist/my-flix-angular/server/server.mjs`: Serve the built Angular application using Express server-side rendering (SSR).

## Usage

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the development server using `ng serve`.
4. Navigate to `http://localhost:4200/` in your browser to access the application.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
