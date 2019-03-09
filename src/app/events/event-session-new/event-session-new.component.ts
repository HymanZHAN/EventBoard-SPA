import { Component, OnInit, Output } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { restrictedWords } from 'src/app/_validators/restricted-words.validator';
import { Session } from 'src/app/_models/session';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-session-new',
  templateUrl: './event-session-new.component.html',
  styleUrls: ['./event-session-new.component.scss']
})
export class EventSessionNewComponent implements OnInit {
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();

  newSessionForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.newSessionForm = this.fb.group({
      name: ['', Validators.required],
      presenter: ['', Validators.required],
      duration: ['', Validators.required],
      level: ['', Validators.required],
      abstract: [
        '',
        [
          Validators.required,
          Validators.maxLength(400),
          restrictedWords(['foo', 'bar'])
        ]
      ]
    });
  }

  get name() {
    return this.newSessionForm.get('name');
  }

  get presenter() {
    return this.newSessionForm.get('presenter');
  }

  get duration() {
    return this.newSessionForm.get('duration');
  }

  get level() {
    return this.newSessionForm.get('level');
  }

  get abstract() {
    return this.newSessionForm.get('abstract');
  }

  saveSession(formValues: {
    name: string;
    presenter: string;
    duration: string | number;
    level: string;
    abstract: string;
  }) {
    const session: Session = {
      id: undefined,
      name: formValues.name,
      presenter: formValues.presenter,
      duration: +formValues.duration,
      level: formValues.level,
      abstract: formValues.abstract,
      voters: []
    };

    this.saveNewSession.emit(session);
  }

  cancel() {
    this.cancelAddSession.emit();
  }
}
