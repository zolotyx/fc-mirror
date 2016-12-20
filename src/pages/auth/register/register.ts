// import {NavController} from "ionic-angular";
// import {FirebaseAuth, FirebaseRef, AuthProviders} from "angularfire2";
import {LoginPage} from "../login/login";
import { ModalController } from "ionic-angular";
import { Component } from "@angular/core/src/metadata/directives";
import { ViewController } from "ionic-angular";
import { FirebaseAuth } from "angularfire2";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { LoadingController } from "ionic-angular";
// import { FirebaseAuthState } from "angularfire2";

@Component({
  templateUrl: "register.html"
})

export class RegisterPage {
  error: any;
  registerForm: FormGroup;

  constructor(private auth: FirebaseAuth,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  openLoginPage(): void {
    let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
    this.viewCtrl.dismiss();
    modal.present();
  }

  register() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();


    this.auth.createUser(this.registerForm.value).then(() => {
      this.openLoginPage()
    }).catch((error) => {
      loader.dismiss();
      if (error) {
        console.log(error);
      }
    });
  }


}
