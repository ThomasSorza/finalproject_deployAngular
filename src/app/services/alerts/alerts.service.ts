import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toast:ToastrService) { }

  showSuccess(text: string , title: string){
    this.toast.success(text,title)
  }

  showError(text: string, title: string ){
    this.toast.error(text,title)
  }
}
