import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  territoris: any = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.territoris = this.authService.llistaMunicipis();
    console.log(this.territoris);
  }

}
