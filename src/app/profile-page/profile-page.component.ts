import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any = { Username: '', Password: '', Email: '', Birth: '' };

  FavoriteMovies: any[] = [];
  movies: any[] = [];
  favorites: any[] = [];

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

  public loadUser(): void {
    this.user = this.fetchApiData.getOneUser();
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) =>
        this.user.FavoriteMovies.includes(movie._id)
      );
    });
  }

  public back(): void {
    this.router.navigate(['movies']);
  }

  public updateUser(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '450px',
      height: '450px',
      data: {
        title: 'UPDATE USER',
        button: 'Update',
        function: 'updateUser()',
      },
    });
    this.fetchApiData.currentUser.subscribe(
      (userData) => (this.user = userData)
    );
  }

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

  removeFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  public getGenre(genre: any) {
    this.dialog.open(GenreComponent, {
      width: '400px',
      height: '300px',
      data: { genre: genre },
    });
  }

  public getOneDirector(director: any) {
    this.dialog.open(DirectorComponent, {
      width: '400px',
      height: '300px',
      data: { director: director },
    });
  }

  public openMovieDetails(details: string) {
    this.dialog.open(MovieDetailsComponent, {
      width: '400px',
      height: '300px',
      data: { details: details },
    });
  }
}
