import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/_services/event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from 'src/app/_models/event';
import { locationOrUrlValidator } from 'src/app/_validators/location-or-url.validators';
import { dateValidator } from 'src/app/_validators/date.validators';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {
  newEvent: Event;
  isDirty = true;
  newEventForm: FormGroup;

  constructor(
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const basicLocation = this.fb.group({
      address: [''],
      city: [''],
      country: ['']
    });

    this.newEventForm = this.fb.group(
      {
        name: ['', Validators.required],
        date: ['', [Validators.required, dateValidator]],
        time: ['', Validators.required],
        price: ['', Validators.required],
        location: basicLocation,
        url: [''],
        imageUrl: [
          '',
          [Validators.required, Validators.pattern('.*/.*.(png|jpg)')]
        ]
      },
      { validators: locationOrUrlValidator }
    );

    console.log(this.newEventForm.invalid);
  }

  get eventName() {
    return this.newEventForm.get('name');
  }

  get eventDate() {
    return this.newEventForm.get('date');
  }

  get eventTime() {
    return this.newEventForm.get('time');
  }

  get eventPrice() {
    return this.newEventForm.get('price');
  }

  get eventLocation() {
    return this.newEventForm.get('location');
  }

  get eventAddress() {
    return this.eventLocation.get('address');
  }

  get eventCity() {
    return this.eventLocation.get('city');
  }

  get eventCountry() {
    return this.eventLocation.get('country');
  }

  get eventUrl() {
    return this.newEventForm.get('url');
  }

  get eventImgUrl() {
    return this.newEventForm.get('imageUrl');
  }

  saveEvent(formValues: any) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}
