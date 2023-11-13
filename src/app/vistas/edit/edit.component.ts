import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioI } from '../../models/usuario.interface';
import { ApiService } from '../../services/api/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ResponseI} from '../../models/response.interface';
import { AlertsService} from '../../services/alerts/alerts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private activerouter: ActivatedRoute, private router: Router, private api: ApiService, private alerts:AlertsService) {}

  editarForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    type_document: new FormControl(''),
    document: new FormControl(''),
    birthday: new FormControl(''),
    phone_number: new FormControl(''),
    is_active: new FormControl(''),
    register_date: new FormControl(''),
    address: new FormControl(''),
    user_image: new FormControl(''),
    role: new FormControl('')
  });

  ngOnInit(): void {
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getSigleUser(usuarioid).subscribe((data: { id: string; first_name: string; last_name: string; type_document: string; document: string; birthday: string; phone_number: string; is_active: string; register_date: string; address: string; user_image: string; role: string; }) => {
      const usuarioCompleto: UsuarioI = {
        id: data.id as string,
        first_name: data.first_name as string,
        last_name: data.last_name as string,
        type_document: data.type_document as string,
        document: data.document as string,
        birthday: data.birthday as string,
        phone_number: data.phone_number as string,
        is_active: data.is_active as string,
        register_date: data.register_date as string,
        address: data.address as string,
        user_image: data.user_image as string,
        role: data.role as string
      };
      this.editarForm.setValue(usuarioCompleto);
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  postForm() {
    this.api.putUser(this.editarForm.value as UsuarioI).subscribe((data: ResponseI) => {
      if(data.status = "ok"){
          this.alerts.showSuccess('Datos modificados', 'Update');
          this.router.navigate(['dashboard']);
      }else{
        this.alerts.showError("No se a podido eliminar el Usuario",'Error');
      }
      //console.log(data);
      //console.log(this.editarForm.value as UsuarioI);

    });
  }
}
