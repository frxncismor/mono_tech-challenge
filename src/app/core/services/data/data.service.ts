import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  api = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAccountBalances(): any {
    return this.http.get(`${this.api}/v1/balance`);
  }

  getBalanceTransactions(): any {
    return this.http.get(`${this.api}/v1/balance_transactions`);
  }

  getBalanceTransaction(id): any {
    return this.http.get(`${this.api}/v1/balance_transactions/${id}`);
  }

  createCustomer(
    name,
    lastname,
    personalEmail,
    businessEmail,
    businessLegalName,
    taxID
  ): any {
    const body = {
      name: `${name} ${lastname}`,
      email: personalEmail,
      invoice_settings: {
        custom_fields: [
          { name: 'business_name', value: businessLegalName },
          { name: 'business_email', value: businessEmail },
          { name: 'business_tax_id', value: taxID },
        ],
      },
    };

    return this.http.post(`${this.api}/v1/customers`, this.toUrlEncoded(body), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }

  getCustomer(): any {
    return this.http.get(`${this.api}/v1/customers`);
  }

  toUrlEncoded(element, key?, list?): string {
    var list = list || [];
    if (typeof element === 'object') {
      // tslint:disable-next-line: forin
      for (var idx in element) {
        this.toUrlEncoded(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          list
        );
      }
    } else {
      list.push(key + '=' + encodeURIComponent(element));
    }
    return list.join('&');
  }
}
