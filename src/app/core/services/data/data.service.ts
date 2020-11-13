import { Lead } from './../../../utils/interfaces/customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Balance, BalanceContent } from 'src/app/utils/interfaces/balance';
import { BalanceTransaction } from 'src/app/utils/interfaces/balanceTransactions';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  api = environment.API_URL;
  constructor(private http: HttpClient) {}

  getBalanceAvailable(): Observable<BalanceContent[]> {
    return this.http.get(`${this.api}/v1/balance`).pipe(
      map((response: any) => {
        const balanceAvailable: BalanceContent[] = [];
        response.available.forEach((resp: any) => {
          balanceAvailable.push({
            amount: resp.amount,
            currency: resp.currency,
          });
        });
        return balanceAvailable;
      })
    );
  }
  getBalancePending(): Observable<BalanceContent[]> {
    return this.http.get(`${this.api}/v1/balance`).pipe(
      map((response: any) => {
        const balancePending: BalanceContent[] = [];
        response.pending.forEach((resp: any) => {
          balancePending.push({
            amount: resp.amount,
            currency: resp.currency,
          });
        });
        return balancePending;
      })
    );
  }

  getBalanceTransactions(): Observable<BalanceTransaction[]> {
    return this.http.get(`${this.api}/v1/balance_transactions`).pipe(
      map((response: any) => {
        const balanceTransactions: BalanceTransaction[] = [];
        response.data.forEach((resp: any) => {
          balanceTransactions.push({
            id: resp.id,
            amount: resp.amount,
            net: resp.net,
            available_on: resp.available_on,
            created: resp.created,
            currency: resp.currency,
            description: resp.description,
            status: resp.status,
            type: resp.type,
          });
        });
        return balanceTransactions;
      })
    );
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

  getCustomers(): Observable<Lead[]> {
    return this.http.get(`${this.api}/v1/customers`).pipe(
      map((response: any) => {
        const leads: Lead[] = [];
        response.data.forEach((resp: any) => {
          leads.push({
            name: resp.name,
            email: resp.email,
            businessEmail: resp.invoice_settings.custom_fields[0].value,
            businessName: resp.invoice_settings.custom_fields[1].value,
            businessTaxID: resp.invoice_settings.custom_fields[2].value,
          });
        });
        return leads;
      })
    );
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
