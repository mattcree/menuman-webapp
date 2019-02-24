import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AccountService {

  apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = window.location.origin + '/api/accounts/'
  }

  getAccount(username: string): Observable<Account> {
    return this.http.get<Account>(this.apiPath + username);
  }

}
