import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector:'room-set-specjalization',
    templateUrl: 'room-set-specjalization.component.html',
})
export class SetSpecjalizationDialog{
    constructor(public dialogRef:MatDialogRef<SetSpecjalizationDialog>, @Inject(MAT_DIALOG_DATA) public data: string){}

    onClose=()=>{
        this.dialogRef.close();
    }
}