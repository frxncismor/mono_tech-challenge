import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
// tslint:disable-next-line: typedef
export function HandleHttpResponseError(error: HttpErrorResponse) {
  console.error(error);
  return throwError(
    `Whoops! There is an error. Here is the message: ${error.message}`
  );
}
