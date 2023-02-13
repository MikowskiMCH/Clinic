import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangeEmail } from '../Interfaces/authentication/management/ChangeEmail.model';
import { ChangePassword } from '../Interfaces/authentication/management/ChangePassword.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { PasswordConfirmationValidatorService } from '../shared/services/password-confirmation-validator.service';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css']
})
export class ProfileManagementComponent implements OnInit {
  name: string;
  role: string;
  email: string;

  showResponse: boolean = false;
  response: string = null;

  changePasswordForm: FormGroup;
  changeEmailForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProfileManagementComponent> ,private jwtService: JwtHelperService, private passConfValid: PasswordConfirmationValidatorService, private service: AuthenticationService){
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtService.decodeToken(token);
    this.name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

  ngOnInit(): void {

    this.changePasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('')
    });

    this.changePasswordForm.get('confirmNewPassword')?.setValidators([Validators.required,
        this.passConfValid.validateConfirmPassword(this.changePasswordForm.get('newPassword'))]);
       
    this.changeEmailForm = new FormGroup({
      newEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  changePassword = (changePasswordFormValue: any) =>{
    this.showResponse = false;
    const formValues = {... changePasswordFormValue};
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtService.decodeToken(token);
    const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    const passwordChanger:  ChangePassword = {
      email: email,
      password: formValues.password,
      newPassword: formValues.newPassword,
      confirmNewPassword: formValues.confirmNewPassword
    };

    this.service.changePassword('api/Account/ChangePassword', passwordChanger).subscribe({
      next: (_) =>{
        window.alert("You succesfully changed your password!")
        window.location.reload()
      },
      error: (_) =>{
        this.showResponse = true;
        this.response = "Password cannot be changed!"
      }
    });
  }

  changeEmail = (changeEmailFormValue: any) =>{
    this.showResponse = false;
    const formValues = {... changeEmailFormValue};
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtService.decodeToken(token);
    const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    const emailChanger: ChangeEmail = {
      email: email,
      newEmail: formValues.newEmail,
      password: formValues.password
    };
    
    this.service.changeEmail('api/Account/ChangeEmail', emailChanger).subscribe({
      next: (_) =>{
        window.alert("You have to relogin now!")
        window.location.reload()
      },
      error: (_) =>{
        this.showResponse = true;
        this.response = "Email address cannot be changed!"
      }
    });
  }

  close = () =>{
    this.dialogRef.close();
  }
}
