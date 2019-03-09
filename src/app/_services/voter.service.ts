import { Injectable } from '@angular/core';
import { Session } from '../_models/session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  deleteVoter(eventId: number, session: Session, voterName: string) {
    session.voters = session.voters.filter(voter => voter !== voterName);

    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http
      .delete(
        this.baseUrl +
          `events/${eventId}/sessions/${session.id}/voters/${voterName}`,
        (options = options)
      )
      .pipe(catchError(this.handleError('deleteVoter')))
      .subscribe();
  }

  addVoter(eventId: number, session: Session, voterName: string) {
    session.voters.push(voterName);

    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http
      .post(
        this.baseUrl +
          `events/${eventId}/sessions/${session.id}/voters/${voterName}`,
        {},
        (options = options)
      )
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }
}
