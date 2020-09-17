
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3000/users'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Usuários
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Usuário pelo id
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.url + '/?id=' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getUserByCPF(cpf: number): Observable<User> {
    cpf = Object.values(cpf)[0]
    const url = `${this.url}/?cpf=${cpf}`
    return this.httpClient.get<User>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // adiciona um User ao db
  addUser(user): Observable<User> {
    console.log(JSON.stringify(user))
    return this.httpClient.post<User>(this.url, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // utualiza um User
  updateUser(user: User): Observable<User> {
    console.log(user.id)
    return this.httpClient.put<User>(this.url + '/' + user.id, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um User
  deleteUser(id) {
    return this.httpClient.delete<User>(this.url + '/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      console.log(error)
      // Erro ocorreu no lado do servidor
      errorMessage = 'Código do erro: ${error.status}, ' + 'menssagem: ${error.message}';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
