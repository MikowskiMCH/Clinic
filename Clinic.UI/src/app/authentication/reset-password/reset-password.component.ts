import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/Interfaces/authentication/login/ResetPassword.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PasswordConfirmationValidatorService } from 'src/app/shared/services/password-confirmation-validator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  hide1: boolean = false;
  hide2: boolean = false;
  showError: boolean;
  errorMessage: string;

  private token: string;
  private email: string;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private passConfirmValidatorService: PasswordConfirmationValidatorService){}

  public ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [])
    });
    this.resetForm.get('confirmPassword').setValidators([Validators.required,this.passConfirmValidatorService.validateConfirmPassword(this.resetForm.get('password'))])
    
  this.token = this.route.snapshot.queryParams['token'];
  this.email = this.route.snapshot.queryParams['email'];
  }

  public validateControl=(controlName: string) => {
    return this.resetForm.get(controlName).valid && this.resetForm.get(controlName).touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetForm.get(controlName).hasError(errorName);
  }

  public resetPassword = (resetForm: any) => {
    this.showError = false;
    const formValues = {...resetForm};

    const resetPassword: ResetPassword = {
      Email: this.email,
      Password: formValues.password,
      ConfirmPassword: formValues.confirmPassword,
      Token: this.token
    }

    this.authService.resetPassword('api/account/ResetPassword', resetPassword)
    .subscribe({
      next: (_) => {
        alert("You succesfully changed your password! Now you can login by using it.")
        this.router.navigate(['/authentication/login'])
      },
      error: (err : HttpErrorResponse) =>{
        this.showError = true;
        this.errorMessage = err.message;
      }
    })
  }
}
