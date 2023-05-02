import { NotificationsService } from './Services/notifications.service';
import { EditProfileComponent } from './workers/edit-profile/edit-profile.component';
import { QueryService } from './Services/query.service';
import { FilledDustbinsComponent } from './cards/filled-dustbins/filled-dustbins.component';
import { ReportComponent } from './Reports/report/report.component';
import { ViewWorkerComponent } from './worker/view-worker/view-worker.component';
import { AddWorkerComponent } from './worker/add-worker/add-worker.component';
import { WorkersComponent } from './worker/workers/workers.component';
import { AdminAuthGuardService } from './Services/admin-auth-guard.service';
import { CardService } from './card.service';
import { DustbinService } from './Services/dustbin.service';
import { SectorService } from './Services/sector.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { RegistrationService } from './Services/registration.service';
import { environment } from './../environments/environment';
import { AngularMaterialModule } from './material.module';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule} from '@agm/core';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddSectorComponent } from "./sector/add-sector/add-sector.component";
import { ViewSectorComponent } from "./sector/view-sector/view-sector.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
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
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ForgotPasswordDialogComponent } from "./forgot-password-dialog/forgot-password-dialog.component";
import { FooterComponent } from "./footer/footer.component";
import { CdkTableModule } from "@angular/cdk/table";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LineChartComponent } from './Reports/line-chart/line-chart.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarChartComponent } from './Reports/bar-chart/bar-chart.component';
import { DouhgnutChartComponent } from './Reports/doughnut-chart/douhgnut-chart/douhgnut-chart.component';
import { PieChartComponent } from './Reports/pirChart/pie-chart/pie-chart.component';
import { SupervisorComponent } from './supervisors/supervisor/supervisor.component';
import { VehicleComponent } from './vehicle/vehicle/vehicle.component';
import { SectorsComponent } from './sector/sectors/sectors.component';
import { DustbinComponent } from './dustbins/dustbin/dustbin.component';
import { RegisteredMembersComponent } from './cards/registered-members/registered-members.component';
import { CleansingRateComponent } from './cards/cleansing-rate/cleansing-rate.component';
import { RegisteredVehiclesComponent } from './cards/registered-vehicles/registered-vehicles.component';
import { SectorMembersComponent } from './cards/sector-members/sector-members.component';
import { CleanedDustbinsComponent } from './cards/cleaned-dustbins/cleaned-dustbins.component';
import { SupervisorDetailsComponent } from './cards/supervisor-details/supervisor-details.component';
import { CleanConfirmationComponent } from './cards/clean-confirmation/clean-confirmation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotifyFilledDustbinComponent } from './Notifications/notify-filled-dustbin/notify-filled-dustbin.component';
import { NotifyPendingQueryComponent } from './Notifications/notify-pending-query/notify-pending-query.component';
import { NotifyPendingSupervisorComponent } from './Notifications/notify-pending-supervisor/notify-pending-supervisor.component';
import { NotifyPendingWorkerComponent } from './Notifications/notify-pending-worker/notify-pending-worker.component';
import { MalfunctionVehicleComponent } from './Notifications/malfunction-vehicle/malfunction-vehicle.component';
import { SectorMemberComponent } from './Notifications/sector-member/sector-member.component';
import { YourCleanedDustbinComponent } from './Notifications/your-cleaned-dustbin/your-cleaned-dustbin.component';
import { GarbageLevelReportComponent } from './Reports/garbage-level-report/garbage-level-report.component';
import { EachDustbinGarbageLevelreportComponent } from './Reports/each-dustbin-garbage-levelreport/each-dustbin-garbage-levelreport.component';
import { DriverMapComponent } from './driver-map/driver-map.component';
import { MakeRouteComponent } from './make-route/make-route.component';
import { AgmDirectionModule} from 'agm-direction';
import { SectorPendingMembersComponent } from './sector-pending-members/sector-pending-members.component';
import { TotalFilledDustbinsComponent } from './total-filled-dustbins/total-filled-dustbins.component';
import { TotalCleansingRateComponent } from './total-cleansing-rate/total-cleansing-rate.component';
import { TotalRegisteredVehiclesComponent } from './total-registered-vehicles/total-registered-vehicles.component';
import { DustbinLogComponent } from './dustbin-log/dustbin-log.component';
import { SectorDetailsComponent } from './sector-details/sector-details.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
@NgModule({
  declarations: [
    AppComponent,
    AddSectorComponent,
    ViewSectorComponent,
    SideBarComponent,
    AddSupervisorComponent,
    ViewSupervisorComponent,
    AddVehicleComponent,
    ViewVehicleComponent,
    AddDustbinsComponent,
    ViewDustbinsComponent,
    SignInComponent,
    SignUpComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    ForgotPasswordDialogComponent,
    FooterComponent,
    DashboardComponent,
    NotFoundComponent,
    NavbarComponent,
    ProfileCardComponent,
    GoogleMapComponent,
    LineChartComponent,
    BarChartComponent,
    DouhgnutChartComponent,
    PieChartComponent,
    SupervisorComponent,
    VehicleComponent,
    WorkersComponent,
    AddWorkerComponent,
    ViewWorkerComponent,
    SectorsComponent,
    DustbinComponent,
    ReportComponent,
    FilledDustbinsComponent,
    RegisteredMembersComponent,
    CleansingRateComponent,
    RegisteredVehiclesComponent,
    SectorMembersComponent,
    CleanedDustbinsComponent,
    SupervisorDetailsComponent,
    CleanConfirmationComponent,
    ProfileCardComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    NotifyFilledDustbinComponent,
    NotifyPendingQueryComponent,
    NotifyPendingSupervisorComponent,
    NotifyPendingWorkerComponent,
    MalfunctionVehicleComponent,
    SectorMemberComponent,
    YourCleanedDustbinComponent,
    GarbageLevelReportComponent,
    EachDustbinGarbageLevelreportComponent,
    DriverMapComponent,
    MakeRouteComponent,
    SectorPendingMembersComponent,
    TotalFilledDustbinsComponent,
    TotalCleansingRateComponent,
    TotalRegisteredVehiclesComponent,
    DustbinLogComponent,
    SectorDetailsComponent,
    VehicleDetailsComponent,

    
    
  ],
  entryComponents: [
    ForgotPasswordDialogComponent,
    FilledDustbinsComponent,
    RegisteredMembersComponent,
    CleansingRateComponent,
    RegisteredVehiclesComponent,
    SectorMembersComponent,
    CleanedDustbinsComponent,
    SupervisorDetailsComponent,
    LineChartComponent,
    BarChartComponent,
    DouhgnutChartComponent,
    CleanConfirmationComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    GarbageLevelReportComponent,
    MakeRouteComponent,
    SectorPendingMembersComponent,
    TotalCleansingRateComponent,
    TotalRegisteredVehiclesComponent,
    TotalFilledDustbinsComponent,
    PieChartComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAqfDj0AUqDQsYNmM-NJ0adGe5MOcZ0Uc0'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AgmDirectionModule,
    FormsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDialogModule,
    CdkTableModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
  ],
  providers: [
    RegistrationService,
    SectorService,
    CardService,
    QueryService,
    DustbinService,
    AuthGuardService,
    AdminAuthGuardService,
    SectorService,
    AngularFireAuth,
    NotificationsService,
    AngularFirestore
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
