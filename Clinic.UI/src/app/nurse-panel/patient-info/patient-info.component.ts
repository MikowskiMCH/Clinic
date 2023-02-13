import { state } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserForManagement } from 'src/app/Interfaces/objects/UserForManagement.model';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements AfterViewInit, OnInit {
  showError: boolean = false;
  errorResponse: string;
  displayedColumns: string[] = ['firstName', 'lastName', 'role', 'options'];
  dataSource = new MatTableDataSource<UserForManagement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private userService: UserManagementService){}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData = () =>{
    this.showError = false;
    this.userService.getAllUsers('api/User/GetAllUsers').subscribe({
      next: (res) =>{
        this.dataSource.data = res as [];
      },
      error: (_) =>{
        this.showError = true;
        this.errorResponse = 'There are no patients yet!';
      }
    })
  }

  getAppointments = (patientId: string) =>{
    this.router.navigate(['/nurse-panel/patient-appointments', {Id: patientId}],)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}