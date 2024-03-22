import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the movie details/synopsis
 * @selector 'app-movie-details'
 * @templateUrl './movie-details.component.html'
 * @styleUrls ['./movie-details.component.scss']
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  /**
   * @constructor - Constructor for MovieDetailsComponent.
   * @param data - Data containing movie discription.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { details: string }) {}

  ngOnInit(): void {}
}
