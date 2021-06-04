import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-two',
  templateUrl: './map-two.component.html',
  styleUrls: ['./map-two.component.css']
})
export class MapTwoComponent implements OnInit {

  informacio: any = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get('https://sitmun-backend-core.herokuapp.com/api/workspace').subscribe( data => {
      this.informacio = data;
    });
  }

}
