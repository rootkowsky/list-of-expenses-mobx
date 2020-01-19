import {SortBy} from "../consts/SortBy";
import {ExpenseEntity} from "../datas/ExpenseEntity";
import {M} from "../models/M";

export class ExpensesUtil {

	public static getSortedExpenses(expenses:ExpenseEntity[], sortBy:SortBy):ExpenseEntity[] {
		return expenses.concat().sort((a, b) => {
			switch (M.store.sortBy) {
				case SortBy.TITLE_ASC:
					return a.title.localeCompare(b.title);
					break;
				case SortBy.TITLE_DESC:
					return b.title.localeCompare(a.title);
					break;
				case SortBy.AMOUNT_BASE_CURRENCY_ASC:
				case SortBy.AMOUNT_SELECTED_CURRENCY_ASC:
					return a.amount - b.amount;
					break;
				case SortBy.AMOUNT_BASE_CURRENCY_DESC:
				case SortBy.AMOUNT_SELECTED_CURRENCY_DESC:
					return b.amount - a.amount;
					break;
			}
		});
	}


}