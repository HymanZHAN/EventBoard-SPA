import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventNewComponent } from './events/event-new/event-new.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { EventListResolverService } from './_services/event-list-resolver.service';
import { EventSessionComponent } from './events/event-session/event-session.component';
import { EventSessionNewComponent } from './events/event-session-new/event-session-new.component';
import { EventResolverService } from './_services/event-resolver.service';

const routes: Routes = [
  {
    path: 'events',
    component: EventListComponent,
    resolve: { events: EventListResolverService }
  },
  {
    path: 'event/new',
    component: EventNewComponent,
    canDeactivate: ['canDeactivateEventNew']
  },
  {
    path: 'events/:id',
    component: EventDetailComponent,
    resolve: { event: EventResolverService }
  },
  { path: 'event/session/new', component: EventSessionNewComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
