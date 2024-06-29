import {Component, OnInit, Output} from '@angular/core';
import {FormPopupService} from "../../services/form-popup.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  numberPhone: string = environment.numberPhone;

  constructor(private formPopupService: FormPopupService) { }

  ngOnInit(): void {
  }


  callForm() {
    this.formPopupService.show();
    this.formPopupService.setContent({
      title: 'Бесплатная консультация!',
      // inputs: [
      //   {
      //   type: 'name',
      //   placeholder: 'Ваше имя'
      // },
      //   {
      //   type: 'name',
      //   placeholder: 'Ваш номер телефона'
      // },
      // ],
      button: {
        text: 'Заказать звонок',
        type: 'consultation'
      }
    });
  }

}
