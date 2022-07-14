import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //dado upload numa planilha excel de teste, as colunas devem ter os mesmos nomes para o model,dar permissão de comentador
  apiUrl = 'https://sheet.best/api/sheets/0279a6bf-2dd5-4ace-bcb2-51a6bce932d3' 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    //  ,'X-Api-Key': 'qvUg9HlsIQ!0E74Fbi0$foV5Oi8Xqj8d!Eimi6GkzF@7d$KW9EaZ$D%QHEolw5gS'
    })
  }
  constructor(private HttpClient: HttpClient) { }
  //Retorna a lista de usuários -READ
  getUsers(): Observable<User[]> {
    return this.HttpClient.get<User[]>(this.apiUrl);
  }

  postUser(user: User): Observable<User>{
    return this.HttpClient.post<User>(this.apiUrl,user,this.httpOptions);
  }

  //Excluir o usuário
  deleteUser(id: number): Observable<User>{
    return this.HttpClient.delete<User>(`${this.apiUrl}/Id/${id}`)
  }

  //Edita usuário
  updateUser(id: string , user: User): Observable<User>{
    return this.HttpClient.put<User>(`${this.apiUrl}/Id/${id}` , user, this.httpOptions);
  }

  //Lista registro (um por vez)
  getUser(id: string) : Observable<User[]>{
    return this.HttpClient.get<User[]>(`${this.apiUrl}/Id/${id}` );
  }
}
