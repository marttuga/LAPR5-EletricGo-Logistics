import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { RoutesService } from 'src/app/services/node/routes.service';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  styleUrls: ['./rgpd.component.css']
})
export class RgpdComponent implements OnInit {

  constructor( private routeService: RoutesService,
    private activedRoute: ActivatedRoute,
    private router: Router) {

}

  ngOnInit(): void {
  }

}
