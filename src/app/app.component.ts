import { Component } from "@angular/core";
import { Router } from "@angular/router";
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "practiceSection";
  public router = "";
  constructor(public _router: Router) {
    this.router = _router.url;
  }
}
