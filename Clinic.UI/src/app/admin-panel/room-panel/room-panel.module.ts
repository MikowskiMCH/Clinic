import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { CreateRoomDialog } from "./dialog-create-room/room-create.component";
import { SetDoctorDialog } from "./dialog-doctor/room-set-doctor.component";
import { SetNurseDialog } from "./dialog-nurse/room-set-nurse.component";
import { SetSpecjalizationDialog } from "./dialog-specjalization/room-set-specjalization.component";
import { RoomManagementComponent } from "./room-management/room-management.component";

@NgModule({
    declarations: [
      CreateRoomDialog,
      SetDoctorDialog,
      SetSpecjalizationDialog,
      SetNurseDialog,
      RoomManagementComponent
    ],
    imports: [
      FormsModule,
      MatDialogModule,
      MatTableModule,
      MatPaginatorModule,
      MatMenuModule,
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatRadioModule,
      MatCardModule,
      RouterModule.forChild([
        {path:'rooms-management', component: RoomManagementComponent},
      ]),
      LayoutModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule
    ]
  })
  export class RoomPanelModule { }