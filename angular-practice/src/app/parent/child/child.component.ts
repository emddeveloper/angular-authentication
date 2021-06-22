import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dataModel } from 'src/app/dataModel';

@Component({
  selector: 'app-child-component',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  childData = 'Data from child component';
  //example of @input() from parent to child data transfer
  @Input() fromParentData: string;

  //example of @Output() child to parent data transfer
  data: dataModel = {
    name: 'SK',
    age: 30,
  };
  getValue(name: any) {
    console.log(name.value);
  }
  @Output() dataFormChild = new EventEmitter<dataModel>();
  ngOnInit() {
    this.dataFormChild.emit(this.data);
  }
}
