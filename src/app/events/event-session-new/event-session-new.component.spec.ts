import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSessionNewComponent } from './event-session-new.component';

describe('EventSessionNewComponent', () => {
  let component: EventSessionNewComponent;
  let fixture: ComponentFixture<EventSessionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSessionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSessionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
