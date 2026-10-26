import { User } from "./User"
export class Notes{
    id:number=0
    description:string=""
    user:User=new User()
    // Quien envio la nota (lo asigna el backend con el usuario logueado)
    sender:User|null=null
}