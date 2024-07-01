import {Component, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Dialog} from "@angular/cdk/dialog";
import {FormPopupComponent} from "../../components/form-popup/form-popup.component";
import {PopupFormType} from "../../../../types/popup-form.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  numberPhone: string = environment.numberPhone;

  constructor(private dialog: Dialog) { }

  ngOnInit(): void {
  }


  callForm() {
    const data: PopupFormType = {
        title: 'Бесплатная консультация!',
        button: {
          text: 'Заказать звонок',
          type: 'consultation'
        }
    };
    this.dialog.open(FormPopupComponent, {data});
  }

}
