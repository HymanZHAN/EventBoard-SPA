import { Component, OnInit } from '@angular/core';
import { EventService } from '../../_services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/_models/event';

@Component({
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
  }
}
