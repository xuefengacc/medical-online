import { Component, OnInit, Input } from '@angular/core';
import { Mail } from 'src/app/model/mail';
import { MailService } from 'src/app/services/mail.service';
import { MailComponent } from '../mail.component';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.css']
})
export class MailDetailComponent implements OnInit {

  @Input() mail: Mail
  constructor(
    private service: MailService,
    private mailComponent: MailComponent
  ) { }

  ngOnInit() { }

  deleteMail(){
    this.service.deleteMailById(this.mail.mailId)
      .subscribe(data => {
        console.log("Mail deleted");
        this.mailComponent.reload();
      }, 
        error => console.log(error));
  }
}
