import { NavController, LoadingController } from "ionic-angular";
import { FirebaseAuth, AuthProviders, AuthMethods } from "angularfire2";
import { Component } from "@angular/core";
// import { ComponentFactoryResolver } from "@angular/core";
// import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { RegisterPage } from "../register/register";
import { ModalController } from "ionic-angular";
import { ViewController } from "ionic-angular";
// import {ForgotPasswordPage} from "../forgot-password/forgot-password";
// import {SignUpPage} from "../sign-up/sign-up";

@Component({
  templateUrl: "login.html"
})

export class LoginPage {
  error: any;
  loginForm: FormGroup;

  constructor(private auth: FirebaseAuth,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // openForgotPasswordPage(): void {
  //   this.navCtrl.push(ForgotPasswordPage);
  // }
  //
  openSignUpPage(): void {
    let modal = this.modalCtrl.create(RegisterPage, {}, {enableBackdropDismiss: false});
    this.viewCtrl.dismiss();
    modal.present();
  }

  login() {
    // console.log(this.loginForm.value.password);
    // console.log(this.loginForm.value.email);
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.auth.login(this.loginForm.value, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      console.log(authData);
      loader.dismiss();
      this.navCtrl.popToRoot();
    }).catch((error) => {
      loader.dismiss();
      if (error) {
        console.log(error)
      }
    });
  }
}
