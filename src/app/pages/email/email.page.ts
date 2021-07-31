import { AccountPage } from './../account/account.page';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  listEmails: Array<any> = [];

  constructor(
    private http: HttpClient,
    private route: Router,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
   this.getDataEmails();
  }

  getDataEmails(){

    this.http.get<any[]>('assets/data.json')
    .subscribe(data => {

      this.listEmails = data.map(email => { email.color = '#' + Math.floor(Math.random() * 16777222).toString(16).toUpperCase() });
      this.listEmails = Object.keys(data).map(index => data[index]);
    });
  }

  async openAccount(ev){
    
    const popover = await this.popoverCtrl.create(
      {
        component: AccountPage,
        event: ev,
        cssClass: 'custom-popover'
      });
    popover.present();

  }

  doRefresh(ev){

    setTimeout(() => {

      ev.target.complete();

    },3000)

  }

  async removeEmail(mail){

    const toast = await this.toastCtrl.create({
      message: 'Email excluido com sucesso!',
      duration: 300
    });
    toast.present();

  }

}
