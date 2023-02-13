import { Component, OnInit, AfterViewInit, ViewChild, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { UserForManagement } from "src/app/Interfaces/objects/UserForManagement.model";
import { UserManagementService } from "src/app/shared/services/user-management.service";

@Component({
    selector: 'room-set-nurse',
    templateUrl: 'room-set-nurse.component.html',
})
    export class SetNurseDialog implements OnInit, AfterViewInit{
    @Inject(MAT_DIALOG_DATA) public data: UserForManagement;
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'pickElement']
    dataSource = new MatTableDataSource<UserForManagement>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private router: Router, private userService: UserManagementService, public dialogRef: MatDialogRef<SetNurseDialog>){}

    ngOnInit(): void {
        this.getNursesData()
    }
    
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter = (event: Event) =>{
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getNursesData = ()=>{
        this.userService.getAllInRole('api/User/GetAllInRole/Nurse').subscribe(res=>{
            this.dataSource.data = res as [];
        })
    }
    closeDialog = ()=>{
        this.dialogRef.close()
    }
}