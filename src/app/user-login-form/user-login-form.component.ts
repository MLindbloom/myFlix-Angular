import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @description Component for the User Login Form.
 * @selector 'app-user-login-form'
 * @templateUrl './user-login-form.component.html'
 * @styleUrls ['./user-login-form.component.scss']
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Fetches data from the API.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Material dialog service for opening user login dialog.
   * @param {MatSnackBar} snackBar - Material SnackBar service for displaying notifications.
   * @param {Router} router - Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * @description Function for sending the form inputs to the database.
   * @returns Message "User login successful" / "User login failed"
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('User login successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      error: (result) => {
        this.snackBar.open('User login failed', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
