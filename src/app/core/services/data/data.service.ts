import { Lead } from './../../../utils/interfaces/customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { Balance, BalanceContent } from 'src/app/utils/interfaces/balance';
import { BalanceTransaction } from 'src/app/utils/interfaces/balanceTransactions';
import { HandleHttpResponseError } from 'src/app/utils/errorHandler/httpErrorHandler';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  api = environment.API_URL;
  constructor(private http: HttpClient) {}

  /**
   * Get the available balance of the user
   * @method catchError : is used to handle the httpErrors returned
   * @method retry : is used to retry the request the number of times that we set it
   * @method map : is used to return the response like the interface that we set it (with its properties)
   */
  getBalanceAvailable(): Observable<BalanceContent[]> {
    return this.http.get(`${this.api}/v1/balance`).pipe(
      retry(3),
      catchError(HandleHttpResponseError),
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

  /**
   * Get the pending balance of the user
   * @method catchError : is used to handle the httpErrors returned
   * @method retry : is used to retry the request the number of times that we set it
   * @method map : is used to return the response like the interface that we set it (with its properties)
   */
  getBalancePending(): Observable<BalanceContent[]> {
    return this.http.get(`${this.api}/v1/balance`).pipe(
      retry(3),
      catchError(HandleHttpResponseError),
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

  /**
   * Get the transactions of the user balance
   * @method catchError : is used to handle the httpErrors returned
   * @method retry : is used to retry the request the number of times that we set it
   * @method map : is used to return the response like the interface that we set it (with its properties)
   */
  getBalanceTransactions(): Observable<BalanceTransaction[]> {
    return this.http.get(`${this.api}/v1/balance_transactions`).pipe(
      retry(3),
      catchError(HandleHttpResponseError),
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

  /**
   * Create a new lead
   * @param name : First name of the lead
   * @param lastname : Lastname of the lead
   * @param personalEmail : The email address of the lead (NOT the business email)
   * @param businessEmail : The email address of the business (NOT the personal lead email)
   * @param businessLegalName : Business legal name
   * @param taxID : Business tax identification number
   * @method catchError : is used to handle the httpErrors returned
   * @method retry : is used to retry the request the number of times that we set it
   * @method map : is used to return the response like the interface that we set it (with its properties)
   */
  createLead(
    name: string,
    lastname: string,
    personalEmail: string,
    businessEmail: string,
    businessLegalName: string,
    taxID: number
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
    return this.http
      .post(`${this.api}/v1/customers`, this.toUrlEncoded(body), {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      })
      .pipe(retry(3), catchError(HandleHttpResponseError));
  }

  /**
   * Get the leads of the user
   * @method catchError : is used to handle the httpErrors returned
   * @method retry : is used to retry the request the number of times that we set it
   * @method map : is used to return the response like the interface that we set it (with its properties)
   */
  getLeads(): Observable<Lead[]> {
    return this.http.get(`${this.api}/v1/customers`).pipe(
      retry(3),
      catchError(HandleHttpResponseError),
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

  /**
   * Convert an Object to Url Encoded, to be compatible with 'Content-Type: application/x-www-form-urlencoded'
   * @param element: Element to convert to URL Encoded
   * @param key: Key of the object to convert
   * @param list: Final list converted
   */
  toUrlEncoded(element, key?, list?): string {
    const List = list || [];
    if (typeof element === 'object') {
      // tslint:disable-next-line: forin
      for (const index in element) {
        this.toUrlEncoded(
          element[index],
          key ? key + '[' + index + ']' : index,
          List
        );
      }
    } else {
      List.push(key + '=' + encodeURIComponent(element));
    }
    return List.join('&');
  }
}
