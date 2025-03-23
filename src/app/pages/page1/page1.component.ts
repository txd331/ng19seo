import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';





@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.less'],
  standalone: true,
  providers: [TestService]
})
export class Page1Component implements OnInit {
  msg = 'init';
  postMsg = 'post-init';

  constructor(
    private testService: TestService,
    public router: Router) {

  }

  async ngOnInit() {


    this.testService.getData().subscribe((data) => {
      console.log('data', data);
      this.msg = data.msg;
    });

    this.testService.postData({}).subscribe((data) => {
      console.log('post-data', data);
      this.postMsg = data.msg;
    });
  }
}
