import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component for the Director
 * @selector 'app-director'
 * @templateUrl './director.component.html'
 * @styleUrls ['../director.component.scss']
 */

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  /**
   * @description Constructor for the DirectorComponent
   * @param data
   * @returns Director name and description
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { director: any }) {}

  ngOnInit(): void {}
}
