import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  save(): Observable<any> {
    const success = Math.random() > 0.3;
    return success ? of({ message: 'Success' }).pipe(delay(1000)) : throwError(() => ({ error: { message: 'Server failed' } })).pipe(delay(1000));
  }
}
