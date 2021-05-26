import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from 'src/app/models/registerDto';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/shared/utils/notification-service';
import { SystemValidators } from 'src/app/shared/utils/system.validators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
  registerForm: FormGroup;
  registerDto:RegisterDto;


  clientResponse: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private route: Router
  ) { }

  ngOnInit(): void
  {
    this.initCtrls();
  }

  public initCtrls(): void
  {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: [''],
    });
  }

  public async saveRegistration()
  {

    const pass1: string = this.registerForm.get('password').value;
    const pass2: string = this.registerForm.get('password2').value;

    if (SystemValidators.matchPassword(pass1, pass2))
    {
      this.registerDto = this.registerForm.value;

      if(this.registerForm.invalid)
      {
        this.notification.error('All fields required');
        return;
      }
      const response = await this.authService.saveUserAccount(this.registerDto);

      console.log('token -- ', response.token)
      
      localStorage.setItem('token',response.token);
      this.route.navigate(['/success/']);
      
      if(response != null)
      {
        this.notification.successMessage('Registeration successful','success');
      }
    }
    else
    {
      this.notification.errorMessage('Password do not match', 'Error');
    }
  }
}
