import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public MyForm = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terminos: ['', [Validators.required]]

  }, { Validators: this.passwordIguales('password', 'validPassword') })

  public formSubmit: boolean = false;

  constructor(private fb: FormBuilder , private usrPrd: UsuarioService) {

  }

  ngOnInit(): void {
  }


  submit() {
    this.formSubmit = true;

    if (this.MyForm.invalid) return;
    let obj= this.MyForm.value;

    this.usrPrd.crearUsuario(obj).subscribe(resp => console.log(resp), (err) => {
      Swal.fire('Error', err.error.msg)
    })
  }


  CampoNoValido(campo: string): boolean {
    if (this.MyForm.get(campo)?.invalid && this.formSubmit == true) {
      return true
    }
    else {
      return false
    }
  }


  AceptaTerminos() {
    return !this.MyForm.get('terminos') && this.formSubmit

  }

  validacionContrasenia() {

    const v1 = this.MyForm.get('password')?.value;
    const v2 = this.MyForm.get('password2')?.value;
    if ((v1 !== v2) && this.formSubmit) {
      return true
    }
    else {
      return false
    }

  }

  passwordIguales(pass1: string, pass2: string) {
    return (form: FormGroup) => {
      const v1 = this.MyForm.get('password');
      const v2 = this.MyForm.get('password2');

      if (v1 === v2) {
        v2?.setErrors(null)
      }
      else {
        v2?.setErrors({noesIgual:true})
      }
    }
  }
}

