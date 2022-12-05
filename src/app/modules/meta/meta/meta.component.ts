import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit {
  img = '/assets/images/meta/meta_1.jpg';
  index = 0;
  images = ['/assets/images/meta/meta_1.jpg', '/assets/images/meta/otamin_2.jpeg'];
  userForm: UntypedFormGroup;
  constructor(
    private toastr: ToastrService,
    private fb: UntypedFormBuilder,
  ) { }


ngOnInit(): void {
  this.userForm = this.fb.group({
    email: ['',
      Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ],
  });

  setInterval(() => {
      this.next();
    }, 5000);

  }


  // tslint:disable-next-line:typedef
  sendEmail(f: NgForm){
    this.toastr.success('ایمیل شما در خبرنامه ما ثبت شد');
    // f.onReset();
  }


  public next() {
    this.index++;
    if (this.index >= this.images.length) {
      this.index = 0;
    }

    this.img = this.images[this.index];
  }
}
