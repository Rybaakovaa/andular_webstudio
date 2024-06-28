import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {FormPopupService} from "../../services/form-popup.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent implements OnInit {

  isShowed: boolean = false;
  isSend: boolean = false;

  formPopupContent: string | null = null;

  trackClick: boolean = false;

  private clickListener: (() => void) | null = null;
  private subscription: Subscription | null = null;

  constructor(private formPopupService: FormPopupService,
              private eRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.formPopupService.isShowed$.subscribe((isShowed: boolean) => {
      this.isShowed = isShowed;

      // if (isShowed) {
      //   this.addClickListener();
      // } else {
      //   this.removeClickListener();
      // }
    });

    this.formPopupService.formPopupContent$.subscribe((formPopupContent: string | null) => {
      this.formPopupContent = formPopupContent;
      console.log(this.formPopupContent)
    });

  }

  closePopup(): void {
    this.formPopupService.hide();
    this.isSend = false;
    this.trackClick = false;
  }

  sendForm() {
    this.isSend = true;
  }

  @HostListener('document: click', ['$event'])
  click(event: Event) {
    // первый клик - открытие самой формы его надо пропустить
    if (!this.trackClick) {
      this.trackClick = true;
      return;
    }
    if (this.isShowed && this.trackClick && (event.target as HTMLElement).className.indexOf('form-popup-container') === -1) {
      this.closePopup();
    }
  }
}
