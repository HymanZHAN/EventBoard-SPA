import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Session } from '../_models/session';
import { EventService } from '../_services/event.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isCollapsed = true;
  foundSessions: any[];
  searchTerm: string;
  modalRef: BsModalRef;

  constructor(
    public auth: AuthService,
    private eventService: EventService,
    private modalService: BsModalService
  ) {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  searchSessions() {
    this.eventService
      .searchSessions(this.searchTerm)
      .subscribe((sessions: any) => {
        this.foundSessions = sessions;
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  login() {
    return this.auth.login();
  }

  logout() {
    return this.auth.logout();
  }

  getProfile() {
    return this.auth.getProfile();
  }

  isAdmin() {
    return this.auth.isAdmin();
  }
}
