const uuidv1 = require('uuid/v1');

export class ExpenseEntity {

	constructor(title:string, amount:number) {
		this.id = uuidv1();
		this.title = title;
		this.amount = amount;
	}

	public id:string = "";
	public title:string = "";
	public amount:number = 0;

}