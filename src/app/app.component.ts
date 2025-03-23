import { Component, OnInit, TransferState, inject, makeStateKey } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { TestService } from './services/test.service';
import { RouterLink, RouterOutlet, Router, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive]
})
export class AppComponent implements OnInit {
  appMsg: string = 'init';
  constructor(private TestService: TestService) {
    this.TestService.getData().subscribe((res: any) => {
      this.appMsg = res.msg;
    })
  }
  ngOnInit(): void {
   
  }

}
