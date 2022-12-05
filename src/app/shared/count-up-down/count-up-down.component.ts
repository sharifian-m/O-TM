import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-count-up-down',
  templateUrl: './count-up-down.component.html',
  styleUrls: ['./count-up-down.component.scss']
})
export class CountUpDownComponent implements OnInit {
@Input() count:number=0;
@Input() mode='circle';
@Input() minimumCount:number=0;
@Input() maximumCount:number=0;
@Output() changeCount=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  increment(){
    if(this.count<this.maximumCount){
      this.count++;
    }
   this.changeCount.emit(this.count);
  }
  decrement(){
    if(this.count>this.minimumCount){
      this.count--;

    }
    this.changeCount.emit(this.count);

  }
}
