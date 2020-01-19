import {ExpenseEntity} from "../datas/ExpenseEntity";

export class ExpenseValidator {

	public static MIN_TITLE_LENGTH = 5;
	public static AMOUNT_PATTERN = '^\\d*\\.?(?:\\d{1,2})?$';

	public static validate(expense:ExpenseEntity) {
		return ExpenseValidator.validateTitle(expense.title) &&
			   ExpenseValidator.validateAmount(expense.amount);
	}

	private static validateTitle(title:string):boolean {
		return title.length >= ExpenseValidator.MIN_TITLE_LENGTH;
	}

	private static validateAmount(amount:number):boolean {
		var regExp = new RegExp(ExpenseValidator.AMOUNT_PATTERN);
		return regExp.test(amount.toString());
	}

}