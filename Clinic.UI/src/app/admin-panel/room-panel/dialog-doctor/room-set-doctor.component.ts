import { Component, AfterViewInit, OnInit, ViewChild, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { UserForManagement } from "src/app/Interfaces/objects/UserForManagement.model";
import { UserManagementService } from "src/app/shared/services/user-management.service";

@Component({
    selector: 'room-set-doctor',
    templateUrl: 'room-set-doctor.component.html',
  })
  export class SetDoctorDialog implements AfterViewInit, OnInit{
    @Inject(MAT_DIALOG_DATA) public data: UserForManagement;
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'pickElement']
    dataSource = new MatTableDataSource<UserForManagement>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(private router: Router, private userService: UserManagementService, public dialogRef: MatDialogRef<SetDoctorDialog>){}
  
    ngOnInit(): void {
      this.getDoctorsData();
    }
  
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
  
    getDoctorsData(){
      this.userService.getAllInRole('api/User/GetAllInRole/Doctor').subscribe(res=>{
        this.dataSource.data = res as [];
      })
    }

    closeDialog = () =>{
      this.dialogRef.close()
    }
  }