import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/_models/event';
import { Session } from 'src/app/_models/session';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  addMode: boolean;
  filterBy = 'all';
  sortBy: string;
  rightArrow = faArrowRight;
  downArrow = faArrowDown;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.event = data.event;
      this.addMode = false;
    });
  }

  addSession(): void {
    this.addMode = true;
  }

  saveNewSession(session: Session) {
    if (this.event.sessions.length === 0) {
      session.id = 1;
    } else {
      const maxId = Math.max.apply(null, this.event.sessions.map(s => s.id));
      session.id = maxId + 1;
    }
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
