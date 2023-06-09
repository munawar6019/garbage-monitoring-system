import { AgmCoreModule } from '@agm/core';
import { DriverMapComponent } from './driver-map/driver-map.component';
import { YourCleanedDustbinComponent } from './Notifications/your-cleaned-dustbin/your-cleaned-dustbin.component';
import { SectorMemberComponent } from './Notifications/sector-member/sector-member.component';
import { MalfunctionVehicleComponent } from './Notifications/malfunction-vehicle/malfunction-vehicle.component';
import { NotifyPendingWorkerComponent } from './Notifications/notify-pending-worker/notify-pending-worker.component';
import { NotifyPendingSupervisorComponent } from './Notifications/notify-pending-supervisor/notify-pending-supervisor.component';
import { NotifyPendingQueryComponent } from './Notifications/notify-pending-query/notify-pending-query.component';
import { NotifyFilledDustbinComponent } from './Notifications/notify-filled-dustbin/notify-filled-dustbin.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ReportComponent } from './Reports/report/report.component';
import { DustbinComponent } from './dustbins/dustbin/dustbin.component';
import { SectorsComponent } from './sector/sectors/sectors.component';
import { ViewWorkerComponent } from './worker/view-worker/view-worker.component';
import { WorkersComponent } from './worker/workers/workers.component';
import { AddWorkerComponent } from './worker/add-worker/add-worker.component';
import { SupervisorComponent } from './supervisors/supervisor/supervisor.component';
import { VehicleComponent } from './vehicle/vehicle/vehicle.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { GoogleMapComponent } from './google-map/google-map.component';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AddSectorComponent } from "./sector/add-sector/add-sector.component";
import { ViewSectorComponent } from "./sector/view-sector/view-sector.component";
import { AddSupervisorComponent } from "./supervisors/add-supervisor/add-supervisor.component";
import { ViewSupervisorComponent } from "./supervisors/view-supervisor/view-supervisor.component";
import { AddVehicleComponent } from "./vehicle/add-vehicle/add-vehicle.component";
import { ViewVehicleComponent } from "./vehicle/view-vehicle/view-vehicle.component";
import { AddDustbinsComponent } from "./dustbins/add-dustbins/add-dustbins.component";
import { ViewDustbinsComponent } from "./dustbins/view-dustbins/view-dustbins.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { DustbinLogComponent } from './dustbin-log/dustbin-log.component';
const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'map', component: GoogleMapComponent },
  { path: 'driverMap', component: DriverMapComponent },

  
  { path: 'report', component: ReportComponent },
  { path: 'dustbinLog', component: DustbinLogComponent },

  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn/forgotPassword', component: ForgotPasswordComponent },

  { path: 'homePage', component: HomePageComponent},
  { path: 'profile', component: ProfileCardComponent},

  { path: 'filledDustbins', component: NotifyFilledDustbinComponent,canActivate :[AuthGuardService] },
  { path: 'pendingQueries', component: NotifyPendingQueryComponent,canActivate :[AuthGuardService] },
  { path: 'pendingSupervisors', component: NotifyPendingSupervisorComponent,canActivate :[AuthGuardService] },
  { path: 'PendingWorkers', component: NotifyPendingWorkerComponent,canActivate :[AuthGuardService] },
  { path: 'malfunctionVehicles', component: MalfunctionVehicleComponent,canActivate :[AuthGuardService] },
  { path: 'sectorMembers', component: SectorMemberComponent,canActivate :[AuthGuardService] },
  { path: 'yourCleanedDustbins', component: YourCleanedDustbinComponent,canActivate :[AuthGuardService] },



  { path: 'addSector', component: AddSectorComponent,canActivate :[AuthGuardService] },
  { path: 'editSector/:id', component: SectorsComponent,canActivate :[AuthGuardService] },
  { path: 'viewSector', component: ViewSectorComponent,canActivate :[AuthGuardService] },

  { path: 'addSupervisor', component: AddSupervisorComponent,canActivate :[AuthGuardService] },
  { path: 'editSupervisor/:id', component: SupervisorComponent,canActivate :[AuthGuardService] },
  { path: 'viewSupervisor', component: ViewSupervisorComponent,canActivate :[AuthGuardService] },

  { path: 'addWorker', component: AddWorkerComponent,canActivate :[AuthGuardService] },
  { path: 'editWorker/:id', component: WorkersComponent,canActivate :[AuthGuardService] },
  { path: 'viewWorker', component: ViewWorkerComponent,canActivate :[AuthGuardService] },

  { path: 'addVehicle', component: AddVehicleComponent,canActivate :[AuthGuardService] },
  { path: 'editVehicle/:id', component: VehicleComponent,canActivate :[AuthGuardService] },
  { path: 'viewVehicle', component: ViewVehicleComponent,canActivate :[AuthGuardService] },

  { path: 'addDustbins', component: AddDustbinsComponent,canActivate :[AuthGuardService] },
  { path: 'editDustbins/:id', component: DustbinComponent,canActivate :[AuthGuardService] },
  { path: 'viewDustbins', component: ViewDustbinsComponent, canActivate :[AuthGuardService] },
  { path: '**', redirectTo: 'signIn', pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule,AgmCoreModule.forRoot({
    apiKey:'AIzaSyAqfDj0AUqDQsYNmM-NJ0adGe5MOcZ0Uc0'
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule {}
