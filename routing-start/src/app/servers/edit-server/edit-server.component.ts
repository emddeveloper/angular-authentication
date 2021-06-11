import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  isEditable: boolean;
  unSaved = true;
  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams);
    console.log(this.activatedRoute.snapshot.fragment);
    //Another process
    this.activatedRoute.queryParams.subscribe((data) => {
      this.isEditable = data["allowedEdit"] === "1" ? true : false;
    });
    this.activatedRoute.fragment.subscribe((data) => console.log(data));
    let id = +this.activatedRoute.snapshot.params["id"];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.unSaved) {
      const result = window.confirm("There are unsaved changes! Are you sure?");

      return result;
    }
    return true;
  }
}
