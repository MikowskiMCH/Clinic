import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword } from 'src/app/Interfaces/authentication/login/ForgotPassword.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  showError: boolean;
  showSucces: boolean;
  errorMessage: string;
  succesMessage: string;

  constructor(private authService: AuthenticationService, private router: Router){}

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  public validateControl=(controlName: string)=>{
    return this.forgotForm.get(controlName).invalid && this.forgotForm.get(controlName).touched
  }

  public hasError=(controlName: string, errorName: string)=>{
    return this.forgotForm.get(controlName).hasError(errorName)
  }

  public forgotPassword=(forgotPasswordValue: any)=>{
    this.showError = false;
    const formValues = {...forgotPasswordValue};

    const forgotPassword: ForgotPassword ={
      Email: formValues.email,
      ClientUri: 'http://localhost:4200/authentication/reset-password'
    }

    this.authService.forgotPassword('api/account/ForgotPassword', forgotPassword)
    .subscribe({
      next:(_) =>{
        this.succesMessage = 'The link has been sent on your e-mail.'
        this.showSucces = true;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })

  }
}
