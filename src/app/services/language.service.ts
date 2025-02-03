import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = new BehaviorSubject<'ar' | 'en'>(this.getStoredLanguage());
  language$ = this.language.asObservable();

  private direction = new BehaviorSubject<'rtl' | 'ltr'>(this.getStoredDirection());
  direction$ = this.direction.asObservable();

  private translationsSubject = new BehaviorSubject<any>({});
  translations$ = this.translationsSubject.asObservable();
  translations: any = {};

  constructor(private http: HttpClient) {
    this.setLanguage(this.getStoredLanguage());
  }

  setLanguage(lang: 'ar' | 'en') {
    localStorage.setItem('language', lang);
    const newDirection = lang === 'ar' ? 'rtl' : 'ltr';

    localStorage.setItem('direction', newDirection);
    this.direction.next(newDirection);

    document.documentElement.lang = lang;
    document.documentElement.dir = newDirection;

    this.http.get(`assets/locales/${lang}.json`).subscribe((data) => {
      this.translations = data;
      this.translationsSubject.next(data);
      this.language.next(lang);
    });
  }

  getStoredLanguage(): 'ar' | 'en' {
    return (localStorage.getItem('language') as 'ar' | 'en') || 'ar';
  }

  getStoredDirection(): 'rtl' | 'ltr' {
    return (localStorage.getItem('direction') as 'rtl' | 'ltr') || 'rtl';
  }
}
