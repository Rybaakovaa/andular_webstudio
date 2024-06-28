import {HostListener, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormPopupService {

  isShowed$ = new Subject<boolean>();

  formPopupContent: string | null = null;
  formPopupContent$ = new Subject<string | null>();

  constructor() {
  }

  show() {
    this.isShowed$.next(true);
  }

  hide() {
    this.isShowed$.next(false);
  }

  setContent(str: string) {
    this.formPopupContent = str;
    this.formPopupContent$.next(this.formPopupContent);
  }
}

