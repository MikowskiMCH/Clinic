import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RoomForManagement } from 'src/app/Interfaces/objects/RoomForManagement.model';
import { UserForManagement } from 'src/app/Interfaces/objects/UserForManagement.model';
import { RoomManagementService } from 'src/app/shared/services/room-management.service';
import { CreateRoomDialog } from '../dialog-create-room/room-create.component';
import { SetDoctorDialog } from '../dialog-doctor/room-set-doctor.component';
import { SetNurseDialog } from '../dialog-nurse/room-set-nurse.component';
import { SetSpecjalizationDialog } from '../dialog-specjalization/room-set-specjalization.component';
@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit, AfterViewInit {
  employee: UserForManagement;
  specjalization: string= '';
  displayedColumns: string[] = ['number', 'specjalization', 'doctor', 'nurse', 'options'];
  dataSource = new MatTableDataSource<RoomForManagement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private roomService: RoomManagementService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getRoomsData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  createRoomDialog = () =>{
    const dialogRef = this.dialog.open(CreateRoomDialog);
  }
  
  getRoomsData = () =>{
    this.roomService.getRoomData('api/Room/GetRoomsDataFormManagement').subscribe(res => {this.dataSource.data = res as []});
  }

  deleteRoom = (number:number) =>{
    this.roomService.deleteRoom(`api/Room/DeleteRoom/${number}`)
    .subscribe({
      next: (_) =>{
        window.location.reload();
      },
      error: (_) =>{
        window.alert('Room delete error!');
      }
    });
  }

  setEmpty = (number: number) =>{
    this.roomService.setEmpty(`api/Room/SetRoomEmpty/${number}`)
    .subscribe({
      next: (_)=>{
        window.location.reload();
      },
      error: (_)=>{
        window.alert('No data can be obtained!');
      }
    });
  }

  openDoctorDialog = (number: number) =>{
    const dialogRef = this.dialog.open(SetDoctorDialog,{ data: {employee: this.employee}});

    dialogRef.afterClosed().subscribe(res=>{
      this.employee = res;

      if(this.employee != null){
        this.setEmployee(this.employee, number);
      }
    });
  }

  openNurseDialog = (number: number) =>{
    const dialogRef = this.dialog.open(SetNurseDialog,{ data: {employee: this.employee}});

    dialogRef.afterClosed().subscribe(res=>{
      this.employee = res;

      if(this.employee != null ){
        this.setEmployee(this.employee, number);
      }
    });
  }

  setEmployee = (employee: UserForManagement, room: number) =>{
    this.roomService.AssignEmployeeForRoom(`api/Room/AssignEmployeeToRoom/${room}`,employee).subscribe({
      next:(_)=>{
        window.location.reload();
      },
      error:(_)=>{
        window.alert("Employe assign error!");
      }
    });
  }

  setSpecjalizationDialog = (number: number)=>{
    const dialogRef = this.dialog.open(SetSpecjalizationDialog, {data: this.specjalization});
    dialogRef.afterClosed().subscribe(res=>{
      this.specjalization = res;
      const spec: SpecjalizationSender = {
        specjalization: this.specjalization,
        room: number,
      }
      this.setSpecjalization(spec);
    })
  }

  setSpecjalization = (spec: SpecjalizationSender) =>{
    this.roomService.sendSpecjalization(`api/Room/AssignSecjalization`, spec).subscribe({
      next:(_)=>{
        window.location.reload();
      },
      error:(_)=>{
        window.alert("Specjalization assign error!");
      }
    })
  }
}

export interface SpecjalizationSender{
  specjalization: string;
  room: number;
}