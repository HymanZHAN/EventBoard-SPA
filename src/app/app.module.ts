import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { NavComponent } from './nav/nav.component';
import { EventService } from './_services/event.service';
import { EventCardComponent } from './events/event-card/event-card.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventNewComponent } from './events/event-new/event-new.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { EventListResolverService } from './_services/event-list-resolver.service';
import { AuthService } from './_services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventSessionComponent } from './events/event-session/event-session.component';
import { EventSessionNewComponent } from './events/event-session-new/event-session-new.component';
import { CollapsibleComponent } from './_components/collapsible/collapsible.component';
import { DurationPipe } from './_pipes/duration.pipe';
import { NotyService } from './_services/noty.service';
import { UpvoteComponent } from './events/upvote/upvote.component';
import { VoterService } from './_services/voter.service';
import { HttpClientModule } from '@angular/common/http';
import { EventResolverService } from './_services/event-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventCardComponent,
    NavComponent,
    EventDetailComponent,
    EventNewComponent,
    PageNotFoundComponent,
    EventSessionComponent,
    EventSessionNewComponent,
    CollapsibleComponent,
    DurationPipe,
    UpvoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    EventService,
    EventListResolverService,
    EventResolverService,
    { provide: 'canDeactivateEventNew', useValue: checkDirtyState },
    NotyService,
    BsModalRef,
    VoterService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function checkDirtyState(component: EventNewComponent) {
  if (component.isDirty) {
    return window.confirm(
      'You have not saved this event. Do you really want to cancel?'
    );
  }
  return true;
}
