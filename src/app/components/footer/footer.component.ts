import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  createdBy: string = 'عبدالرحيم إسماعيل ناهض';
  userImage: string = 'assets/images/footer-icon.png';
  creationDate: string = '01/12/2024'; 
  creationTime: string = '4:30 pm'; 

  translations: any = {}; 
  direction$: Observable<'rtl' | 'ltr'>;

  constructor(private languageService: LanguageService) {
    this.direction$ = this.languageService.direction$;
  }

  ngOnInit() {
    this.languageService.language$.subscribe(() => {
      this.translations = this.languageService.translations;
    });

    this.translations = this.languageService.translations;
  }
}
