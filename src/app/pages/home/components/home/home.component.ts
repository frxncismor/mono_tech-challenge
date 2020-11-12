import { DataService } from './../../../../core/services/data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidenavEl = document.querySelector('.sidenav');
  gridEl = document.querySelector('.grid');
  SIDENAV_ACTIVE_CLASS = 'sidenav--active';
  GRID_NO_SCROLL_CLASS = 'grid--noscroll';
  balance: any;
  customers: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAccountBalance();
    this.getBalanceTransactions();
    // this.createCustomer();
    this.getCustomer();
    this.setMenuClick();
    this.setSidenavClose();
  }

  toggleClass(el, className): void {
    if (el.hasClass(className)) {
      el.removeClass(className);
    } else {
      el.addClass(className);
    }
  }

  setMenuClick(): void {
    console.log('clicked menu icon');
    this.toggleClass(this.sidenavEl, this.SIDENAV_ACTIVE_CLASS);
    this.toggleClass(this.gridEl, this.GRID_NO_SCROLL_CLASS);
  }

  setSidenavClose(): void {
    this.toggleClass(this.sidenavEl, this.SIDENAV_ACTIVE_CLASS);
    this.toggleClass(this.gridEl, this.GRID_NO_SCROLL_CLASS);
  }

  getAccountBalance(): void {
    this.dataService.getAccountBalances().subscribe((resp) => {
      this.balance = resp;
      console.log(resp);
    });
  }

  getBalanceTransactions(): void {
    this.dataService.getBalanceTransactions().subscribe((resp) => {
      console.log(resp);
    });
  }

  createCustomer(): void {
    this.dataService
      .createCustomer(
        'Juan',
        'Martinez',
        'juan@gmail.com',
        'Juan@tech.org',
        'JuanTech',
        '123456789'
      )
      .subscribe((resp) => {
        console.log(resp);
      });
    this.dataService.getCustomer().subscribe((resp) => {
      console.log(resp);
    });
  }

  getCustomer(): void {
    this.dataService.getCustomer().subscribe((resp) => {
      this.customers = resp;
      console.log(resp);
    });
  }
}
