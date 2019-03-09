import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Event } from '../_models/event';
import { Session } from '../_models/session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  emitter = new EventEmitter(true);

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getEvents(): Observable<Event[]> {
    return this.http
      .get<Event[]>(this.baseUrl + 'events')
      .pipe(catchError(this.handleError<Event[]>('getEvents', [])));
  }

  getEvent(id: number): Observable<Event> {
    return this.http
      .get<Event>(this.baseUrl + 'events/' + String(id))
      .pipe(catchError(this.handleError<Event>('getEvent')));
  }

  saveEvent(event: Event) {
    event.id = 999;
    event.sessions = [];
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
      .post<Event>(this.baseUrl + 'events/', event, (options = options))
      .pipe(catchError(this.handleError<Event>('saveEvent')));
  }

  updateEvent(event: Event) {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
      .put<Event>(this.baseUrl + 'events/', event, (options = options))
      .pipe(catchError(this.handleError<Event>('saveEvent')));
  }

  searchSessions(searchTerm: string): Observable<Session[]> {
    const term = searchTerm.toLocaleLowerCase();

    return this.http.get<Session[]>(this.baseUrl + 'sessions/', {
      params: { search: term }
    }).pipe(catchError(this.handleError<Session[]>('searchSessions')));
  }
}
