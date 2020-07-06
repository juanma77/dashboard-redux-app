export class IncomeOutcome {

    public description: string;
    public amount: number;
    public type: string;
    public uid?: string; 

    constructor( description: string, amount: number, type: string, uid?: string ) {

        this.description = description;
        this.amount = amount; 
        this.type = type;
        this.uid = uid;

    }

}