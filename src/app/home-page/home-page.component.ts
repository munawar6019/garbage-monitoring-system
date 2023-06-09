import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

export interface PeriodicElement {
  sectorName: string;
  sectorSupervisor: string;
  longititude: number;
  latitude: number;
  street: string;
  city: string;
  postalCode: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    sectorName: "LDA",
    sectorSupervisor: "Ali",
    longititude: 123,
    latitude: 234,
    street: "Street no. 2",
    city: "Lahore",
    postalCode: 12345
  },
  {
    sectorName: "LDA",
    sectorSupervisor: "Ali",
    longititude: 123,
    latitude: 234,
    street: "Street no. 2",
    city: "Lahore",
    postalCode: 12345
  },
  {
    sectorName: "LDA",
    sectorSupervisor: "Ali",
    longititude: 123,
    latitude: 234,
    street: "Street no. 2",
    city: "Lahore",
    postalCode: 12345
  },
  {
    sectorName: "LDA",
    sectorSupervisor: "Ali",
    longititude: 123,
    latitude: 234,
    street: "Street no. 2",
    city: "Lahore",
    postalCode: 12345
  },
  {
    sectorName: "LDA",
    sectorSupervisor: "Ali",
    longititude: 123,
    latitude: 234,
    street: "Street no. 2",
    city: "Lahore",
    postalCode: 12345
  },
  {
    sectorName: "LDA",
    sectorSupervisor: "Ali",
    longititude: 123,
    latitude: 234,
    street: "Street no. 2",
    city: "Lahore",
    postalCode: 12345
  }
];

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent {
  displayedColumns: string[] = [
    "sectorName",
    "sectorSupervisor",
    "longititude",
    "latitude",
    "street",
    "city",
    "postalCode"
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
