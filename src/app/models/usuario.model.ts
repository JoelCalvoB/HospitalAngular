import { environment } from "src/environments/environment";

const base = environment.base_url;

export class Usuario {
constructor(    public role: string ,
    public google: string,
    public nombre: string,
    public email: string,
    public img: string,
    public uid?: string,
    public password?: string,
    ){

}

get imagenUrl() {
        
    if ( this.img.includes('https') ) {
        return this.img;
    }
    
    if ( this.img ) {
        return `${ base }/upload/usuarios/${ this.img }`;
    } else {
        return `${ base }/upload/usuarios/no-image`;
    }
}
}