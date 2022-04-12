import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  EventsForm : FormGroup;
  dateModel : any;
  loading = false;
  outPutForm = null;
  constructor(
    private fb: FormBuilder,
  ) {
    this.EventsForm = this.fb.group({
      events: this.fb.array([
        this.event()
      ])
    })
  }
  ngOnInit() {
  }

  event() {
    return this.fb.group({
      name: [''],
      event_type: [''],
      date: ['']
    })
  }

  get getEvents(): FormArray {
    return this.EventsForm.get("events") as FormArray;
  }

  addEvent() {
    this.getEvents.push(this.event());
  }

  removeEvent(i: number) {
    this.getEvents.removeAt(i);
  }

  submitForm(){
    this.loading = true;
    this.outPutForm = null;
    setTimeout(() => {
      this.loading = false;
      this.outPutForm = this.EventsForm.value['events'];
    }, 1000);
  }

  resetForm(){
    this.getEvents.clear();
    this.EventsForm.reset();
    this.addEvent();
    this.outPutForm = null;
  }
}
