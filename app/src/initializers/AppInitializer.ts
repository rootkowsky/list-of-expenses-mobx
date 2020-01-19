import {Currencies} from "../consts/Currencies";
import {M} from "../models/M";
import {Store} from "../models/Store";

export class AppInitializer {
	public static init() {
		M.store = new Store();
		AppInitializer.initRates();
	}

	private static initRates() {
		M.store.rates[Currencies.EUR] = 4.382;
	}
}