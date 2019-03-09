import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { NotyService } from 'src/app/_services/noty.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private noty: NotyService
  ) {}

  ngOnInit() {
    this.firstName = new FormControl(
      this.authService.currentUser.firstName,
      Validators.required
    );
    this.lastName = new FormControl(
      this.authService.currentUser.lastName,
      Validators.required
    );

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }
  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  saveProfile(formValues: { firstName: string; lastName: string }) {
    if (this.profileForm.valid) {
      console.log(formValues.firstName, formValues.lastName);
      this.noty.success('Profile info successfully saved!');
      this.router.navigate(['events']);
    }
  }
  cancel() {
    this.router.navigate(['events']);
  }
}
