import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Usuario} from '../Usuario';
@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
usuarios: Usuario[];
selectedUsuario: Usuario = { cve:'', snombre:'', sapepat: null};
constructor(private apiService: ApiService) { }
ngOnInit() {
this.readUsuario();
}
readUsuario()
{
this.apiService.readUsuario().subscribe((usuarios: Usuario[])=>{
this.usuarios = usuarios;
console.log(this.usuarios);
})
}
createOrUpdateUsuario(form){
if(this.selectedUsuario && this.selectedUsuario.cve){
 form.value.cve = this.selectedUsuario.cve;
 console.log(this.selectedUsuario.cve);
this.apiService.updateUsuario(form.value).subscribe((usuarios: Usuario)=>{
this.readUsuario();
console.log(form.value.cve);
console.log("Usuario actualizado" , usuarios);
});
}
else{
this.apiService.createUsuario(form.value).subscribe((usuarios: Usuario)=>{
this.readUsuario();
console.log("Usuario creado, ", usuarios);
});
}
}
selectUsuario(usuarios: Usuario){
this.selectedUsuario = usuarios;
}
deleteUsuario(cve){
this.apiService.deleteUsuario(cve).subscribe((usuarios: Usuario)=>{
 this.readUsuario();
 console.log("usuario eliminado, ", usuarios);
});
this.readUsuario();
}
}