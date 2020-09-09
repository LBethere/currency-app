import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-test',
  templateUrl: './exercise-test.component.html',
  styleUrls: ['./exercise-test.component.css']
})
export class ExerciseTestComponent implements OnInit {

  test = 'hello';

  constructor() { }

  ngOnInit(): void {
  }

  myMethod() {
    this.test = 'world';
  }

}
