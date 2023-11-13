import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {ResponseI} from '../../models/response.interface';
import {ListaUsuariosI} from '../../models/listaUsuarios.interface';
import {UsuarioI} from '../../models/usuario.interface'
import {ListaRolesI} from '../../models/listaRoles.interface'
import { RolI } from 'src/app/models/rol.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable}  from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Url en donde tengamos almacenado la api de pruebas
  //url: string = "https://apilab3.azurewebsites.net/"
  url: string = "http://127.0.0.1:8000/"
  searchTerm: string = '';

  constructor(private http:HttpClient) { }

  loginByEmail(form: LoginI): Observable<ResponseI>{
    let direction = this.url
    return this.http.post<ResponseI>(direction,form);
  }

  getAllUsers(page:number): Observable<ListaUsuariosI[]>{
    let direction = this.url + "api/users/?page=" + page
    return this.http.get <ListaUsuariosI[]>(direction);
  }

  getSigleUser(id : any): Observable<UsuarioI>{
    let direction = this.url + "api/users/" + id + "/"
    console.log(direction);
    return this.http.get<UsuarioI>(direction);
  }

  getAllRoles(page:number): Observable<ListaRolesI[]>{ // No hay interfaz para los roles
    let direction = this.url + "api/roles/?page=" + page
    return this.http.get<ListaRolesI[]>(direction);
  }

  //Metodo para realizar el Put a la base de datos por medio de la URL
  putUser(form:UsuarioI):Observable<ResponseI>{
    let direction = this.url + "api/users/" + form.id + "/"
    return this.http.put<ResponseI>(direction,form);
  }

  setSearchTerm(term: string): void {
    this.searchTerm = term;
  }

  buildSearchUrl(): string {
    return `${this.url}api/users/filter/?text_to_search=${this.searchTerm}`;
  }

  searchUsers(): Observable<ListaUsuariosI[]> {
    let direction = this.buildSearchUrl();
    return this.http.get<ListaUsuariosI[]>(direction);
  }

}
