import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  id: number;
  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  onEditServer() {
    // this.router.navigate(["/servers", this.id, "edit"]);
    this.router.navigate(["/servers", this.id, "edit"], {
      queryParamsHandling: "preserve",
    });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.server = this.serversService.getServer(this.id);
    });
  }
}
