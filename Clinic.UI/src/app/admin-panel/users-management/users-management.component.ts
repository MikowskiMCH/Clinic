import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserForManagement } from 'src/app/Interfaces/objects/UserForManagement.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForRoleChange } from 'src/app/Interfaces/objects/UserForRoleChange.model';


@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'options'];
  dataSource = new MatTableDataSource<UserForManagement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private usersService: UserManagementService){}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getUsers = () =>{
    this.usersService.getAllUsers('api/User/GetAllUsers').subscribe(res=> {this.dataSource.data = res as []});
  }

  public deleteUser = (id: string)=>{
    this.usersService.deleteUser(`api/User/DeleteUser/${id}`).subscribe({
      next: (_)=>{
        window.location.reload()
      },
      error: (err: HttpErrorResponse)=>{
        alert(`User delete error!`)
      }
    })
  }

  public changeRole = (Role: string, userId: string)=>{
    const user: UserForRoleChange ={
      id: userId,
      newRole: Role
    };
    this.usersService.changeUserRole('api/User/ChangeRole', user).subscribe({
      next: (_)=>{
        window.location.reload();
      },
      error: (err: HttpErrorResponse)=>{
        alert(err.message);
      }
    })
  }
}