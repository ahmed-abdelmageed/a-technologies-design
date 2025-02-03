import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../../pipes/currency.pipe'; 

interface Transaction {
  client: string;
  dateOfAssignment: string;
  dateOfCancellation: string;
  responsible: string;
  image: string;
  localContract: number;
  internationalContract: number;
  amount: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule,CurrencyPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [CurrencyPipe], 

})
export class TableComponent implements OnInit, OnChanges {
  @Input() transactions: Transaction[] = [];

  pageSize = 10;
  currentPage = 1;
  totalTransactions = 0;
  displayedTransactions: Transaction[] = [];
  pageSizeOptions = [10, 20, 50, 100];

  direction: 'rtl' | 'ltr' = 'rtl';  
  translations: any = {};

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.language$.subscribe(() => {
      this.translations = this.languageService.translations;
      this.updateDirection();
    });

    this.languageService.direction$.subscribe((dir) => {
      this.direction = dir; 
    });

    this.translations = this.languageService.translations;
    this.updateDirection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']?.currentValue) {
      this.updatePagination();
    }
  }

  updateDirection(): void {
    this.direction = this.languageService.getStoredDirection();
  }

  updatePagination(): void {
    this.totalTransactions = this.transactions.length;
    this.currentPage = 1;
    this.updateDisplayedTransactions();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedTransactions();
  }

  onPageSizeChange(size: number | string): void {
    this.pageSize = Number(size);
    this.currentPage = 1;
    this.updateDisplayedTransactions();
  }

  updateDisplayedTransactions(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalTransactions);
    this.displayedTransactions = this.transactions.slice(startIndex, endIndex);
  }

  getPages(): number[] {
    let pages = [];
    const totalPages = this.getTotalPages();
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
 
  

  getTotalPages(): number {
    return Math.ceil(this.totalTransactions / this.pageSize);
  }

  trackByFn(index: number, item: Transaction) {
    return item.client; 
  } 
}
