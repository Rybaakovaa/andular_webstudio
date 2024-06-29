import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {FormPopupService} from "../../services/form-popup.service";
import {Subscription} from "rxjs";
import {PopupFormType} from "../../../../types/popup-form.type";
import {FormBuilder, Validators} from "@angular/forms";
import {nameValidator} from "../../validators/name-validator";
import {CommonService} from "../../services/common.service";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent implements OnInit {

  trackClick: boolean = false;
  isShowed: boolean = false;
  isSend: boolean = false;
  isError: boolean = false;

  selectBodyOpen: boolean = false;

  formPopupContent!: PopupFormType;

  popupForm = this.fb.group({
    name: ['', [Validators.required, nameValidator()]],
    phone: ['', [Validators.required]] //, Validators.pattern(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)]],
  })


  constructor(private formPopupService: FormPopupService,
              private commonService: CommonService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formPopupService.isShowed$.subscribe((isShowed: boolean) => {
      this.isShowed = isShowed;
    });

    this.formPopupService.formPopupContent$.subscribe((formPopupContent: PopupFormType) => {
      this.formPopupContent = formPopupContent;
    });

  }


  closePopup(): void {
    this.popupForm.value.name = '';
    this.popupForm.value.phone = '';

    this.isSend = false;
    this.trackClick = false;
    this.selectBodyOpen = false;
    this.isError = false;

    this.formPopupService.hide();
  }

  sendForm() {
    if (!this.isSend) {
      if (this.formPopupContent.button && this.popupForm.value.name && this.popupForm.value.phone) {
        // if (this.formPopupContent.button.type === "consultation") {
        //   this.isSend = true;
        // }

        if (this.formPopupContent.button.type === "order" && this.formPopupContent.comboBox) {
          this.commonService.getService(this.popupForm.value.name, this.popupForm.value.phone,
                                        this.formPopupContent.comboBox.active, this.formPopupContent.button.type)
            .subscribe((data: DefaultResponseType) => {
              if (data.error) {
                this.isError = true;
                throw new Error(data.message);
              }
            });
        }

        this.isSend = true;
      }
    }
  }


  // @HostListener('document: click', ['$event'])
  // click(event: Event) {
  //   // первый клик - открытие самой формы его надо пропустить
  //   if (!this.trackClick) {
  //     this.trackClick = true;
  //     return;
  //   }
  //   if (this.isShowed && this.trackClick && (event.target as HTMLElement).className.indexOf('form-popup-container') === -1) {
  //     this.closePopup();
  //   }
  // }


  selectItemClick(item: string) {
    if (this.formPopupContent.comboBox) {
      this.formPopupContent.comboBox.active = item;
      this.selectBodyOpen = false;
    }
  }

  selectHeaderClick() {
    this.selectBodyOpen = !this.selectBodyOpen;
  }
}
