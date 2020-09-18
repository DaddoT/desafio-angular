
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3000/users'; 

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.url + '/?id=' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getUserByCPForName(input: any): Observable<User> {
    let url;
    input = Object.values(input)[0]

    if (isNaN(input)) {
      url = `${this.url}/?nome=${input}`
    } else {
      url = `${this.url}/?cpf=${input}`
    }

    return this.httpClient.get<User>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  addUser(user): Observable<User> {
    return this.httpClient.post<User>(this.url, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.url + '/' + user.id, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteUser(id) {
    return this.httpClient.delete<User>(this.url + '/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      console.log(error)
      errorMessage = 'Código do erro: ${error.status}, ' + 'menssagem: ${error.message}';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
