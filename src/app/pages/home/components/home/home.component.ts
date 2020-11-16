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
  MODAL_FULL = 'modal-window--fullwidth';
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
    this.toggleClass(this.sidenavEl, this.SIDENAV_ACTIVE_CLASS);
  }

  setSidenavClose(): void {
    this.sidenavEl = document.querySelector('.sidenav');
    this.modal = document.querySelector('.modal-window');
    this.toggleClass(this.sidenavEl, this.SIDENAV_ACTIVE_CLASS);
    // this.toggleClass(this.modal, this.MODAL_FULL);
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

  getCustomers(): void {
    this.dataService.getCustomers().subscribe((resp) => {
      this.leads = resp;
    });
  }

  addLead(): void {
    const modal = document.querySelector('.modal-window');
    modal.classList.add('modal-open');
  }

  closeLead(): void {
    console.log('close');
    const modal = document.querySelector('.modal-window');
    modal.classList.remove('modal-open');
  }

  registerLead(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const lead = this.form.value;
      console.log(lead);
      this.dataService
        .createCustomer(
          lead.name,
          lead.lastname,
          lead.email,
          lead.businessEmail,
          lead.businessName,
          lead.taxID
        )
        .subscribe((resp) => {
          console.log(resp);
          this.getCustomers();
        });
      this.form.reset();
      this.closeLead();
    }
  }

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
}
