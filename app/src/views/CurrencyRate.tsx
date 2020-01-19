import {css, cx} from 'emotion';
import * as React from "react";
import {M} from "../models/M";

const currencyRate = css`
	display: flex;
    justify-content: flex-end;
    
    > div {
    	margin-top: -50px;
    }
    
    input {
    	width: 70px;
    	text-align: right;
    }
`;

export class CurrencyRate extends React.PureComponent {

	public onChange = (event) => {
		event.preventDefault();
		let value = parseFloat(event.target.value);
		if (!isNaN(value)) {
			M.store.rates[M.store.selectedCurrency] = value;
		}
		else {
			throw new Error(`Rate is not a number`);
		}

	};

	public render():React.ReactElement {
		return <div className={cx(currencyRate)}>
			<div>
				{M.store.baseRate} {M.store.selectedCurrency} =
				<input defaultValue={M.store.rates[M.store.selectedCurrency]}
					   onChange={this.onChange}
				/>
				{M.store.baseCurrency}
			</div>
		</div>;
	}
}