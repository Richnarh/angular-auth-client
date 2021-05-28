import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RegisterDto } from '../models/registerDto';
import { LoginDto } from '../models/loginDto';
import { ResponseObj } from '../shared/utils/base_service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "http://localhost:8000/api/v1";

  public async saveUserAccount(registerDto: RegisterDto)
  {
    try {
      const response = await this.httpClient.post<any>(`${this.baseUrl}/register/`, registerDto, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError))
      .toPromise();

      return response;

    } catch (error) {
      console.log(error);
    }
    return null;
  }

  public async doLogin(loginDto: LoginDto)
  {
    try {
      const response = await this.httpClient.post<any>('http://localhost:8000/api/v1/login/', loginDto, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).toPromise();

      console.log('TOKEN -- ', response.token)
      if(response.status===400)
      {
        console.log('40000000000')
      }
      return response;

    } catch (error) {
      console.log(error);
    }

    return null;
  }

  public logout()
  {
    
    try {
      return this.httpClient.post<any>('http://localhost:8000/api/v1/logout/',{
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError))
      .toPromise();


    } catch (err) {
      console.log(err.error.message);
    }
  }

  
  private handleError(errorResponse: HttpErrorResponse)
  {
    if (errorResponse.error instanceof ErrorEvent)
    {
      console.error('Client side error: ', errorResponse.error);
    }
    else
    {
      console.error('Server side error: ', errorResponse);
    }
    return throwError('There is a problem with the service.');
  }
}
