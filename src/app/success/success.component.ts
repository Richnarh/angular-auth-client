import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../shared/utils/notification-service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private notification: NotificationService) { }

  ngOnInit(): void {
    this.notification.successMessage('Your login is successful', "Success");
  }

  public  doLogout()
  {
    this.authService.logout();
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login/']);
  }
}
