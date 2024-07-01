import {Component, Inject, OnInit} from '@angular/core';
import {PopupFormType} from "../../../../types/popup-form.type";
import {FormBuilder, Validators} from "@angular/forms";
import {nameValidator} from "../../validators/name-validator";
import {CommonService} from "../../services/common.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {Dialog, DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent implements OnInit {

  isSend: boolean = false;
  isError: boolean = false;

  popupForm = this.fb.group({
    name: ['', [Validators.required, nameValidator()]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });


  constructor(private commonService: CommonService,
              private fb: FormBuilder,
              @Inject(DIALOG_DATA) public formPopupContent: PopupFormType,
              private dialog: Dialog,
              private dialogRef: DialogRef) {
  }

  ngOnInit(): void { }

  get name() { return this.popupForm.get('name'); }
  get phone() { return this.popupForm.get('phone'); }



  closePopup(): void {
    this.dialogRef.close();
  }

  sendForm() {
    if (!this.isSend) {
      if (this.formPopupContent.button && this.popupForm.value.name && this.popupForm.value.phone) {
        if (this.formPopupContent.button.type === "consultation") {
          this.isSend = true;
        }

        if (this.formPopupContent.button.type === "order" && this.formPopupContent.comboBox) {
          this.commonService.getService(this.popupForm.value.name, '+7' + this.popupForm.value.phone,
                                        this.formPopupContent.comboBox.active, this.formPopupContent.button.type)
            .subscribe((data: DefaultResponseType) => {
              if (data.error) {
                this.isError = true;
                throw new Error(data.message);
              }
            });
          this.isSend = true;
        }
      }
    }
  }


  selectItemClick(item: string) {
    if (this.formPopupContent.comboBox) {
      this.formPopupContent.comboBox.active = item;
    }
  }
}
