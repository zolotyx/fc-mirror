import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FirebaseAuth } from "angularfire2";
import { AngularFire } from "angularfire2";
import { ModalController } from "ionic-angular";
import { LoginPage } from "../auth/login/login";
import { NotePage } from "../note/note";
// import { FirebaseListObservable } from "angularfire2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  authInfo: any;
  notes: any[];

  constructor(private navCtrl: NavController,
              private af: AngularFire,
              private modalCtrl: ModalController,
              private auth: FirebaseAuth) {


  }

  ngOnInit() {

    this.auth.subscribe(data => {
      if (data) {
        console.log(data);
      } else {
        this.authInfo = null;
        this.showLoginModal();
      }
    });

    this.af.database.list('/notes')
      .subscribe(notes => {
        this.notes = notes;
        console.log(this.notes);
      })
  }

  addNote() {
    this.navCtrl.push(NotePage);
  }

  logout() {
    if (this.authInfo && (this.authInfo.email || this.authInfo.accessToken)) {
      this.auth.logout();
      return;
    }
  }

  showLoginModal() {
    let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
    modal.present();
  }

}
