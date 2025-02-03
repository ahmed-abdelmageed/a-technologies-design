import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'currencyPipe', 
  standalone: true, 
  pure: false, 
})
export class CurrencyPipe implements PipeTransform {
  private currentLanguage: 'ar' | 'en' = 'ar'; 

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  transform(value: number | null | undefined): string {
    if (value == null) return '';

    const currencySymbol = this.currentLanguage === 'ar' ? 'ج.م' : 'L.E';
    return `${value.toLocaleString()} ${currencySymbol}`;
  }
}
