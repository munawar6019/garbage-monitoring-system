import { SectorService } from './../../Services/sector.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { User } from './../../Models/user.model';
import { Component, ViewChild, OnInit } from "@angular/core";

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Sector } from 'src/app/Models/sector.model';

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
  selector: "app-view-sector",
  templateUrl: "./view-sector.component.html",
  styleUrls: ["./view-sector.component.css"]
})
export class ViewSectorComponent {
  list: Sector[];
  count: any;
  userData: MatTableDataSource<any>;

  constructor(private sectorService: SectorService,
    private router:Router,
    private firestore: AngularFirestore,
    private dialog: MatDialog
    ) {
   }
  ngOnInit() {
    this.sectorService.getSector().subscribe(actionArray =>{
      this.list  = actionArray.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Sector
        }
      });
      this.userData = new MatTableDataSource(this.list);
     this.userData.sort = this.sort;
     this.userData.paginator = this.paginator;
    });
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    "select",
    "edit",
    "sectorNumber",
    "sectorEmail",
    "sectorContact",
    "sectorLabel",
    "sectorDescription",
    "sectorArea",
    "sectorCity",
    "delete"
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
  
  deleteSector(id:string){
     this.sectorService.deleteSector(id);

  }
  editStatus(id){
    this.router.navigate(['/editSector',id]);
  }
}
