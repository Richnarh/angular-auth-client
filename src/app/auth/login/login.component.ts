import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginDto } from 'src/app/models/loginDto';
import { NotificationService } from 'src/app/shared/utils/notification-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginDto: LoginDto;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
    ) { }

  ngOnInit(): void {
    this.initCtrl();
  }

  public initCtrl(): void{
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  public async login()
  {
    try{
      
    this.loginDto = this.loginForm.value;

    if(this.loginForm.invalid)
    {
      this.notification.error('All fields required');
      return;
    }
    const response = await this.authService.doLogin(this.loginDto);

    localStorage.setItem('token',response.token);

    const token = localStorage.getItem('token');
    
    console.log('login token -- ', localStorage.getItem('token'))

    if(token === null || token == undefined)
    {
      this.notification.errorMessage('Please provide correct login details', 'Error');
      return;
    }
    this.router.navigate(['/success/']);
    
  } catch (error) { } finally { }
  }
}
