import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
describe('DataService', () => {
  let service: DataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataService);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getBalanceAvailable', () => {
    it('should return the balance available', () => {
      // arrange
      const expectData = {
        object: 'balance',
        available: [
          {
            amount: 0,
            currency: 'mxn',
            source_types: {
              card: 0,
            },
          },
        ],
        livemode: false,
        pending: [
          {
            amount: 0,
            currency: 'mxn',
            source_types: {
              card: 0,
            },
          },
        ],
      };

      let dataError, dataResponse;
      // act
      service.getBalanceAvailable().subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );
      const request = httpTestingController.expectOne(
        `${environment.API_URL}/v1/balance`
      );
      request.flush(expectData);
      // assert
      expect(request.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });
  describe('tests for getBalancePending', () => {
    it('should return the balance pending', () => {
      // arrange
      const expectData = {
        object: 'balance',
        available: [
          {
            amount: 0,
            currency: 'mxn',
            source_types: {
              card: 0,
            },
          },
        ],
        livemode: false,
        pending: [
          {
            amount: 0,
            currency: 'mxn',
            source_types: {
              card: 0,
            },
          },
        ],
      };

      let dataError, dataResponse;
      // act
      service.getBalanceAvailable().subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );
      const request = httpTestingController.expectOne(
        `${environment.API_URL}/v1/balance`
      );
      request.flush(expectData);
      // assert
      expect(request.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });
  describe('tests for getBalanceTransactions', () => {
    it('should return the balance transactions', () => {
      // arrange
      const expectData = {
        object: 'list',
        url: '/v1/balance_transactions',
        has_more: false,
        data: [
          {
            id: 'txn_1HoyxLBHWpkjRuwwT9eyL8Xg',
            object: 'balance_transaction',
            amount: 100,
            available_on: 1605737811,
            created: 1605737811,
            currency: 'mxn',
            description: 'My First Test Charge (created for API docs)',
            exchange_rate: null,
            fee: 0,
            fee_details: [],
            net: 100,
            reporting_category: 'charge',
            source: 'ch_1Cm1w8BHWpkjRuwwkh1BrYo0',
            status: 'available',
            type: 'charge',
          },
        ],
      };

      let dataError, dataResponse;
      // act
      service.getBalanceTransactions().subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );
      const request = httpTestingController.expectOne(
        `${environment.API_URL}/v1/balance_transactions`
      );
      request.flush(expectData);
      // assert
      expect(request.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });

  describe('tests for createLeads', () => {
    it('should create a lead', () => {
      // arrange
      const expectData = {
        object: 'list',
        url: '/v1/customers',
        has_more: false,
        data: [
          {
            id: 'cus_IPoa7bD91Tp90J',
            object: 'customer',
            address: null,
            balance: 0,
            created: 1605737811,
            currency: 'mxn',
            default_source: null,
            delinquent: false,
            description: null,
            discount: null,
            email: null,
            invoice_prefix: '44D4540',
            invoice_settings: {
              custom_fields: [
                { name: 'business_name', value: 'customer INC' },
                { name: 'business_email', value: 'businessEmail' },
                { name: 'business_tax_id', value: '123456789' },
              ],
              default_payment_method: null,
              footer: null,
            },
            livemode: false,
            metadata: {},
            name: null,
            next_invoice_sequence: 1,
            phone: null,
            preferred_locales: [],
            shipping: null,
            tax_exempt: 'none',
          },
        ],
      };

      let dataError, dataResponse;
      // act
      service
        .createLead(
          'Juan',
          'Garza',
          'jg@gmail.com',
          'jg@corp.com',
          'Juan INC',
          123456789
        )
        .subscribe(
          (response) => {
            dataResponse = response;
          },
          (error) => {
            dataError = error;
          }
        );
      const request = httpTestingController.expectOne(
        `${environment.API_URL}/v1/customers`
      );
      request.flush(expectData);
      // assert
      expect(request.request.method).toEqual('POST');
      expect(dataError).toBeUndefined();
    });
  });
});
