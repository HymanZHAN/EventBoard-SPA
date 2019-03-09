import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule]
})
export class UserModule {}
