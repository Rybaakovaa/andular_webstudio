import {HostListener, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {PopupFormType} from "../../../types/popup-form.type";

@Injectable({
  providedIn: 'root'
})
export class FormPopupService {

  isShowed$ = new Subject<boolean>();

  formPopupContent$ = new Subject<PopupFormType>();

  constructor() {
  }

  show() {
    this.isShowed$.next(true);
  }

  hide() {
    this.isShowed$.next(false);
  }

  setContent(content: PopupFormType) {
    this.formPopupContent$.next(content);
  }
}

