import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserForLogin } from 'src/app/Interfaces/authentication/login/UserForLogin.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from 'src/app/Interfaces/authentication/login/LoginResponse.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
  public showError: boolean;
  public hide: boolean = true;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName).hasError(errorName)
  }

  public loginUser(loginFormValue: any){
    this.showError = false;
    const formValues = {...loginFormValue};
    const user: UserForLogin = {
      Password: formValues.password,
      Email: formValues.email,
      ClientURI: 'http://localhost:4200/authentication/forgot-password'
    }
    this.authService.loginUser("api/Account/Login", user)
    .subscribe({
      next: (res: LoginResponse) => {
        localStorage.setItem("token", res.token);
        this.authService.authState(res.success)
        this.router.navigate(["/home"])
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }

}
