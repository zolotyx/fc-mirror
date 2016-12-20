import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AngularFire } from "angularfire2";
import { FirebaseListObservable } from "angularfire2";

@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})
export class NotePage {
  noteForm: FormGroup;
  items: FirebaseListObservable<any>;
  constructor(private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private af: AngularFire) {
    this.items = af.database.list('/notes');

  }

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  submit () {
    this.items.push(this.noteForm.value);
    this.navCtrl.pop();
  }


}
