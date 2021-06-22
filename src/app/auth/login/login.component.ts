import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public myForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required]],
    password: ['', [Validators.required]],
    remember:['' , []]
  })


  public auth2: any;

  constructor(private router: Router , private fb: FormBuilder , private prdUser: UsuarioService , private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();  
  }


  login()
  {
    console.log(this.myForm.value);
    const obj= this.myForm.value;
    this.prdUser.loginUser(obj).
    subscribe(resp =>{
     if(this.myForm.get('remember')!.value)
     {
        localStorage.setItem('email',this.myForm.get('email')!.value);
     }
     else
     {
       localStorage.removeItem('email');
     }
     this.router.navigateByUrl('/');

    },(err) => {
      Swal.fire('Error', err.error.msg)
    }) 

    let remember: boolean = this.myForm.get('remember')!.value;

  // this.router.navigateByUrl('/')
  }







/*    onSuccess(googleUser:any) {
    //  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      let  id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);

    }
    onFailure(error:any) {
      console.log(error);
    } */

    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark'
      });
    this. startApp();    
}



startApp () {
  gapi.load('auth2',()=>{
     this.auth2 = gapi.auth2.init({
      client_id: '934892189189-97r3ftjf4e0uilta94jcte30geu9gvve.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    this.attachSignin(document.getElementById('my-signin2'));
  });
}


attachSignin(element:any) {
    
  this.auth2.attachClickHandler( element, {},
      (googleUser:any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.prdUser.loginGoogle( id_token )
            .subscribe( resp => {
              // Navegar al Dashboard
              this.ngZone.run( () => {
                this.router.navigateByUrl('/');
              })
            });

      }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
      });
}

}
