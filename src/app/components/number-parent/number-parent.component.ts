import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { NumberHeaderComponent } from '../number-header/number-header.component';
import { TableComponent } from '../table/table.component';
import { FooterComponent } from '../footer/footer.component';
import { LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-number-parent',
  standalone: true,
  imports: [
    CommonModule,
    NumberHeaderComponent,
    TableComponent,
    FooterComponent
  ],
  templateUrl: './number-parent.component.html',
  styleUrls: ['./number-parent.component.scss']
})
export class NumberParentComponent implements OnInit {
  contact: any = null;
  direction$: Observable<'rtl' | 'ltr'>;
  translations$: Observable<any>;
  currentLanguage: 'ar' | 'en' = 'ar';
  isDropdownVisible: boolean = false;

  constructor(private dataService: DataService, private languageService: LanguageService) {
    this.direction$ = this.languageService.direction$;
    this.translations$ = this.languageService.translations$;
  }

  ngOnInit() {
    this.dataService.getContacts().subscribe((data) => {
      this.contact = data.contacts[0];
    });

    this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
    });

    this.direction$.subscribe((dir) => {
      document.documentElement.dir = dir;
    });
  }

  switchLanguage(lang: 'ar' | 'en') {
    this.languageService.setLanguage(lang);
    this.isDropdownVisible = false;
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
