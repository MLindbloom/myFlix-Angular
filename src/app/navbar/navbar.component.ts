import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @description Component for the navbar.
 * @selector 'app-navbar'
 * @templateUrl './navbar.component.html'
 * @styleUrls ['./navbar.component.scss']
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /**
   * @constructor - Constructor for NavbarComponent.
   * @param {Router} router - Router service for navigation.
   */
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * @description navbar element to navigate to movies/home page
   */
  public openMovieList(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navbar element to navigate to the Profile Page
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @description Function for logging out the user
   * @returns user and token removed from local storage
   * @returns user navigated to welcome page
   */

  public logoutUser(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['welcome']);
  }
}
