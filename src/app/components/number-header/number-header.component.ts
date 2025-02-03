import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '../../pipes/currency.pipe'; 

@Component({
  selector: 'app-number-header',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], 
  templateUrl: './number-header.component.html',
  styleUrls: ['./number-header.component.scss'],
  providers: [CurrencyPipe], 
})
export class NumberHeaderComponent implements OnInit {
  @Input() contact: any;
  translations: any = {}; 
  direction$: Observable<'rtl' | 'ltr'>;
  direction: 'rtl' | 'ltr' = 'rtl'; 
  isDropdownOpen: boolean = false;
  isIconHovered: boolean = false;
  isIconSelected: boolean = false;

  constructor(private languageService: LanguageService) {
    this.direction$ = this.languageService.direction$;
  }

  ngOnInit() {
    this.languageService.language$.subscribe(() => {
      this.translations = this.languageService.translations;
    });

    this.direction$.subscribe(dir => {
      this.direction = dir;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isIconSelected = this.isDropdownOpen; 
  }

  handleOptionSelection(action: string) {
    console.log(`Selected action: ${action}`);
    this.isDropdownOpen = false;
  }
}
