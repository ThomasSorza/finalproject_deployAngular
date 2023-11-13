export interface ListaUsuariosI{
  id:string;
  first_name: string;
  last_name: string;
  type_document: string;
  document: number;
  birthday: Date;
  phone_number:number;
  is_active: boolean;
  register_date: Date;
  address: string;
  password: string;
  user_image: string;
  role:number
}
