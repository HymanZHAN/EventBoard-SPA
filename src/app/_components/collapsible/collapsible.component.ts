import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {
  isCollapsed: boolean;
  constructor() {}

  ngOnInit() {
    this.isCollapsed = true;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
