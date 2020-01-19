import {computed, observable} from "mobx";
import {Currencies} from "../consts/Currencies";
import {SortBy} from "../consts/SortBy";
import {ExpenseEntity} from "../datas/ExpenseEntity";
import {M} from "./M";

export class Store {

	@observable
	public expenses:Array<ExpenseEntity> = [];

	public baseCurrency:Currencies = Currencies.PLN;
	public baseRate:number = 1;
	public selectedCurrency:Currencies = Currencies.EUR;
	@observable
	public rates:{ [key:string]:number } = {};

	@observable
	public sortBy:SortBy = null;

	public addExpense(expense:ExpenseEntity) {
		let isExpenseExists = this.expenses.find(e => e.id === expense.id);
		if (!isExpenseExists) {
			this.expenses.push(expense);
		}
		else {
			throw new Error(`Expense with id ${expense.id} already exists!`);
		}
	}

	public removeExpense(id:string) {
		let expenseIndex = this.expenses.findIndex(e => e.id === id);
		if (expenseIndex !== -1) {
			this.expenses.splice(expenseIndex, 1);
		}
		else {
			throw new Error(`Expense with id ${id} do not exists!`);
		}
	}

	public setSortBy(sortMethod:SortBy) {
		this.sortBy = sortMethod;
	}

	@computed get expensesSum():number {
		return this.expenses.reduce(function (amountSum, expense) {
			return amountSum + expense.amount;
		}, 0);
	}

	@computed get expensesSumInSelectedCurrency():number {
		return this.expensesSum * this.rates[this.selectedCurrency];
	}

	public getRate(currency:Currencies) {
		return M.store.rates[currency];
	}

}