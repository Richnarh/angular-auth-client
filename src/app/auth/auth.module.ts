import { NgModule } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [NavComponent]
})
export class AuthModule { }
