import { DataService } from './../../../../core/services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { Lead } from 'src/app/utils/interfaces/customer';
import { BalanceContent } from 'src/app/utils/interfaces/balance';
import { BalanceTransaction } from 'src/app/utils/interfaces/balanceTransactions';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidenavEl: any;
  gridEl: any;
  SIDENAV_ACTIVE_CLASS = 'sidenav--active';
  GRID_NO_SCROLL_CLASS = 'grid--noscroll';
  availableBalance: BalanceContent;
  pendingBalance: BalanceContent;
  leads: Lead[] = [];
  balanceTransactions: BalanceTransaction[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAccountBalance();
    this.getBalanceTransactions();
    // this.createCustomer();
    this.getCustomers();
    this.setMenuClick();
    this.setSidenavClose();
  }

  toggleClass(el, className): void {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  }

  setMenuClick(): void {
    this.sidenavEl = document.querySelector('.sidenav');
    this.gridEl = document.querySelector('.grid');
    this.toggleClass(this.sidenavEl, this.SIDENAV_ACTIVE_CLASS);
    this.toggleClass(this.gridEl, this.GRID_NO_SCROLL_CLASS);
  }

  setSidenavClose(): void {
    this.sidenavEl = document.querySelector('.sidenav');
    this.gridEl = document.querySelector('.grid');
    this.toggleClass(this.sidenavEl, this.SIDENAV_ACTIVE_CLASS);
    this.toggleClass(this.gridEl, this.GRID_NO_SCROLL_CLASS);
  }

  getAccountBalance(): void {
    this.dataService.getBalanceAvailable().subscribe((resp) => {
      this.availableBalance = resp[0];
    });
    this.dataService.getBalancePending().subscribe((resp) => {
      this.pendingBalance = resp[0];
    });
  }

  getBalanceTransactions(): void {
    this.dataService.getBalanceTransactions().subscribe((resp) => {
      this.balanceTransactions = resp;
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
  }

  getCustomers(): void {
    this.dataService.getCustomers().subscribe((resp) => {
      this.leads = resp;
    });
  }

  addLead(): void {
    console.log('addLead');
  }
}
