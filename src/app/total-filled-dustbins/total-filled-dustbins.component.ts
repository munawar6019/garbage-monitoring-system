import { CleanConfirmationComponent } from './../cards/clean-confirmation/clean-confirmation.component';
import { CardService } from './../card.service';
import { UserService } from './../Services/user.service';
import { DustbinService } from './../Services/dustbin.service';
import { User } from './../Models/user.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Dustbin } from 'src/app/Models/dustbin.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from "@angular/core";
import * as firebase from 'firebase'; 


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
  selector: 'app-total-filled-dustbins',
  templateUrl: './total-filled-dustbins.component.html',
  styleUrls: ['./total-filled-dustbins.component.css']
})
export class TotalFilledDustbinsComponent implements OnInit{
  list: Dustbin[];
  count: any;
  userData: MatTableDataSource<any>;
  dataMembers:User;

  constructor(private dustbinService: DustbinService,
    private router:Router,
    private dialog: MatDialog,
    private userService:UserService,
    private cards: CardService
    ) {
   }
  ngOnInit() {
    this.dustbinService.getFilledDustbin().subscribe( data =>{
      this.list  = data.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Dustbin
        }
      });
      this.userData = new MatTableDataSource(this.list);
      this.userData.sort = this.sort;
      this.userData.paginator = this.paginator;
    })
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
