import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { RoomManagementService } from "src/app/shared/services/room-management.service";

@Component({
    selector: 'room-create',
    templateUrl: 'room-create.component.html'
})
export class CreateRoomDialog implements OnInit{
    roomForm: FormGroup;

    constructor(private roomService: RoomManagementService, public dialogRef: MatDialogRef<CreateRoomDialog>){

    }
    
    ngOnInit(): void {
        this.roomForm = new FormGroup({
            roomNumber: new FormControl('', [Validators.required]),
        })
    }

    createRoom = (roomFormValue : any) =>{
        const roomFromValues = {...roomFormValue};
        const number = roomFormValue.roomNumber;

        this.roomService.createRoom(`api/Room/CreateRoom/${number}`).subscribe({
          next: (_) => {
            window.location.reload();
          },
          error: (_) =>{
            window.alert(`Cannot create room ${number}`);
          }
        });
    }

    closeDialog = () =>{
        this.dialogRef.close()
    }
      
}