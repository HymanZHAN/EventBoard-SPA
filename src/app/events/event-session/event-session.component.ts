import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Session } from 'src/app/_models/session';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/_services/auth.service';
import { VoterService } from 'src/app/_services/voter.service';

@Component({
  selector: 'app-event-session',
  templateUrl: './event-session.component.html',
  styleUrls: ['./event-session.component.scss']
})
export class EventSessionComponent implements OnChanges {
  @Input() sessions: Session[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;

  visibleSessions: Session[];
  faFire = faFire;

  constructor(
    public authService: AuthService,
    private voterService: VoterService
  ) {}

  ngOnChanges() {
    if (this.sessions) {
      this.sortSessions(this.sortBy);
      this.filterSessions(this.filterBy);
    }
  }

  filterSessions(filter: string) {
    if (filter !== 'all') {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    } else {
      this.visibleSessions = [...this.sessions];
    }
  }

  sortSessions(sortBy: string) {
    if (sortBy === 'name') {
      this.sessions.sort((s1, s2) => {
        return s1.name.localeCompare(s2.name);
      });
    } else if (sortBy === 'voters') {
      this.sessions.sort((s1, s2) => {
        return s2.voters.length - s1.voters.length;
      });
    }
  }

  toggleVote(session: Session) {
    if (this.hasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        // tslint:disable-next-line: no-string-literal
        this.authService.getProfile()['name']
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        // tslint:disable-next-line: no-string-literal
        this.authService.getProfile()['name']
      );
    }

    if (this.sortBy === 'votes') {
      this.sortSessions('voters');
    }
  }

  hasVoted(session: Session) {
    // tslint:disable-next-line: no-string-literal
    return session.voters.includes(this.authService.getProfile()['name']);
  }
}
