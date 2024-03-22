import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * @description Component for the Profile Page.
 * @selector 'app-user-profile'
 * @templateUrl './user-profile.component.html'
 * @styleUrls ['./user-profile.component.scss']
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any = { Username: '', Password: '', Email: '', Birthday: '' };

  FavoriteMovies: any[] = [];
  movies: any[] = [];
  favorites: any[] = [];

  /**
   * @constructor - Constructor for the  Profile Page Component.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {Router} router - Router service for navigation.
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
    this.loadUser();
    this.getAllMovies();
  }

  /**
   * @description Function for getting the User.
   * @returns User's data and favorite movies.
   */
  public loadUser(): void {
    this.user = this.fetchApiData.getOneUser();
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) =>
        this.user.FavoriteMovies.includes(movie._id)
      );
    });
  }

  /**
   * @description Function for navigating back to movies
   * @returns Navigates to movies
   */
  public back(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @description Function for updating User information.
   * @returns Message "User update successful" / "Failed to update user"
   */
  updateUser(): void {
    this.fetchApiData.updateUser(this.user).subscribe({
      next: (result) => {
        console.log('User update success:', result);
        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('User update successful', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.snackBar.open('Failed to update user', 'OK', {
          duration: 2000,
        });
      },
    });
  }
  /**
   * @description Function for deleting a User.
   * @returns Confirmation pop up 'Delete account?' / 'Your account has been deleted'
   */
  deleteUser(): void {
    if (confirm('Delete account?')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear();
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 3000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
      });
    }
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
   * @description Function for getting the list of Favorite Movies
   * @returns The list of Favorite Movies
   */
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

  /**
   * @description Function for adding a movie to the Favorite Movies list
   * @param {string} id - Movie id
   * @returns Message 'Movie added to favorites'
   */
  addToFavorites(id: string): void {
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
   * @description Function for deleting a movie from the Favorite Movies list
   * @param {string} id - Movie id
   * @returns Message 'Removed from favorites'
   */
  removeFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }
  /**
   * @description Function for getting the movie Genre
   * @param genre Movie genre name
   * @returns Information about the movie's Genre
   */
  public getGenre(genre: any) {
    this.dialog.open(GenreComponent, {
      width: '500px',
      height: '300px',
      data: { genre: genre },
    });
  }

  /**
   * @description Function for getting the Director information
   * @param director Movie Director name
   * @returns Information about the movie's Director
   */
  public getOneDirector(director: any) {
    this.dialog.open(DirectorComponent, {
      width: '500px',
      height: '300px',
      data: { director: director },
    });
  }
  /**
   * @description Function for getting the movie synopsis
   * @param details Movies synopsis
   * @returns The synopsis of the movie
   */
  public openMovieDetails(details: string) {
    this.dialog.open(MovieDetailsComponent, {
      width: '500px',
      height: '300px',
      data: { details: details },
    });
  }
}
