import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * @description Component for the Movie Card.
 * @selector 'app-movie-card'
 * @templateUrl './movie-card.component.html'
 * @styleUrls ['./movie-card.component.scss']
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  user = JSON.parse(localStorage.getItem('user') || '');

  /**
   * @constructor - Constructor for MovieCardComponent.
   * @param {FetchApiDataService} fetchApiData - Fetchs data from the API.
   * @param {Router} router Router service for navigation.
   * @param {MatDialog} dialog - Material dialog service for opening dialogs.
   * @param {MatSnackBar} snackBar - Material SnackBar service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllMovies();
  }

  /**
   * @description Function for getting all movies.
   * @returns All movies.
   */
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * @description Function for getting Favorite Movie list.
   * @returns Favorite Movie list
   * */
  getFavorites(): void {
    this.fetchApiData.getOneUser().subscribe(
      (resp: any) => {
        if (resp.user && resp.user.FavoriteMovies) {
          this.favorites = resp.user.FavoriteMovies;
        } else {
          this.favorites = [];
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.favorites = [];
      }
    );
  }

  /**
   * @description Function to check if movie is in Favorite Movie list
   * @param {string} movieID - ID of the movie checked
   * @returns boolean
   * */
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  /**
   * @description Function to add a movie to the Favorite Movies list
   * @param {string} id - Movie id
   * @returns Message 'Movie added to favorites'
   * */
  public addToFavorites(id: string): void {
    if (this.isFavoriteMovie(id)) {
      this.removeFavoriteMovie(id);
    } else {
      this.fetchApiData.addFavoriteMovies(id).subscribe(() => {
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
        this.getFavorites();
      });
    }
  }

  /**
   * @description Function to remove a movie from the Favorite Movies list
   * @param {string} id - Movie id
   * @returns Message 'Removed from favorites'
   */
  public removeFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * @description Function to open Genre information from GenreComponent
   * @param genre - Movie genre
   * @returns Genre name and description
   * */
  public getGenre(genre: any) {
    this.dialog.open(GenreComponent, {
      width: '500px',
      height: '300px',
      data: { genre: genre },
    });
  }

  /**
   * @description Function to open Director information from DirectorComponent
   * @param director - Movie director name
   * @returns Director name and description
   * */
  public getOneDirector(director: any) {
    this.dialog.open(DirectorComponent, {
      width: '500px',
      height: '300px',
      data: { director: director },
    });
  }

  /**
   * @description Function to open Movie Synopsis from MovieDetailsComponent
   * @param {string} details - Movie synopsis
   * @returns Movie title and synopsis
   * */
  public openMovieDetails(details: string) {
    this.dialog.open(MovieDetailsComponent, {
      width: '500px',
      height: '300px',
      data: { details: details },
    });
  }
}
