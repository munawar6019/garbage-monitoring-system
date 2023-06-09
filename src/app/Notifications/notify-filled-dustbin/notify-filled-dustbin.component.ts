import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CleanConfirmationComponent } from './../../cards/clean-confirmation/clean-confirmation.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Dustbin } from 'src/app/Models/dustbin.model';
import { DustbinService } from './../../Services/dustbin.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from "@angular/core";

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface PeriodicElement {
  name: string;
  position: number;
  phoneNumber: number;
  gender: string;
  email: string;
  address: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-notify-filled-dustbin',
  templateUrl: './notify-filled-dustbin.component.html',
  styleUrls: ['./notify-filled-dustbin.component.css']
})
export class NotifyFilledDustbinComponent implements OnInit{
  list: Dustbin[];
  count: any;
  userData: MatTableDataSource<any>;
  timeNow = new Date();
  form = new FormGroup({
    lastSeenAt: new FormControl('')
  });
  constructor(private dustbinService: DustbinService,
    private router:Router,
    private dialog: MatDialog,
    ) {
   }
  ngOnInit() {
    this.form.patchValue({
      lastSeenAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US')
     });
    this.dustbinService.getFilledDustbin().subscribe(actionArray =>{
      let totalMembers = actionArray.length;
      console.log("Total Filled bins",totalMembers);
      this.list  = actionArray.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Dustbin
        }
      });
      this.userData = new MatTableDataSource(this.list);
     this.userData.sort = this.sort;
     this.userData.paginator = this.paginator;
    });
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    "dustbinNo",
    "sector",
    "dustbinLatitude",
    "dustbinLongitude",
    "garbageLevel",
    "cleanedBy",
    "lastCleanedDate",
    "Status"
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userData.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }
  

  delete(id:string){
     this.dustbinService.delete(id);

  }
  editStatus(id){
    this.router.navigate(['/editDustbins',id]);
   }
   openCleanConfirmation(s){
     console.log(this.form.value);
     this.dustbinService.updateLastSeenDustbin(s,this.form.value);
    const dialogConfig  = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CleanConfirmationComponent,{
     height: '70%',
     width: '60%',
     data: { pageValue: s }
    });
   }
  
}
