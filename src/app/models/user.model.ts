export class User {

    public uid: string; 
    public name: string; 
    public email: string;  

    constructor( uid: string, name: string, email: string ) {

        this.uid = uid;
        this.name = name; 
        this.email = email; 

    }

    // El nombre de los argumentos debe de ser igual al nombre de los campos que tenemos en la bd de Firebase 
    public static getDataFromFirebase( { email, uid, name } ) {

        return new User( uid, name, email );
        

    }

}