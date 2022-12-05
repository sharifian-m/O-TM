import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
currentUser: any;
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res
    })
    
     
  }

}
