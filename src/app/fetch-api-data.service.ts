import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://mll-movie-app-2b0ca377526b.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  private userData = new BehaviorSubject<Object>({
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  });
  currentUser = this.userData.asObservable();

  private movies = new BehaviorSubject<Object>({});
  moviesList = this.movies.asObservable();

  /**
   * @constructor
   * @param {HttpClient} http - for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Make an API call for user registration endpoint.
   * @param {any} userDetails - User details for registration.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Make an API call for user login endpoint.
   * @param {any} userDetails - User details for login.
   * @returns {Observable<string>} - Observable for the API response containing the user token.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Make an API call to get all movies.
   * @returns {Observable<any>} - Observable for the API response containing all movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Make an API call for the Get One Movie endpoint.
   * @param {string} title - One movie title.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Make an API call for the Get One Director endpoint.
   * @param {string} directorName - Name of the Director
   * @returns {Observable<any>} - Observable for the API response.
   */
  public getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Make an API call to retrieve a genre by name.
   * @param {string} genreName - Name of the Genre
   * @returns {Observable<any>} - Observable for the API response containing the requested genre.
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/genreName/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Make an API call for the Get Users endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public getUsers(): Observable<any> {
    return this.http
      .get(apiUrl + '/users')
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Makes an API call for get One User endpoint.
   * @returns User details
   */
  public getOneUser() {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.getUsers().subscribe((response) => {
      user = response.filter((item: any) => item.Username == user.Username);
    });
    this.userData.next(user);
    return user;
  }

  /**
   * @desciption Makes an API call to get a User's favorite movies.
   * @returns User's favorite movies
   * @catch Error
   */
  public getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * @description Makes an API call to add a favorite movie to the user's profile.
   * @param {string} movieID - ID of the movie to be added to favorites.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public addFavoriteMovies(movieID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.FavoriteMovies.push(movieID);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .post(
        apiUrl + 'users/' + user.Username + '/movies/' + movieID,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
          responseType: 'text',
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Makes an API call to check if a movie is marked as a favorite.
   * @param {string} movieID - The ID of the movie being checked.
   * @returns {boolean} - True if the movie has been favorited by the user.
   */
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  /**
   * @description Makes an API call to update user information.
   * @param {any} userDetails - New user information.
   * @returns {Observable<any>} - Observable for the API response.
   */
  updateUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + userDetails.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Makes an API call to Delete a User.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log(token);
    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Makes an API call to delete a Favorite Movie from the User Profile.
   * @param {string} movieID - ID of the movie to be deleted from favorites.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public deleteFavoriteMovie(movieID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const index = user.FavoriteMovies.indexOf(movieID);
    console.log(index);
    if (index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Extract non-typed response data from the API response.
   * @param {any} res - API response.
   * @returns {any} - Extracted response data.
   * @private
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * @description Handling of HTTP errors.
   * @param {HttpErrorResponse} error - HTTP error response.
   * @returns {any} - Error details.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
