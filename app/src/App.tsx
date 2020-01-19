import {css, cx, injectGlobal} from 'emotion';
import emotionNormalize from 'emotion-normalize';
import * as React from "react";
import {CurrencyRate} from "./views/CurrencyRate";
import {ExpensesSum} from "./views/ExpensesSum";
import {ExpensesTable} from "./views/ExpensesTable";
import {ExpenseSubmitForm} from "./views/ExpenseSubmitForm";

injectGlobal`
	${emotionNormalize}
`;

const appCls = css`
  max-width: 500px;
  margin: 0 auto;
`;

export class App extends React.Component {

	public render() {
		return (
			<div className={cx(appCls, "ListOfExpenses")}>
				<h1>List of expenses</h1>
				<CurrencyRate/>
				<ExpenseSubmitForm/>
				<ExpensesTable/>
				<ExpensesSum/>
			</div>
		);
	}
}