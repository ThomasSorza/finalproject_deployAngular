import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';


import { ListaRolesI } from 'src/app/models/listaRoles.interface';

@Component({
  selector: 'app-dashboard-roles',
  templateUrl: './dashboard-roles.component.html',
  styleUrls: ['./dashboard-roles.component.scss']
})
export class DashboardRolesComponent implements OnInit{
  roles: ListaRolesI[] = [];
  pageNumber: number = 1; // Valor inicial
  searchTerm: string = '';
  filteredRoles: ListaRolesI[] = [];
  resultsPerPage: number = 10;
  pageTitle: string = 'CONTROL PANEL ROLES';


  constructor(private api: ApiService, private router: Router) {
    this.resultsPerPage = 10;
  }

  cambiarResultadosPorPagina() {
    this.pageNumber = 1; // Reiniciar la página a 1 cuando cambies el número de resultados por página
    this.cargarRoles();
  }

  //cambiar a dashboard de roles
  usersDashboard() {
    this.router.navigate(['dashboard']);
  }

  cambiarNumero(numero: number, event: Event) {
    event.preventDefault();
    this.pageNumber = numero;
    this.cargarRoles();
  }


  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
    this.api.getAllRoles(this.pageNumber).subscribe((data: ArrayLike<unknown> | { [s: string]: unknown; }) => {
      const values = Object.values(data);
      if (values.length >= 4) {
        this.roles = values[3] as any;
        this.filteredRoles = this.roles; // Inicialmente, muestra todos los usuarios
      }
    });
  }

  editarRol(id: any) {
    console.log(id)
    this.router.navigate(['edit', id]);
  }

  //search function
  onSearch() {
    this.filteredRoles = this.roles.filter((rol) => {
      return (
        rol.rol_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
