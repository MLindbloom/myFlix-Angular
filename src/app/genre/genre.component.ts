import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component for Genre
 * @selector 'app-genre'
 * @templateUrl './genre.component.html'
 * @styleUrls ['../genre.component.scss']
 */

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  /**
   * @description Constructor for the GenreComponent
   * @param data
   * @returns Genre name and description
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { genre: any }) {}

  ngOnInit(): void {}
}
