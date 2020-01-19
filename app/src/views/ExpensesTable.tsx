import {css, cx} from 'emotion';
import {observer} from "mobx-react";
import * as React from "react";
import {SortBy} from "../consts/SortBy";
import {M} from "../models/M";
import {ExpensesUtil} from "../utils/ExpensesUtil";

const noData = css`
  width: 100%;
  text-align: center;
  margin: 25px auto;
  padding: 20px;
  background-color: #eee;
`;

const expensesTable = css`
	display: flex;
	table {
		width: 100%;
		border-collapse: collapse;
		margin: 25px 0;
	}
	td {
		padding: 5px;
		border: 1px solid #444;
	}
	thead tr {
		background-color: #eee;
		td {
			padding: 10px;
			cursor: pointer;
			user-select: none;
		}
	}
	tbody tr:nth-child(even) {
		background-color: #f5f5f5;
	}
	button {
		border: 0;
		background: 0;
		cursor: pointer;
	}
`;

@observer
export class ExpensesTable extends React.PureComponent {

	private setSortByMethod = (primarySortBy:SortBy, secondarySortBy:SortBy) => () => {
		let nextSortBy = M.store.sortBy == primarySortBy
			? secondarySortBy
			: primarySortBy;
		M.store.setSortBy(nextSortBy);
	};

	private getSortingIconEntity = (primarySortBy:SortBy, secondarySortBy:SortBy) => {
		if (M.store.sortBy === primarySortBy || M.store.sortBy === secondarySortBy) {
			switch (M.store.sortBy) {
				case SortBy.TITLE_ASC:
				case SortBy.AMOUNT_BASE_CURRENCY_ASC:
				case SortBy.AMOUNT_SELECTED_CURRENCY_ASC:
					return <span>&#9652;</span>;
					break;
				case SortBy.TITLE_DESC:
				case SortBy.AMOUNT_BASE_CURRENCY_DESC:
				case SortBy.AMOUNT_SELECTED_CURRENCY_DESC:
					return <span>&#9662;</span>;
					break;
			}
		}
		return <span>&#9662;</span>;
	};

	private renderTHead = () => {
		return <thead>
		<tr>
			<td onClick={this.setSortByMethod(SortBy.TITLE_ASC, SortBy.TITLE_DESC)}>
				{this.getSortingIconEntity(SortBy.TITLE_ASC, SortBy.TITLE_DESC)} Title
			</td>
			<td onClick={this.setSortByMethod(SortBy.AMOUNT_BASE_CURRENCY_ASC, SortBy.AMOUNT_BASE_CURRENCY_DESC)}>
				{this.getSortingIconEntity(SortBy.AMOUNT_BASE_CURRENCY_ASC, SortBy.AMOUNT_BASE_CURRENCY_DESC)} Amount
				({M.store.baseCurrency})
			</td>
			<td onClick={this.setSortByMethod(SortBy.AMOUNT_SELECTED_CURRENCY_ASC,
				SortBy.AMOUNT_SELECTED_CURRENCY_DESC)}
			>
				{this.getSortingIconEntity(SortBy.AMOUNT_SELECTED_CURRENCY_ASC,
					SortBy.AMOUNT_SELECTED_CURRENCY_DESC)} Amount ({M.store.selectedCurrency})
			</td>
			<td>Options</td>
		</tr>
		</thead>;
	};

	private renderTBody = () => {
		let sortedExpenses = ExpensesUtil.getSortedExpenses(M.store.expenses, M.store.sortBy);

		return <tbody>
		{sortedExpenses.map((expense) => {
			const amountInSelectedCurrency = parseFloat(
				(expense.amount * M.store.getRate(M.store.selectedCurrency)).toString())
				.toFixed(2);
			return <tr key={expense.id}>
				<td>{expense.title}</td>
				<td>{expense.amount}</td>
				<td>{amountInSelectedCurrency}</td>
				<td>
					<button onClick={() => M.store.removeExpense(expense.id)}>
						Delete
					</button>
				</td>
			</tr>;
		})}
		</tbody>;
	};

	public render() {
		if (!M.store.expenses.length) {
			return <div className={cx(noData)}>No data</div>;
		}

		return <div className={cx(expensesTable)}>
			<table>
				{this.renderTHead()}
				{this.renderTBody()}
			</table>
		</div>;
	}

}