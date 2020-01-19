import {observer} from "mobx-react";
import * as React from "react";
import {M} from "../models/M";

@observer
export class ExpensesSum extends React.PureComponent {

	public render() {
		return <div className={"ExpensesSum"}>
			Sum: {M.store.expensesSum} {M.store.baseCurrency} ({parseFloat(
			M.store.expensesSumInSelectedCurrency.toString()).toFixed(2)} {M.store.selectedCurrency})
		</div>;
	}

}