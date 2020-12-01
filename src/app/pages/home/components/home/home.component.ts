import { DataService } from './../../../../core/services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { Lead } from 'src/app/utils/interfaces/customer';
import { BalanceContent } from 'src/app/utils/interfaces/balance';
import { BalanceTransaction } from 'src/app/utils/interfaces/balanceTransactions';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidenavEl: any;
  modal: any;
  SIDENAV_ACTIVE_CLASS = 'sidenav--active';
  availableBalance: BalanceContent;
  pendingBalance: BalanceContent;
  leads: Lead[] = [];
  balanceTransactions: BalanceTransaction[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    businessEmail: new FormControl(),
    businessName: new FormControl(),
    taxID: new FormControl(),
  });

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getAccountBalance();
    this.getBalanceTransactions();
    this.getLeads();
    this.setSidenavToggle();
  }

  // Toggle the class 'sidenav--active' to open or close the sidenav
  setSidenavToggle(): void {
    this.sidenavEl = document.querySelector('.sidenav');
    this.sidenavEl.classList.toggle(this.SIDENAV_ACTIVE_CLASS);
  }

  // Get the account balance data
  getAccountBalance(): void {
    this.dataService.getBalanceAvailable().subscribe((resp) => {
      console.log({ resp });
      this.availableBalance = resp.available[0];
      this.pendingBalance = resp.pending[0];
    });
  }

  // Get the  balanceTransactions data
  getBalanceTransactions(): void {
    this.dataService.getBalanceTransactions().subscribe((resp) => {
      this.balanceTransactions = resp;
    });
  }

  // Get the leads data
  getLeads(): void {
    this.dataService.getLeads().subscribe((resp) => {
      this.leads = resp;
    });
  }

  // Open the modal window to fill the form
  addLead(): void {
    const modal = document.querySelector('.modal-window');
    modal.classList.add('modal-open');
  }

  // Close the modal window without data
  closeLead(): void {
    const modal = document.querySelector('.modal-window');
    modal.classList.remove('modal-open');
  }

  // Send the data to create a new lead
  registerLead(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const lead = this.form.value;
      this.dataService
        .createLead(
          lead.name,
          lead.lastname,
          lead.email,
          lead.businessEmail,
          lead.businessName,
          lead.taxID
        )
        .subscribe((resp) => {
          console.log(resp);
          this.getLeads();
        });
      this.form.reset();
      this.closeLead();
    }
  }

  // build the reactive form with validators
  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      businessEmail: ['', [Validators.required, Validators.email]],
      businessName: ['', [Validators.required]],
      taxID: ['', [Validators.required]],
    });
  }

  // Getters to shortcut the values of the form
  get nameField(): any {
    return this.form.get('name');
  }

  get lastnameField(): any {
    return this.form.get('lastname');
  }

  get emailField(): any {
    return this.form.get('email');
  }

  get businessEmailField(): any {
    return this.form.get('businessEmail');
  }

  get businessNameField(): any {
    return this.form.get('businessName');
  }

  get taxIDField(): any {
    return this.form.get('taxID');
  }

  // Functionality of the accordion
  accordionDropDown(element): void {
    const accordion = document.getElementsByClassName('transaction');
    console.log(element);
    const accEl = accordion[element];
    accEl.classList.toggle('accordion--active');
    console.log(accEl);
    const panel = accEl.querySelector('.transaction-business') as HTMLElement;
    console.log(panel);
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  }
}
