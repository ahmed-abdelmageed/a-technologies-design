import { CurrencyPipe } from './currency.pipe';
import { LanguageService } from '../services/language.service';
import { TestBed } from '@angular/core/testing';

describe('CurrencyPipe', () => {
  let pipe: CurrencyPipe;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;

  beforeEach(() => {
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['getCurrentLanguage']);

    TestBed.configureTestingModule({
      providers: [
        CurrencyPipe,
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    });

    pipe = TestBed.inject(CurrencyPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format currency correctly in Arabic', () => {
    mockLanguageService.getCurrentLanguage.and.returnValue('ar');
    expect(pipe.transform(5000)).toBe('5000 ج.م');
  });

  it('should format currency correctly in English', () => {
    mockLanguageService.getCurrentLanguage.and.returnValue('en');
    expect(pipe.transform(5000)).toBe('5000 L.E');
  });


});
