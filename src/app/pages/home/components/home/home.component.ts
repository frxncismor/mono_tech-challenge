import { DataService } from './../../../../core/services/data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAccountBalances().subscribe((resp) => {
      console.log(resp);
    });
    this.dataService.getBalanceTransactions().subscribe((resp) => {
      console.log(resp);
    });
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
}
