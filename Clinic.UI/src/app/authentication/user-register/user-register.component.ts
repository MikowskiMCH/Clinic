import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from 'src/app/Interfaces/authentication/register/UserForRegister.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PasswordConfirmationValidatorService } from 'src/app/shared/services/password-confirmation-validator.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public hide = true;
  public hide2 = true;
  public errorMessage: string = '';
  public showError: boolean;

  constructor(private authService: AuthenticationService, private passConfValid: PasswordConfirmationValidatorService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      pesel: new FormControl('', [Validators.required]),
      allergies: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('')
    });
    this.registerForm.get('passwordConfirm')?.setValidators([Validators.required,
      this.passConfValid.validateConfirmPassword(this.registerForm.get('password'))]);
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName).hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };
    const user: UserForRegister = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      pesel: formValues.pesel,
      allergies: formValues.allergies,
      gender: formValues.gender,
      email: formValues.email,
      password: formValues.password,
      passwordConfirm: formValues.passwordConfirm,
    };
    this.authService.registerUser("api/Account/Register", user)
    .subscribe({
      next: (_) => {
        this.router.navigate(['/authentication/login']),
        alert("Register Succesfull! Now you can login")
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}
