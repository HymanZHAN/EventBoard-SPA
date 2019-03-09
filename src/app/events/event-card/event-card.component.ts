import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from 'src/app/_models/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event: Event;
  @Output() clickEvent = new EventEmitter();

  someProperty: any = 'some properties';

  logClick() {
    console.log(this.event.name);
    this.clickEvent.emit('Msg from child!');
  }

  logFoo() {
    console.log('child: Foo!');
  }
}
