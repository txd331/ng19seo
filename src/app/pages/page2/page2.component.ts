import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.less'],
  standalone: true
})
export class Page2Component  implements OnInit {
  msg = 'init';
  title = 'Page 2';

  constructor( 
    private testService: TestService) {

  }

  async ngOnInit() {
    

      this.testService.getData().subscribe((data) => {
        console.log('data', data);
        this.msg = data.msg;
      });

     
  }
}
