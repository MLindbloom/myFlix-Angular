import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  user = JSON.parse(localStorage.getItem('user') || '');

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

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

  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

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

  public removeFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  public getGenre(genre: any) {
    this.dialog.open(GenreComponent, {
      width: '500px',
      height: '300px',
      data: { genre: genre },
    });
  }

  public getOneDirector(director: any) {
    this.dialog.open(DirectorComponent, {
      width: '500px',
      height: '300px',
      data: { director: director },
    });
  }

  public openMovieDetails(details: string) {
    this.dialog.open(MovieDetailsComponent, {
      width: '500px',
      height: '300px',
      data: { details: details },
    });
  }
}
