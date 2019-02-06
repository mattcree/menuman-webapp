import { Component, OnInit } from '@angular/core';
import {ApiClientService} from '../../services/api-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiClient: ApiClientService) { }

  ngOnInit() {
    this.apiClient.getFullMenu(1).subscribe(
      yay => console.log(yay),
      uhoh => console.log(uhoh)
    )
  }

}
