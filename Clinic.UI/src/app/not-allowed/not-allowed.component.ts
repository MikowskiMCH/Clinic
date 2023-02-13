import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.css']
})
export class NotAllowedComponent implements OnInit {
  public returnUrl: string;
  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public navigateToLogin = () =>{
    this.router.navigate(['/authentication/login'], {queryParams: {returnUrl: this.returnUrl }})
  }
}
