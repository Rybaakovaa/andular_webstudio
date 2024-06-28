import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {FormPopupService} from "../../services/form-popup.service";
import {Subscription} from "rxjs";
import {PopupFormType} from "../../../../types/popup-form.type";
import {FormBuilder, Validators} from "@angular/forms";
import {nameValidator} from "../../validators/name-validator";

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent implements OnInit {

  trackClick: boolean = false;
  isShowed: boolean = false;
  isSend: boolean = false;

  selectBodyOpen: boolean = false;

  formPopupContent!: PopupFormType;

  popupForm = this.fb.group({
    name: ['', [Validators.required, nameValidator()]],
    phone: ['', [Validators.email, Validators.required]],
  })


  constructor(private formPopupService: FormPopupService,
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
    this.formPopupService.hide();
    this.isSend = false;
    this.trackClick = false;
    this.selectBodyOpen = false;
  }

  sendForm() {
    this.isSend = true;
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
