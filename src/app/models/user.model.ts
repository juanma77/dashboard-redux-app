export class User {

    public uid: string; 
    public name: string; 
    public email: string;  

    constructor( uid: string, name: string, email: string ) {

        this.uid = uid;
        this.name = name; 
        this.email = email; 

    }

}