import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { LoginI } from '../../models/login.interface';
import { Router } from '@angular/router';
import { ResponseI } from '../../models/response.interface';

import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    usuario: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private api: ApiService, private router: Router, private http: HttpClient) { }

  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: any) {
    const document = form.usuario;
    const password = form.password;
    const data = { document, password };

    this.http.post('https://apilab3.azurewebsites.net/login', data)
    //this.http.post('http://127.0.0.1:8000/login', data)
      .pipe(
        map((response: any) => {
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            this.router.navigate(['dashboard']);
          } else {
            throw new Error('Credenciales incorrectas, intenta de nuevo');
          }
        }),
        catchError((error: any) => {
          if (error.status === 401) {
            throw new Error('Credenciales incorrectas, intenta de nuevo');
          } else {
            console.error('Error de conexión:', error);
            throw new Error('Error: Algo salió mal, intenta de nuevo más tarde');
          }
        })
      )
      .subscribe(
        () => {},
        (error: any) => {
          this.errorStatus = true;
          this.errorMsj = error.message;
        }
      );
  }

}
