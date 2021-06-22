import { Component } from '@angular/core';
import { dataModel } from '../dataModel';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  parentData = 'Hello from parent';
  childToParent: dataModel;
  //@Input() to child component
  dataPassToChild = 'This data comes from Parent component';
  //@Output() data from child to parent
  onDataFormChild(data: dataModel) {
    this.childToParent = data;
  }
}
