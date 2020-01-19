import {css, cx} from 'emotion';
import * as React from "react";
import {FormEvent} from "react";
import {ExpenseEntity} from "../datas/ExpenseEntity";
import {M} from "../models/M";
import {ExpenseValidator} from "../validators/ExpenseValidator";

const submitForm = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const submitFormGroup = css`
  display: flex;
  flex: 1 0 auto;
  padding: 5px 0;
  > span {
  	width: 180px;
  }
  > input {
  	width: 180px;
  }
  > button {
  	border: 1px solid #aaa;
    background-color: #eee;
    width: 100%;
    border-radius: 4px;
  }
`;

export class ExpenseSubmitForm extends React.PureComponent {

	private titleInput:HTMLInputElement = null;
	private amountInput:HTMLInputElement = null;

	private handleSubmit = (event:FormEvent) => {
		event.preventDefault();
		const title = this.titleInput.value;
		const amount = parseFloat(this.amountInput.value);
		const expense = new ExpenseEntity(title, amount);
		if (ExpenseValidator.validate(expense)) {
			M.store.addExpense(expense);
			this.clearInputs();
		}
		else {
			throw new Error(`Invalid Expense value(s): ${JSON.stringify({
				title: expense.title,
				amount: expense.amount,
			})}`);
		}
	};

	private clearInputs = () => {
		this.titleInput.value = '';
		this.amountInput.value = '';
	};

	public render() {

		let formGroupClassName = cx(submitFormGroup);

		return <form className={cx(submitForm, "ExpenseSubmitForm")}
					 onSubmit={this.handleSubmit}
		>
			<div className={formGroupClassName}>
				<span>Title of transaction</span>
				<input ref={ref => this.titleInput = ref}
					   required
					   minLength={ExpenseValidator.MIN_TITLE_LENGTH}
				/>
			</div>
			<div className={formGroupClassName}>
				<span>Amount (in {M.store.baseCurrency})</span>
				<input ref={ref => this.amountInput = ref}
					   required
					   pattern={ExpenseValidator.AMOUNT_PATTERN}
				/>
			</div>
			<div className={formGroupClassName}>
				<button>Add</button>
			</div>
		</form>;
	}

}