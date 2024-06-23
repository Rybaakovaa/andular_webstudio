import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() imagePath!: string;
  @Input() banner!: {
    type: string,
    title: string,
    text: string,
    image: string
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }


  // HTML будет безопасно очищен и отрендерен в шаблоне
  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
