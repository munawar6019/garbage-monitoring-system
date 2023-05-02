import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { User } from './../../Models/user.model';
import { Component, ViewChild } from "@angular/core";
import * as firebase from 'firebase'; 

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
  selector: 'app-sector-members',
  templateUrl: './sector-members.component.html',
  styleUrls: ['./sector-members.component.css']
})
export class SectorMembersComponent {
  list: User[];
  count: any;
  userData: MatTableDataSource<any>;
  dataMembers:User;

  constructor(private userService: UserService,
    private router:Router
    ) {
   }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
          this.userService.getUserToEdit(user.uid).subscribe(data =>{
            this.dataMembers = data as User;
            console.log(this.dataMembers.sector);
            this.userService.getSectorMembers(this.dataMembers.sector, this.dataMembers.role).subscribe(actionArray =>{
               console.log("Sector Members",actionArray.length);

              this.list  = actionArray.map(item =>{
                return {
                  id: item.payload.doc.id,
                  ...item.payload.doc.data() as User
                }
              });
              this.userData = new MatTableDataSource(this.list);
             this.userData.sort = this.sort;
             this.userData.paginator = this.paginator;
            });
          })
      }else{
        console.log("User is not Signed In");
      }
    })
   

    
  }
  displayedColumns: string[] = [
    "Username",
    "Email",
    "Sector",
    "Phone",
    "Joining_Date",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
  
   changeStatusToDisabled(id){
    this.userService.DisableUser(id);
      this.router.navigate(['/homePage']);
   }
   changeStatusToActive(id){
    this.userService.ActiveUser(id);
      this.router.navigate(['/homePage']);
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userData.filter = filterValue.trim().toLowerCase();
  }
  
}
